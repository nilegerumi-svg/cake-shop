// js/host/monitor/index.js
import './error-ui.js';

(function () {
    'use strict';

    if (window.__rootMonitorLoaded) return;
    window.__rootMonitorLoaded = true;

    // 1. 接管父页面的全局同步报错
    window.addEventListener('error', (e) => {
        window.CakeMonitorUI.showError(e.message || '全局脚本错误');
    }, true);
    window.addEventListener('unhandledrejection', (e) => {
        window.CakeMonitorUI.showError(e.reason?.message || '未处理的 Promise 异常');
    });

    // 2. 监听子页面 iframe 发来的错误消息
    window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'page-error') {
            window.CakeMonitorUI.showError(`[子页面] ${e.data.msg}`);
        }
    });

    // 👈 3. 核心新增：监听引擎完全就绪的信号！
    window.addEventListener('game-ready', () => {
        console.log('🎨 [Monitor] 收到引擎就绪信号，开始渲染主界面...');
        
        // 隐藏 Loading 屏
        const loadingEl = document.getElementById('app-loading');
        if (loadingEl) {
            loadingEl.style.opacity = '0';
            setTimeout(() => loadingEl.style.display = 'none', 300);
        }

        // 触发 UI 渲染
        if (window.Cake && typeof window.Cake.renderAll === 'function') {
            try {
                window.Cake.renderAll();
                console.log('✅ [Monitor] 主界面渲染成功');
            } catch (err) {
                console.error('❌ [Monitor] 主界面渲染失败:', err);
            }
        }
    });

    // 4. 加载核心引擎 js/main.js
    const script = document.createElement('script');
    script.type = 'module';
    script.src = new URL('js/main.js', document.baseURI).href;
    
    const loadingText = document.getElementById('loading-text');
    if (loadingText) loadingText.innerText = '正在加载引擎...';

    script.onload = () => {
        // main.js 加载完了，什么都不用做，安静等待它内部的 game-ready 事件即可。
        console.log('📦 [Monitor] main.js 脚本已加载，等待引擎初始化...');
    };
    
    script.onerror = () => {
        window.CakeMonitorUI.showError('无法加载核心引擎 js/main.js，请检查网络！');
    };

    document.body.appendChild(script);
})();
