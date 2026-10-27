// js/monitor.js
(() => {
    'use strict';
    
    console.log('%c🛡️ [Root Monitor] 根目录总监视器已启动', 'color: #ff6b81; font-weight: bold; font-size: 14px;');

    // 1. 动态构建游戏外壳
    const root = document.getElementById('app-root');
    if (root) {
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

    // 🌟 暴露全局方法：让 main.js 可以更新 Loading 状态
    window.updateLoadingUI = (text, isError = false) => {
        const loading = document.getElementById('app-loading');
        if (loading) {
            loading.innerHTML = `<span style="color:${isError ? 'red' : '#d6336c'}">${text}</span>`;
        }
    };

    // 2. 加载主引擎
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './js/main.js';
    
    script.onload = () => {
        setTimeout(() => {
            window.updateLoadingUI('🏠 正在唤醒你的甜蜜小屋...');
            const mainFrame = document.getElementById('mainFrame');
            if (mainFrame) {
                mainFrame.src = 'pages/home.html';
                mainFrame.onload = () => {
                    const loadingScreen = document.getElementById('app-loading');
                    if (loadingScreen) {
                        loadingScreen.style.opacity = '0';
                        setTimeout(() => { loadingScreen.style.display = 'none'; }, 300);
                    }
                };
            }
        }, 200);
    };

    document.body.appendChild(script);
})();
