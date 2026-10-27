// 根目录的 monitor.js
(() => {
    'use strict';
    
    console.log('%c🛡️ [Root Monitor] 根目录总监视器已启动', 'color: #ff6b81; font-weight: bold; font-size: 14px;');

    // 1. 动态构建游戏外壳（因为 main.js 不管 DOM 了）
    const root = document.getElementById('app-root');
    if (root) {
        root.innerHTML = `
            <div class="app-wrapper" style="display:flex; flex-direction:column; height:100vh; height:100dvh;">
                <header id="header"></header>
                <nav id="navBar"></nav>
                <div class="split-container" style="flex:1; display:flex; flex-direction:column; overflow:hidden; padding-bottom: calc(var(--footer-h, 70px) + env(safe-area-inset-bottom));">
                    <!-- 依然是 about:blank，由监视器决定何时加载 -->
                    <iframe id="mainFrame" src="about:blank" class="main-frame" style="flex:1; width:100%; border:none; background:transparent; min-height:240px;"></iframe>
                    <iframe id="logFrame" src="pages/log.html" class="log-frame" style="flex:0 0 clamp(110px, 22vh, 180px); width:100%; border:none; background:#fff; border-top:2px dashed #ffd1dc;"></iframe>
                </div>
                <div class="action-footer" id="footer" style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:500px; z-index:100;"></div>
            </div>
        `;
    }

    // 2. 全局错误捕获
    window.addEventListener('error', (e) => {
        console.error('❌ [Root Monitor] 捕获到全局错误:', e.message);
        const overlay = document.getElementById('error-overlay');
        if (overlay) {
            overlay.style.display = 'block';
            overlay.innerHTML += `<div style="border-bottom:1px solid #fff; padding:5px 0;">🚨 系统异常: ${e.message}</div>`;
        }
    });

    // 3. 动态加载主引擎
    console.log('⏳ [Root Monitor] 准备加载 js/main.js 引擎...');
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './js/main.js';
    
    // 🌟 核心：script.onload 保证了 main.js 内部的所有 import 全部执行完毕！
    script.onload = () => {
        console.log('%c✅ [Root Monitor] 核心引擎及所有模块加载完毕！', 'color: #4caf50; font-weight: bold;');
        
        // 此时 100% 保证 window.Game 和 initPage 已经挂载完毕，无需 setTimeout
        if (typeof window.Game === 'undefined') {
            console.error('❌ [Root Monitor] 致命错误：main.js 执行了，但 window.Game 未挂载！请检查 shared.js');
            return;
        }

        // 4. 唤醒游戏界面
        const mainFrame = document.getElementById('mainFrame');
        if (mainFrame) {
            console.log('🖼️ [Root Monitor] 正式加载主页 iframe...');
            mainFrame.src = 'pages/home.html';
            
            mainFrame.onload = () => {
                const loadingScreen = document.getElementById('app-loading');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => { loadingScreen.style.display = 'none'; }, 300);
                }
            };
        }
    };

    script.onerror = () => {
        console.error('❌ [Root Monitor] 致命错误：无法加载 js/main.js，请检查路径或网络！');
    };

    document.body.appendChild(script);
})();
