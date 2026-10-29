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

    // 2. 👈 核心：监听子页面 iframe 发来的错误消息
    window.addEventListener('message', (e) => {
        // 处理子页面发来的崩溃报错
        if (e.data && e.data.type === 'page-error') {
            window.CakeMonitorUI.showError(`[子页面] ${e.data.msg}`);
        }
    });

    // 3. 加载核心引擎 js/main.js
    const script = document.createElement('script');
    script.type = 'module';
    script.src = new URL('js/main.js', document.baseURI).href;
    
    // 监听进度条（如果你是用的之前那个带有 DOM 的 monitor）
    const loadingText = document.getElementById('loading-text');
    if (loadingText) loadingText.innerText = '正在加载引擎...';

    script.onload = () => {
        const loadingEl = document.getElementById('app-loading');
        if (loadingEl) {
            loadingEl.style.opacity = '0';
            setTimeout(() => loadingEl.style.display = 'none', 300);
        }
    };
    
    script.onerror = () => {
        window.CakeMonitorUI.showError('无法加载核心引擎 js/main.js，请检查网络！');
    };

    document.body.appendChild(script);
})();
