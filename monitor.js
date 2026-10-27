// js/monitor.js
(() => {
    'use strict';

    /* ================= 0. 防重复加载 ================= */
    if (window.__rootMonitorLoaded) {
        console.warn('⚠️ [Root Monitor] 已加载，跳过重复初始化');
        return;
    }
    // 立即置位：即使后续同步异常，也避免重复 <script> 再次执行导致状态机撕裂
    window.__rootMonitorLoaded = true;

    console.log('%c🛡️ [Root Monitor] 根目录总监视器已启动', 'color: #ff6b81; font-weight: bold; font-size: 14px;');

    /* ================= 资源 URL（处理 <base>） ================= */
    const BASE_URI = document.baseURI || location.href;
    const url = (p) => new URL(p, BASE_URI).href;

    /* ================= 1. 进度条 API ================= */
    window.updateLoadingProgress = (text, percent) => {
        const textEl = document.getElementById('loading-text');
        const barEl = document.getElementById('loading-bar');
        const p = Math.max(0, Math.min(100, Number(percent) || 0));
        if (textEl) textEl.innerText = text;
        if (barEl) barEl.style.width = p + '%';
    };

    /* ================= 2. 早期 game-ready 缓冲 ================= */
    let gameReadyFired = false;
    window.addEventListener('game-ready', () => { gameReadyFired = true; }, { once: true });

    /* ================= 3. 内部状态（闭包私有） ================= */
    const state = {
        booted: false,
        fatal: false,
        engineReady: false,
        homeReady: false,
        failReason: null,
        startedAt: Date.now(),
        initAt: 0,
        engineReadyAt: 0,
        bootedAt: 0,
    };

    window.__rootMonitorState = () => ({
        booted: state.booted,
        fatal: state.fatal,
        engineReady: state.engineReady,
        homeReady: state.homeReady,
        failReason: state.failReason,
        elapsed: Date.now() - state.startedAt,
        initAt: state.initAt,
        engineReadyAt: state.engineReadyAt,
        bootedAt: state.bootedAt,
    });

    /* ================= 4. 错误通道 ================= */
    const MAX_ERRORS = 20;
    const MAX_PENDING = 100;
    const MAX_DISPLAY_COUNT = 999;
    const pendingErrors = [];
    const errorCounts = new Map(); // msg -> { el, count }
    let overlayEl = null;
    let pendingDropWarned = false;

    // 只裁剪本模块创建的运行时条目：直接走 errorCounts，
    // 不依赖 class 选择器，避免误伤 HTML 模板或未来其它来源的同类条目。
    const trimRuntimeErrors = () => {
        while (errorCounts.size > MAX_ERRORS) {
            const [k, v] = errorCounts.entries().next().value;
            errorCounts.delete(k);
            if (v && v.el) v.el.remove();
        }
    };

    const renderError = (msg) => {
        if (!overlayEl || !overlayEl.isConnected) return false;
        overlayEl.style.display = 'block';

        const existing = errorCounts.get(msg);
        if (existing && existing.el.isConnected) {
            existing.count++;
            const n = existing.count > MAX_DISPLAY_COUNT ? MAX_DISPLAY_COUNT + '+' : existing.count;
            existing.el.textContent = `🚨 系统异常: ${msg} (×${n})`;
            // 真正的 LRU：命中后移到 Map 尾部，避免高频错误被当作“最早插入项”淘汰
            errorCounts.delete(msg);
            errorCounts.set(msg, existing);
            return true;
        }

        const div = document.createElement('div');
        div.className = 'root-monitor-error-item root-monitor-error-item--runtime';
        div.style.cssText = 'border-bottom:1px solid #fff; padding:5px 0;';
        div.textContent = '🚨 系统异常: ' + msg;
        overlayEl.appendChild(div);
        errorCounts.set(msg, { el: div, count: 1 });
        trimRuntimeErrors();
        return true;
    };

    const flushErrors = () => {
        if (!overlayEl || !overlayEl.isConnected) return;
        while (pendingErrors.length && renderError(pendingErrors[0])) pendingErrors.shift();
    };

    const createOverlay = () => {
        const el = document.createElement('div');
        el.id = 'error-overlay';
        el.style.cssText = [
            'display:none',
            'position:fixed',
            'top:0', 'left:0', 'right:0',
            'max-height:40vh',
            'overflow:auto',
            'z-index:9999',
            'background:rgba(200,0,0,0.9)',
            'color:#fff',
            'font:12px/1.5 monospace',
            'padding:8px 12px'
        ].join(';');
        (document.body || document.documentElement).appendChild(el);
        return el;
    };

    /**
     * 确保 overlayEl 可用且已挂载。
     * 复用时不动其子节点——模板静态内容与运行时条目均由各自所有者管理；
     * 若旧运行时节点已随 overlay 一起被移出文档，下一次同名错误会自然重建。
     */
    const ensureOverlay = () => {
        if (overlayEl && overlayEl.isConnected) return true;

        const existing = document.getElementById('error-overlay');
        if (existing) {
            const root = document.getElementById('app-root');
            if (root && root.contains(existing) && document.body) {
                document.body.appendChild(existing);
            }
            overlayEl = existing;
            // 复用前清掉指向已脱离文档的旧条目，避免 trim/计数出现幽灵项
            for (const [k, v] of errorCounts) {
                if (!v || !v.el || !v.el.isConnected) errorCounts.delete(k);
            }
            return overlayEl.isConnected;
        }

        overlayEl = createOverlay();
        // overlay 全新重建，旧计数全部失效
        errorCounts.clear();
        return overlayEl.isConnected;
    };

    const showError = (msg) => {
        const text = (msg === undefined || msg === null || msg === '') ? '(未知错误)' : String(msg);

        if (renderError(text)) return;

        // overlay 丢失或不可用：先自愈，再把历史积压与当前条补渲染
        ensureOverlay();
        flushErrors();
        if (renderError(text)) return;

        pendingErrors.push(text);
        if (pendingErrors.length > MAX_PENDING) {
            pendingErrors.shift();
            if (!pendingDropWarned) {
                pendingDropWarned = true;
                console.warn(`⚠️ [Root Monitor] 待渲染错误超过 ${MAX_PENDING} 条，最早的条目开始被丢弃`);
            }
        }
    };

    const formatReason = (reason) => {
        if (reason === undefined || reason === null || reason === '') return '未知错误';
        if (typeof reason === 'string') return reason;
        if (reason.message) return String(reason.message);
        try { return JSON.stringify(reason); } catch { return String(reason); }
    };

    // 精确判断是否为 js/main.js（含 query / hash），不用 indexOf 做子串匹配
    const isMainJsUrl = (src) => /(^|\/)js\/main\.js(?:[?#]|$)/.test(src);

    // 【新增】供外层 error 监听触发快速失败（fail 定义在 init 内部，需通过引用桥接）
    let failEngine = null;

    window.addEventListener('error', (e) => {
        const t = e.target;

        // 【新增】运行时错误来自 js/main.js（注意：不是资源加载失败，那种走 script.onerror）
        const isRuntimeFromMain =
            typeof e.filename === 'string' &&
            isMainJsUrl(e.filename) &&
            !(t && t !== window && (t.src || t.href));
        if (isRuntimeFromMain) {
            console.error('❌ [Root Monitor] main.js 运行异常:', e.message);
            if (failEngine) failEngine('核心引擎运行异常: ' + (e.message || '未知错误'));
            return;
        }

        let msg;
        if (t && t !== window && (t.src || t.href)) {
            const src = t.src || t.href;
            if (isMainJsUrl(src)) return;
            // 【可选】过滤第三方来源，只显示自己域名的
            try { if (new URL(src).origin !== location.origin) return; } catch { /* ignore */ }
            msg = '资源加载失败: ' + src;
        } else if (e.message) {
            msg = e.message;
        } else if (e.error && e.error.message) {
            msg = e.error.message;
        } else {
            msg = '未知脚本错误';
        }
        console.error('❌ [Root Monitor] 捕获到全局错误:', msg);
        showError(msg);
    }, true);

    window.addEventListener('unhandledrejection', (e) => {
        const reason = formatReason(e.reason);
        console.error('❌ [Root Monitor] 捕获到未处理的 Promise 异常:', reason);
        showError(reason);
    });

    /* ================= 5. iframe 内部错误监控 ================= */
    const frameHandlers = new WeakMap();

    const attachFrameMonitor = (frame) => {
        if (!frame) return;

        const bind = () => {
            let w;
            try {
                w = frame.contentWindow;
                if (!w || w === window) return;
                void w.location.href; // 同源检测
            } catch { return; }

            try {
                if (w.location.href === 'about:blank') return;
            } catch { /* ignore */ }

            // 校验通过后才移除旧 handler：
            // 若中途 return（contentWindow 为 null / about:blank），
            // WeakMap 里的旧记录仍保留，便于下次导航成功后清理。
            const prev = frameHandlers.get(frame);
            if (prev) {
                try {
                    prev.win.removeEventListener('error', prev.onError, true);
                    prev.win.removeEventListener('unhandledrejection', prev.onRejection);
                } catch { /* ignore */ }
            }

            const onError = (e) => {
                const t = e.target;
                let msg;
                if (t && t !== w && (t.src || t.href)) {
                    msg = '资源加载失败: ' + (t.src || t.href);
                } else {
                    msg = e.message || (e.error && e.error.message) || '子页面脚本错误';
                }
                showError('[iframe] ' + msg);
            };
            const onRejection = (e) => {
                showError('[iframe] Promise: ' + formatReason(e.reason));
            };
            w.addEventListener('error', onError, true);
            w.addEventListener('unhandledrejection', onRejection);
            frameHandlers.set(frame, { win: w, onError, onRejection });
        };

        frame.addEventListener('load', bind);

        const srcAttr = frame.getAttribute('src');
        if (srcAttr && srcAttr !== 'about:blank' &&
            frame.contentDocument && frame.contentDocument.readyState === 'complete') {
            bind();
        }
    };

    /* ================= 6. 主流程 ================= */
    const init = () => {
        state.initAt = Date.now() - state.startedAt;

        /* --- 定时器与可变引用提到顶层，保证 catch / fail 都能清理 --- */
        let tries = 0;
        const MAX_TRIES = 150;
        let fallbackTimer = null;
        let homeFallbackTimer = null;
        let softReadyTimer = null;
        let homeLoadTimer = null;
        let loadingScreen = null;
        let mainFrame = null;
        let logFrame = null;
        let onHomeMessage = null;

        const clearTimers = () => {
            if (fallbackTimer)     { clearInterval(fallbackTimer);   fallbackTimer = null; }
            if (homeFallbackTimer) { clearTimeout(homeFallbackTimer); homeFallbackTimer = null; }
            if (softReadyTimer)    { clearTimeout(softReadyTimer);    softReadyTimer = null; }
            if (homeLoadTimer)     { clearTimeout(homeLoadTimer);     homeLoadTimer = null; }
        };

        const clearHomeMessage = () => {
            if (onHomeMessage) {
                window.removeEventListener('message', onHomeMessage);
                onHomeMessage = null;
            }
        };

        const finishLoading = () => {
            if (!loadingScreen) return;
            loadingScreen.style.opacity = '0';
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 300);
        };

        const fail = (reason) => {
            if (state.booted || state.fatal) return;
            state.fatal = true;
            state.failReason = reason;
            clearTimers();
            clearHomeMessage();
            const elapsed = Date.now() - state.startedAt;
            console.error(`❌ [Root Monitor] 启动失败 @${elapsed}ms:`, reason);

            ensureOverlay();
            flushErrors();       // 先渲染积压的历史错误（时间更早）
            showError(reason);   // fail 原因放最后（时间上最新）

            if (mainFrame) { try { mainFrame.src = 'about:blank'; } catch { /* ignore */ } }
            finishLoading();
        };

        // 【新增】让外层 error 监听能调用 fail
        failEngine = fail;

        const tryBoot = () => {
            if (state.booted || state.fatal || !state.engineReady || !state.homeReady) return;
            state.booted = true;
            state.bootedAt = Date.now() - state.startedAt;
            clearTimers();
            clearHomeMessage();
            console.log(
                `%c✅ [Root Monitor] 核心引擎及所有模块加载完毕！总耗时 ${state.bootedAt}ms（init ${state.initAt}ms，引擎 ${state.engineReadyAt}ms 就绪）`,
                'color: #4caf50; font-weight: bold;'
            );
            finishLoading();
        };

        const markEngineReady = () => {
            if (softReadyTimer) { clearTimeout(softReadyTimer); softReadyTimer = null; }
            // fatal 后迟到的 game-ready 不应污染状态（否则 __rootMonitorState 会自相矛盾）
            if (state.engineReady || state.fatal) return;
            state.engineReady = true;
            state.engineReadyAt = Date.now() - state.startedAt;
            tryBoot();
        };

        try {
            const root = document.getElementById('app-root');

            // --- 6a. 页面结构自检 ---
            if (!root) {
                fail('未找到 #app-root，页面结构异常');
                return;
            }

            // --- 6b. 保护 loading 屏 ---
            loadingScreen = document.getElementById('app-loading');
            if (loadingScreen && root.contains(loadingScreen) && document.body) {
                if (window.getComputedStyle(loadingScreen).position === 'static') {
                    loadingScreen.style.position = 'fixed';
                    loadingScreen.style.top = '0';
                    loadingScreen.style.left = '0';
                    loadingScreen.style.right = '0';
                    loadingScreen.style.bottom = '0';
                    loadingScreen.style.zIndex = '9998';
                }
                document.body.appendChild(loadingScreen);
            }

            // --- 6c. 错误 overlay ---
            ensureOverlay();
            flushErrors();

            // --- 6d. 外壳（幂等） ---
            if (!document.getElementById('mainFrame')) {
                root.innerHTML = `
                    <div class="app-wrapper" style="display:flex; flex-direction:column; height:100vh; height:100dvh;">
                        <header id="header"></header>
                        <nav id="navBar"></nav>
                        <div class="split-container" style="flex:1; display:flex; flex-direction:column; overflow:hidden; padding-bottom: calc(var(--footer-h, 70px) + env(safe-area-inset-bottom));">
                            <iframe id="mainFrame" src="about:blank" class="main-frame" style="flex:1; width:100%; border:none; background:transparent; min-height:240px;"></iframe>
                            <iframe id="logFrame" src="${url('pages/log.html')}" class="log-frame" style="flex:0 0 clamp(110px, 22vh, 180px); width:100%; border:none; background:#fff; border-top:2px dashed #ffd1dc;"></iframe>
                        </div>
                        <div class="action-footer" id="footer" style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:500px; z-index:100;"></div>
                    </div>
                `;
            }

            mainFrame = document.getElementById('mainFrame');
            logFrame  = document.getElementById('logFrame');

            if (!mainFrame) {
                fail('未找到 #mainFrame，无法加载主页');
                return;
            }

            attachFrameMonitor(mainFrame);
            attachFrameMonitor(logFrame);

            /* ---------------- 6e. 主页 iframe 预加载 ---------------- */

            const markHomeReady = (force = false) => {
                if (state.homeReady || state.fatal) return;
                if (homeLoadTimer) { clearTimeout(homeLoadTimer); homeLoadTimer = null; }
                if (!force) {
                    let w = null;
                    try { w = mainFrame.contentWindow; } catch { w = null; }
                    if (!w) return;
                    try {
                        if (w.location.href === 'about:blank') return;
                        // 同源时确认文档已 complete，避免二次导航中途被误判为 ready
                        const doc = mainFrame.contentDocument;
                        if (doc && doc.readyState !== 'complete') return;
                    } catch { /* 跨域，放过 */ }
                }
                state.homeReady = true;
                if (homeFallbackTimer) { clearTimeout(homeFallbackTimer); homeFallbackTimer = null; }
                clearHomeMessage();
                tryBoot();
            };

            const currentSrc = mainFrame.getAttribute('src');
            const alreadyNavigated = !!(currentSrc && currentSrc !== 'about:blank');

            mainFrame.addEventListener('load', () => {
                // fail / tryBoot 之后再发生的 load（例如 fail 里切回 about:blank 触发的）
                // 不应再挂新的 homeLoadTimer。
                if (state.homeReady || state.fatal || state.booted) return;
                if (homeLoadTimer) clearTimeout(homeLoadTimer);
                homeLoadTimer = setTimeout(() => {
                    homeLoadTimer = null;
                    markHomeReady(false);
                }, 300);
            });

            // 契约（pages/home.html 需配合）：
            //   try {
            //       const targetOrigin = location.origin === 'null' ? '*' : location.origin;
            //       window.parent.postMessage({ type: 'home-ready' }, targetOrigin);
            //   } catch {}
            onHomeMessage = (e) => {
                if (e.origin !== location.origin) return;
                if (!mainFrame || e.source !== mainFrame.contentWindow) return;
                if (e.data && e.data.type === 'home-ready') {
                      markHomeReady(true);

                     // 回执
                    try {
                              const targetOrigin = location.origin === 'null' ? '*' : location.origin;
                              e.source.postMessage({ type: 'home-ready-ack' }, targetOrigin);
                        } catch { /* ignore */ }
                }
            };
            window.addEventListener('message', onHomeMessage);

            if (alreadyNavigated) {
                console.log('🖼️ [Root Monitor] #mainFrame 已有内容，跳过导航');
                try {
                    const doc = mainFrame.contentDocument;
                    if (doc && doc.readyState === 'complete') markHomeReady(false);
                } catch { /* 跨域，交给 load / 10s 兜底 */ }
            } else {
                console.log('🖼️ [Root Monitor] 预加载主页 iframe...');
                mainFrame.src = url('pages/home.html');
            }

            if (!state.homeReady) {
                homeFallbackTimer = setTimeout(() => {
                    if (state.homeReady || state.fatal) return;
                    try {
                        const href = mainFrame.contentWindow.location.href;
                        const doc = mainFrame.contentDocument;
                        const notComplete = !doc || doc.readyState !== 'complete';
                        if ((href === 'about:blank' || notComplete) && doc && doc.body) {
                            doc.body.style.cssText = 'margin:0;padding:20px;font:14px/1.6 sans-serif;color:#c00;background:#fff;';
                            const p = doc.createElement('p');
                            p.style.margin = '0';
                            p.textContent = href === 'about:blank'
                                ? '⚠️ 主页加载超时（10s）。请检查 pages/home.html 路径与网络。'
                                : '⚠️ 主页加载超时（10s）。pages/home.html 可能仍在加载或存在错误。';
                            doc.body.appendChild(p);
                        }
                    } catch { /* 跨域或异常，跳过 */ }
                    markHomeReady(true);
                }, 10000);
            }

            // --- 6f. 引擎就绪信号 ---
            window.addEventListener('game-ready', markEngineReady, { once: true });
            if (gameReadyFired) markEngineReady();

            // 同步路径可能已 boot（外部脚本提前派发 game-ready），此时无需再轮询 / 加载引擎
            if (state.booted || state.fatal) return;

            // --- 6g. 兜底轮询 ---
            fallbackTimer = setInterval(() => {
                if (state.booted || state.fatal) { clearTimers(); return; }

                if (state.engineReady) {
                    clearInterval(fallbackTimer);
                    fallbackTimer = null;
                    return;
                }

                if (window.__engineReady) {
                    markEngineReady();
                    return;
                }

                if (typeof window.Game !== 'undefined' && !softReadyTimer) {
                    softReadyTimer = setTimeout(() => {
                        softReadyTimer = null;
                        if (state.booted || state.fatal || state.engineReady) return;
                        if (window.__engineReady) { markEngineReady(); return; }
                        console.warn('⚠️ [Root Monitor] game-ready 迟迟未到，使用 window.Game 软就绪');
                        markEngineReady();
                    }, 3000);
                }

                if (++tries > MAX_TRIES) {
                    fail('核心引擎加载超时，请检查网络或 js/main.js 路径');
                }
            }, 100);

            // --- 6h. 加载主引擎 ---
            console.log('⏳ [Root Monitor] 准备加载 js/main.js 引擎...');
            const script = document.createElement('script');
            script.type = 'module';
            script.src = url('js/main.js');
            script.onerror = () => {
                fail('无法加载核心引擎 js/main.js，请检查路径或网络！');
            };
            document.body.appendChild(script);

        } catch (err) {
            const reason = 'Monitor init 异常: ' + formatReason(err);
            console.error('❌ [Root Monitor] init 异常:', err);
            if (state.booted || state.fatal) {
                // init 已完成后才抛出的异常：只记录，不改变启动状态
                ensureOverlay();
                flushErrors();
                showError(reason);
            } else {
                fail(reason);
            }
        }
    };

    /* ================= 7. 启动 ================= */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
