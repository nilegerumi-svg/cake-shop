// js/monitor.js
(() => {
    'use strict';
    
    console.log('%c🛡️ [Root Monitor] 根目录总监视器已启动', 'color: #ff6b81; font-weight: bold; font-size: 14px;');

    // 暴露全局进度条更新方法，供 main.js 调用
    window.updateLoadingProgress = (text, percent) => {
        const textEl = document.getElementById('loading-text');
        const barEl = document.getElementById('loading-bar');
        if (textEl) textEl.innerText = text;
        if (barEl) barEl.style.width = percent + '%';
    };

    // 动态加载主引擎
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './js/main.js';
    
    script.onload = () => {
        console.log('%c✅ [Root Monitor] 主引擎全部加载完毕，准备跳转主页！', 'color: #4caf50; font-weight: bold;');
        window.updateLoadingProgress('🏠 引擎准备就绪，正在唤醒小屋...', 100);
        
        setTimeout(() => {
            const mainFrame = document.getElementById('mainFrame');
            if (mainFrame) {
                mainFrame.src = 'pages/home.html';
                
                // 主页真正加载完毕后，淡出进度条
                mainFrame.onload = () => {
                    const loadingScreen = document.getElementById('app-loading');
                    if (loadingScreen) {
                        loadingScreen.style.opacity = '0';
                        setTimeout(() => { loadingScreen.style.display = 'none'; }, 300);
                    }
                };
            }
        }, 300);
    };

    script.onerror = () => {
        window.updateLoadingProgress('❌ main.js 加载失败，请检查路径', 100);
    };

    document.body.appendChild(script);
})();
