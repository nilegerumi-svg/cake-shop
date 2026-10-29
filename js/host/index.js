// js/host/monitor/index.js
import './error-ui.js';

(function () {
    'use strict';

    if (window.__rootMonitorLoaded) return;
    window.__rootMonitorLoaded = true;

    // 1. 屏蔽微信/手机浏览器的幽灵报错
    window.addEventListener('error', (e) => {
        if (e.message && (e.message.includes('LIDNotifyId') || e.message.includes('WeixinJSBridge'))) {
            return; // 无视这些没用的报错
        }
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

    // 👈 3. 终极核心：监听引擎就绪，强行召唤 UI！
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
        // 这里我们不再隐藏 loading，而是安静等待 game-ready 事件
        console.log('📦 [Monitor] main.js 加载完毕，等待引擎自检...');
    };
    
    script.onerror = () => {
        window.CakeMonitorUI.showError('无法加载核心引擎 js/main.js，请检查网络！');
    };

    document.body.appendChild(script);
})();
