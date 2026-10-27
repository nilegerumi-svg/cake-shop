// /monitor.js (根目录)
(() => {
    'use strict';
    
    console.log('%c🛡️ [Root Monitor] 根目录总监视器已启动', 'color: #ff6b81; font-weight: bold; font-size: 14px;');

    // 1. 全局错误捕获（最外层防御）
    window.addEventListener('error', (e) => {
        console.error('❌ [Root Monitor] 捕获到全局错误:', e.message);
        const overlay = document.getElementById('error-overlay');
        if (overlay) {
            overlay.style.display = 'block';
            overlay.innerHTML += `<div style="border-bottom:1px solid #fff; padding:5px 0;">🚨 系统异常: ${e.message} (${e.filename ? e.filename.split('/').pop() : 'unknown'})</div>`;
        }
    });

    // 2. 动态加载主引擎
    console.log('⏳ [Root Monitor] 准备加载 js/main.js 引擎...');
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './js/main.js';
    
    script.onload = () => {
        console.log('%c✅ [Root Monitor] 核心引擎加载完毕！', 'color: #4caf50; font-weight: bold;');
        
        // 3. 等待主引擎完全初始化（给 Game 对象挂载留出微秒级的时间）
        setTimeout(() => {
            // 检查引擎是否真的挂载成功了
            if (typeof window.Game === 'undefined') {
                console.error('❌ [Root Monitor] 致命错误：main.js 执行了，但 window.Game 未挂载！请检查 shared.js');
                return;
            }
            console.log('✅ [Root Monitor] 确认 Game 对象已就位。');

            // 4. 唤醒游戏界面（如果页面还在等待加载的话）
            const loadingScreen = document.getElementById('app-loading');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => { loadingScreen.style.display = 'none'; }, 300);
            }

            // 5. 处理 iframe 的加载逻辑
            const mainFrame = document.getElementById('mainFrame');
            if (mainFrame && mainFrame.src === 'about:blank') {
                console.log('🖼️ [Root Monitor] 引擎就绪，正式加载主页 iframe...');
                mainFrame.src = 'pages/home.html'; // 此时再塞入真实页面
            }
        }, 100); 
    };

    script.onerror = () => {
        console.error('❌ [Root Monitor] 致命错误：无法加载 js/main.js，请检查路径或网络！');
    };

    document.body.appendChild(script);
})();
