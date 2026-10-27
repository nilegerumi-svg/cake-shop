// js/monitor.js
(() => {
    'use strict';

    console.log('%c🛡️ [Root Monitor] 根目录总监视器已启动', 'color: #ff6b81; font-weight: bold; font-size: 14px;');

    // 进度条更新（main.js 依赖）
    window.updateLoadingProgress = (text, percent) => {
        const textEl = document.getElementById('loading-text');
        const barEl = document.getElementById('loading-bar');
        // 边界保护：避免负数或超过 100% 的异常宽度
        const p = Math.max(0, Math.min(100, Number(percent) || 0));
        if (textEl) textEl.innerText = text;
        if (barEl) barEl.style.width = p + '%';
    };

    // 1. 动态构建外壳（幂等：已存在就不重建）
    const root = document.getElementById('app-root');
    if (root && !document.getElementById('mainFrame')) {
        root.innerHTML = `
            <div class="app-wrapper" style="display:flex; flex-direction:column; height:100vh; height:100dvh;">
                <header id="header"></header>
                <nav id="navBar"></nav>
                <div class="split-container" style="flex:1; display:flex; flex-direction:column; overflow:hidden; padding-bottom: calc(var(--footer-h, 70px) + env(safe-area-inset-bottom));">
                    <iframe id="mainFrame" src="about:blank" class="main-frame" style="flex:1; width:100%; border:none; background:transparent; min-height:240px;"></iframe>
                    <iframe id="logFrame" src="pages/log.html" class="log-frame" style="flex:0 0 clamp(110px, 22vh, 180px); width:100%; border:none; background:#fff; border-top:2px dashed #ffd1dc;"></iframe>
                </div>
                <div class="action-footer" id="footer" style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:500px; z-index:100;"></div>
            </div>
        `;
    }

    // 2. 全局错误捕获（error + unhandledrejection，只绑一次）
    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );

    const showError = (msg) => {
        const overlay = document.getElementById('error-overlay');
        if (!overlay) return;
        overlay.style.display = 'block';
        // 用 textContent 而非 innerHTML，天然防注入
        const div = document.createElement('div');
        div.style.cssText = 'border-bottom:1px solid #fff; padding:5px 0;';
        div.textContent = '🚨 系统异常: ' + escapeHtml(msg);
        overlay.appendChild(div);
        // 限制最多保留 20 条，避免无限膨胀
        while (overlay.children.length > 20) overlay.removeChild(overlay.firstChild);
    };

    if (!window.__rootErrorBound) {
        window.__rootErrorBound = true;
        window.addEventListener('error', (e) => {
            console.error('❌ [Root Monitor] 捕获到全局错误:', e.message);
            showError(e.message);
        });
        // 补充：Promise 异步错误不会触发 error 事件，必须单独监听
        window.addEventListener('unhandledrejection', (e) => {
            const reason = e.reason && e.reason.message ? e.reason.message : String(e.reason);
            console.error('❌ [Root Monitor] 捕获到未处理的 Promise 异常:', reason);
            showError(reason);
        });
    }

    // 3. 启动协调：引擎就绪 + 主页 iframe 就绪，双条件满足才正式启动
    let booted = false;
    let engineReady = false;
    let homeReady = false;
    let fallbackTimer = null;

    const mainFrame = document.getElementById('mainFrame');

    const tryBoot = () => {
        if (booted || !engineReady || !homeReady) return;
        booted = true;
        // 成功启动后立即清除兜底定时器，避免空转
        if (fallbackTimer) { clearInterval(fallbackTimer); fallbackTimer = null; }

        console.log('%c✅ [Root Monitor] 核心引擎及所有模块加载完毕！', 'color: #4caf50; font-weight: bold;');

        const loadingScreen = document.getElementById('app-loading');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 300);
        }
    };

    // 3a. 主页 iframe：并行预加载，破除「引擎等主页、主页等引擎」的死结
    if (mainFrame) {
        const markHomeReady = () => {
            if (homeReady) return;
            homeReady = true;
            tryBoot();
        };
        mainFrame.addEventListener('load', markHomeReady);
        console.log('🖼️ [Root Monitor] 预加载主页 iframe...');
        mainFrame.src = 'pages/home.html';

        // 兜底：若 iframe 10 秒内没触发 load（加载失败/被拦截），也放行，避免 loading 卡死
        setTimeout(markHomeReady, 10000);
    } else {
        console.error('❌ [Root Monitor] 找不到 #mainFrame！');
        homeReady = true; // 无主页可加载时不阻塞启动
    }

    // 3b. 引擎就绪：优先依赖 game-ready 事件
    window.addEventListener('game-ready', () => {
        engineReady = true;
        tryBoot();
    });

    // 3c. 兜底轮询：game-ready 没来则检测就绪标志（最多 15 秒）
    let tries = 0;
    fallbackTimer = setInterval(() => {
        if (booted) { clearInterval(fallbackTimer); fallbackTimer = null; return; }
        if (tries++ > 150) {
            clearInterval(fallbackTimer);
            fallbackTimer = null;
            console.error('❌ [Root Monitor] 引擎 15 秒内未就绪（game-ready 未派发且未检测到就绪标志）。');
            showError('核心引擎加载超时，请检查网络或 js/main.js 路径');
            return;
        }
        // 注意：ES Module 有独立作用域，main.js 若不显式 window.Game = ... 则检测不到；
        // 因此同时兼容 window.Game 与 window.__engineReady 两种就绪标志。
        if (typeof window.Game !== 'undefined' || window.__engineReady === true) {
            engineReady = true;
            clearInterval(fallbackTimer);
            fallbackTimer = null;
            tryBoot();
        }
    }, 100);

    // 4. 加载主引擎
    console.log('⏳ [Root Monitor] 准备加载 js/main.js 引擎...');
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './js/main.js';
    script.onerror = () => {
        console.error('❌ [Root Monitor] 致命错误：无法加载 js/main.js，请检查路径或网络！');
        showError('无法加载核心引擎 js/main.js');
    };
    document.body.appendChild(script);
})();
