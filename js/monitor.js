// js/monitor.js
(() => {
    'use strict';
    
    console.log('%c🛡️ [Root Monitor] 根目录总监视器已启动', 'color: #ff6b81; font-weight: bold; font-size: 14px;');

    // 1. 动态构建游戏外壳，并加上带有进度条的 Loading 界面
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
            
            <!-- 🌟 终极 Loading 界面，带进度条 -->
            <div id="app-loading" style="position:fixed; top:0; left:0; width:100%; height:100%; background:#fff0f5; z-index:99999; display:flex; flex-direction:column; justify-content:center; align-items:center; transition:opacity 0.3s;">
                <div style="font-size: 24px; font-weight: bold; color: #d6336c; margin-bottom: 20px;">🍰 甜蜜物语</div>
                <div id="loading-text" style="font-size: 14px; color: #888; margin-bottom: 15px; font-weight: bold;">正在准备启动...</div>
                <div style="width: 80%; max-width: 300px; height: 12px; background: #ffe4e1; border-radius: 6px; overflow: hidden; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);">
                    <div id="loading-bar" style="width: 0%; height: 100%; background: #ff8fa3; transition: width 0.2s ease;"></div>
                </div>
            </div>
        `;
    }

    // 暴露给 main.js 的进度更新函数
    window.updateLoadingProgress = (text, percent) => {
        const textEl = document.getElementById('loading-text');
        const barEl = document.getElementById('loading-bar');
        if (textEl) textEl.innerText = text;
        if (barEl) barEl.style.width = percent + '%';
    };

    // 2. 加载主引擎
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './js/main.js';
    
    script.onload = () => {
        // 主引擎加载完毕，延迟一下跳转主页
        setTimeout(() => {
            window.updateLoadingProgress('🏠 引擎准备就绪，正在唤醒小屋...', 100);
            
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
