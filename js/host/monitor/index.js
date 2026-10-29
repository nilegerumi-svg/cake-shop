// js/host/monitor/index.js
import './error-ui.js';

(function () {
    'use strict';

    if (window.__rootMonitorLoaded) return;
    window.__rootMonitorLoaded = true;

    // 1. 过滤微信幽灵报错
    window.addEventListener('error', (e) => {
        if (e.message && (e.message.includes('LIDNotifyId') || e.message.includes('WeixinJSBridge'))) return;
        window.CakeMonitorUI.showError(e.message || '全局脚本错误');
    }, true);
    
    window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'page-error') window.CakeMonitorUI.showError(`[子页面] ${e.data.msg}`);
    });

    // 2. 👈 核心恢复：进度条与文字更新引擎！
    window.updateLoadingProgress = (text, percent) => {
        const textEl = document.getElementById('loading-text');
        const barEl = document.getElementById('loading-bar');
        if (textEl && text) textEl.innerText = text;
        if (barEl && percent !== undefined) {
            barEl.style.width = `${percent}%`;
            barEl.style.background = '#ff8fa3'; // 确保进度条颜色显示
        }
    };

    const hideLoading = () => {
        const loadingEl = document.getElementById('app-loading');
        if (loadingEl) {
            loadingEl.style.opacity = '0';
            setTimeout(() => { loadingEl.style.display = 'none'; }, 300);
        }
    };

    // 3. 引擎完全就绪
    window.addEventListener('game-ready', () => {
        console.log('🎨 [Monitor] 收到引擎就绪信号，开始渲染主界面...');
        hideLoading();
        if (window.Cake && typeof window.Cake.renderAll === 'function') {
            try { window.Cake.renderAll(); } catch (err) { console.error(err); }
        }
    });

    // 4. 加载主引擎
    const script = document.createElement('script');
    script.type = 'module';
    script.src = new URL('js/main.js', document.baseURI).href;

    script.onload = () => {
        console.log('📦 [Monitor] main.js 已加载，等待 game-ready...');
        // 👈 终极防卡死保险：3秒后如果遮罩还在，强行关掉，让你看到日志！
        setTimeout(() => {
            const loadingEl = document.getElementById('app-loading');
            if (loadingEl && loadingEl.style.display !== 'none') {
                console.warn('⚠️ [Monitor] 引擎就绪超时，强制关闭 Loading 遮罩以查看日志');
                hideLoading();
            }
        }, 3000);
    };
    
    script.onerror = () => {
        window.CakeMonitorUI.showError('无法加载 js/main.js');
        hideLoading();
    };

    document.body.appendChild(script);
})();
