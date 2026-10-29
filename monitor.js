// monitor.js — 根目录启动器（game.html 使用）
// 职责：加载 js/main.js、等待 game-ready、错误兜底、loading 收尾、iframe 监控。
(() => {
    'use strict';

    if (window.__rootMonitorLoaded) {
        console.warn('⚠️ [Root Monitor] 已加载，跳过重复初始化');
        return;
    }
    window.__rootMonitorLoaded = true;

    // 1. 开始页防御：检测到开始页（比如 index.html）直接跳过外壳初始化
    const IS_START_PAGE = (() => {
        try {
            return !!document.querySelector('.start-card') || !!document.getElementById('btnStart');
        } catch (_) { return false; }
    })();
    if (IS_START_PAGE) {
        console.log('%c📄 [Root Monitor] 检测到开始页，跳过游戏外壳初始化', 'color: #ff6b81; font-weight: bold;');
        return;
    }

    console.log('%c🛡️ [Root Monitor] 根目录总监视器已启动', 'color: #ff6b81; font-weight: bold; font-size: 14px;');

    const BASE_URI = document.baseURI || location.href;
    const url = (p) => new URL(p, BASE_URI).href;

    let gameReadyFired = false;
    window.addEventListener('game-ready', () => { gameReadyFired = true; }, { once: true });

    const state = {
        booted: false, fatal: false, engineReady: false,
        failReason: null, startedAt: Date.now(),
    };

    /* ==================== 错误捕获系统 ==================== */
    const MAX_ERRORS = 20, MAX_PENDING = 100, MAX_DISPLAY_COUNT = 999;
    const pendingErrors = [];
    const errorCounts = new Map();
    let overlayEl = null;
    let pendingDropWarned = false;

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
            errorCounts.delete(msg); errorCounts.set(msg, existing);
            return true;
        }
        const div = document.createElement('div');
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

    const ensureOverlay = () => {
        if (overlayEl && overlayEl.isConnected) return true;
        let existing = document.getElementById('error-overlay');
        if (existing) {
            overlayEl = existing;
            return true;
        }
        const el = document.createElement('div');
        el.id = 'error-overlay';
        el.style.cssText = 'display:none; position:fixed; top:0; left:0; right:0; max-height:40vh; overflow:auto; z-index:9999; background:rgba(200,0,0,0.9); color:#fff; font:12px/1.5 monospace; padding:8px 12px;';
        (document.body || document.documentElement).appendChild(el);
        overlayEl = el;
        return true;
    };

    const showError = (msg) => {
        const text = (msg === undefined || msg === null || msg === '') ? '(未知错误)' : String(msg);
        ensureOverlay();
        if (renderError(text)) return;
        flushErrors();
        if (renderError(text)) return;
        pendingErrors.push(text);
        if (pendingErrors.length > MAX_PENDING) pendingErrors.shift();
    };

    const formatReason = (reason) => {
        if (reason === undefined || reason === null || reason === '') return '未知错误';
        if (typeof reason === 'string') return reason;
        if (reason.message) return String(reason.message);
        try { return JSON.stringify(reason); } catch { return String(reason); }
    };

    window.addEventListener('error', (e) => {
        const t = e.target;
        let msg;
        if (t && t !== window && (t.src || t.href)) {
            msg = '资源加载失败: ' + (t.src || t.href);
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

    /* ==================== iframe 错误监控 ==================== */
    const frameHandlers = new WeakMap();
    const attachFrameMonitor = (frame) => {
        if (!frame) return;
        const bind = () => {
            let w;
            try {
                w = frame.contentWindow;
                if (!w || w === window) return;
                void w.location.href;
            } catch (_) { return; }
            try { if (w.location.href === 'about:blank') return; } catch (_) {}
            
            const prev = frameHandlers.get(frame);
            if (prev) {
                try {
                    prev.win.removeEventListener('error', prev.onError, true);
                    prev.win.removeEventListener('unhandledrejection', prev.onRejection);
                } catch (_) {}
            }
            const onError = (e) => {
                const t = e.target;
                let msg = (t && t !== w && (t.src || t.href)) ? '资源加载失败: ' + (t.src || t.href) : (e.message || '子页面脚本错误');
                showError('[iframe] ' + msg);
            };
            const onRejection = (e) => showError('[iframe] Promise: ' + formatReason(e.reason));
            
            w.addEventListener('error', onError, true);
            w.addEventListener('unhandledrejection', onRejection);
            frameHandlers.set(frame, { win: w, onError, onRejection });
        };
        frame.addEventListener('load', bind);
        const srcAttr = frame.getAttribute('src');
        if (srcAttr && srcAttr !== 'about:blank' && frame.contentDocument && frame.contentDocument.readyState === 'complete') {
            bind();
        }
    };

    /* ==================== 主流程 ==================== */
    const init = () => {
        let tries = 0;
        const MAX_TRIES = 150;
        let fallbackTimer = null, softReadyTimer = null;
        let loadingScreen = null, mainFrame = null, logFrame = null;

        const clearTimers = () => {
            if (fallbackTimer)  { clearInterval(fallbackTimer);  fallbackTimer = null; }
            if (softReadyTimer) { clearTimeout(softReadyTimer); softReadyTimer = null; }
        };

        const finishLoading = () => {
            const el = loadingScreen || document.getElementById('app-loading');
            if (!el) return;
            el.style.opacity = '0';
            setTimeout(() => {
                if (el && el.parentNode) { el.style.display = 'none'; el.setAttribute('aria-hidden', 'true'); }
            }, 300);
        };

        // 动态设置 --footer-h 适配新的底部栏高度
        const setupFooterHeight = () => {
            const footer = document.getElementById('footer');
            if (!footer) return;
            const update = () => {
                const h = footer.offsetHeight || 0;
                if (h > 0) document.documentElement.style.setProperty('--footer-h', h + 'px');
            };
            update();
            if (window.ResizeObserver) {
                try { new ResizeObserver(update).observe(footer); } catch (_) {}
            }
        };

        const fail = (reason) => {
            if (state.booted || state.fatal) return;
            state.fatal = true; state.failReason = reason;
            clearTimers();
            console.error(`❌ [Root Monitor] 启动失败 @${Date.now() - state.startedAt}ms:`, reason);
            showError(reason);
            if (mainFrame) { try { mainFrame.src = 'about:blank'; } catch (_) {} }
            finishLoading();
        };

        const tryBoot = () => {
            if (state.booted || state.fatal || !state.engineReady) return;
            state.booted = true;
            clearTimers();
            console.log(`%c✅ [Root Monitor] 核心引擎就绪，耗时 ${Date.now() - state.startedAt}ms`, 'color: #4caf50; font-weight: bold;');
            finishLoading();
        };

        const markEngineReady = () => {
            if (softReadyTimer) { clearTimeout(softReadyTimer); softReadyTimer = null; }
            if (state.engineReady || state.fatal) return;
            state.engineReady = true;
            tryBoot();
        };

        try {
            const root = document.getElementById('app-root');
            if (!root) { fail('未找到 #app-root，页面结构异常'); return; }

            loadingScreen = document.getElementById('app-loading');
            ensureOverlay(); flushErrors();

            // 👈 简化：直接抓取 game.html 里已经写好的静态框架
            mainFrame = document.getElementById('mainFrame');
            logFrame = document.getElementById('logFrame');
            
            if (mainFrame) attachFrameMonitor(mainFrame);
            if (logFrame) attachFrameMonitor(logFrame);
            setupFooterHeight();

            // 监听引擎状态
            window.addEventListener('game-ready', markEngineReady, { once: true });
            window.addEventListener('game-error', (e) => {
                const d = e.detail || {};
                fail(d.message || '核心引擎初始化失败');
            });

            if (gameReadyFired) markEngineReady();
            if (state.booted || state.fatal) return;

            // 轮询检测引擎是否就绪（兜底）
            fallbackTimer = setInterval(() => {
                if (state.booted || state.fatal) { clearTimers(); return; }
                if (state.engineReady) { clearInterval(fallbackTimer); fallbackTimer = null; return; }
                if (window.__engineReady) { markEngineReady(); return; }
                if (window.__engineFailed) { fail(window.__engineError || '核心引擎初始化失败'); return; }

                if (typeof window.Game !== 'undefined' && !softReadyTimer) {
                    softReadyTimer = setTimeout(() => {
                        softReadyTimer = null;
                        if (state.booted || state.fatal || state.engineReady) return;
                        if (window.__engineReady) { markEngineReady(); return; }
                        console.warn('⚠️ [Root Monitor] game-ready 迟到，使用 window.Game 软就绪');
                        markEngineReady();
                    }, 3000);
                }
                if (++tries > MAX_TRIES) fail('核心引擎加载超时，请检查网络或 js/main.js 路径');
            }, 100);

            // 动态加载引擎
            console.log('⏳ [Root Monitor] 准备加载 js/main.js 引擎...');
            const script = document.createElement('script');
            script.type = 'module';
            script.src = url('js/main.js');
            script.onerror = () => fail('无法加载核心引擎 js/main.js，请检查路径或网络！');
            document.body.appendChild(script);

        } catch (err) {
            fail('Monitor init 异常: ' + formatReason(err));
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
