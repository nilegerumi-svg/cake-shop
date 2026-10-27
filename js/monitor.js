// js/monitor.js
(() => {
    'use strict';

    console.log('%c🛡️ [Root Monitor] 根目录总监视器已启动', 'color: #ff6b81; font-weight: bold; font-size: 14px;');

    // 进度条更新（main.js 依赖）
    window.updateLoadingProgress = (text, percent) => {
        const textEl = document.getElementById('loading-text');
        const barEl = document.getElementById('loading-bar');
        if (textEl) textEl.innerText = text;
        if (barEl) barEl.style.width = (percent || 0) + '%';
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
                    <iframe id="logframe" src="pages/log.html" class="log-frame" style="flex:0 0 clamp(110px, 22vh, 180px); width:100%; border:none; background:#fff; border-top:2px dashed #ffd1dc;"></iframe>
                </div>
                <div class="action-footer" id="footer" style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:500px; z-index:100;"></div>
            </div>
        `;
    }

    // 2. 全局错误捕获（只绑一次）
    if (!window.__rootErrorBound) {
        window.__rootErrorBound = true;
        window.addEventListener('error', (e) => {
            console.error('❌ [Root Monitor] 捕获到全局错误:', e.message);
            const overlay = document.getElementById('error-overlay');
            if (overlay) {
                overlay.style.display = 'block';
                overlay.innerHTML += `<div style="border-bottom:1px solid #fff; padding:5px 0;">🚨 系统异常: ${e.message}</div>`;
            }
        });
    }

    // 3. 唤醒主页（只执行一次）
    let booted = false;
    const boot = () => {
        if (booted) return;
        booted = true;

        const mainFrame = document.getElementById('mainFrame');
        if (!mainFrame) {
            console.error('❌ [Root Monitor] 找不到 #mainFrame！');
            return;
        }

        console.log('%c✅ [Root Monitor] 核心引擎及所有模块加载完毕！', 'color: #4caf50; font-weight: bold;');
        console.log('🖼️ [Root Monitor] 正式加载主页 iframe...');
        mainFrame.src = 'pages/home.html';

        mainFrame.onload = () => {
            const loadingScreen = document.getElementById('app-loading');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => { loadingScreen.style.display = 'none'; }, 300);
            }
        };
    };

    // 主路径：main.js 完成后派发 game-ready
    window.addEventListener('game-ready', boot);

    // 兜底：如果 game-ready 没来，轮询 window.Game（最多 15 秒）
    let tries = 0;
    const fallback = setInterval(() => {
        if (tries++ > 150) { clearInterval(fallback); return; }
        if (typeof window.Game !== 'undefined') {
            clearInterval(fallback);
            boot();
        }
    }, 100);

    // 4. 加载主引擎
    console.log('⏳ [Root Monitor] 准备加载 js/main.js 引擎...');
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './js/main.js';
    script.onerror = () => {
        console.error('❌ [Root Monitor] 致命错误：无法加载 js/main.js，请检查路径或网络！');
    };
    document.body.appendChild(script);
})();
