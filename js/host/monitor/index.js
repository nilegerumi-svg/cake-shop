// js/host/monitor/index.js
import './error-ui.js';

(function () {
    'use strict';
    if (window.__rootMonitorLoaded) return;
    window.__rootMonitorLoaded = true;

    window.addEventListener('error', (e) => {
        if (e.message && (e.message.includes('LIDNotifyId') || e.message.includes('WeixinJSBridge'))) return;
        window.CakeMonitorUI.showError(e.message || '全局脚本错误');
    }, true);

    window.updateLoadingProgress = (text, percent) => {
        const textEl = document.getElementById('loading-text');
        const barEl = document.getElementById('loading-bar');
        if (textEl && text) textEl.innerText = text;
        if (barEl && percent !== undefined) barEl.style.width = `${percent}%`;
    };

    // 👈 终极强杀：直接暴力移除整个 DOM 节点！
    const forceKillLoading = () => {
        const loadingEl = document.getElementById('app-loading');
        if (loadingEl) {
            console.log('🔪 [Monitor] 强杀 Loading 遮罩层！');
            loadingEl.style.setProperty('display', 'none', 'important');
            loadingEl.style.setProperty('opacity', '0', 'important');
            loadingEl.style.setProperty('z-index', '-999', 'important');
            if (loadingEl.parentNode) loadingEl.parentNode.removeChild(loadingEl); // 直接连根拔起
        }
    };

    let renderCheckCount = 0;
    const tryRender = () => {
        if (window.Cake && typeof window.Cake.renderAll === 'function') {
            try {
                window.Cake.renderAll();
                forceKillLoading(); // 画完立刻杀遮罩
            } catch (err) {
                console.error('❌ [Monitor] 渲染时报错:', err);
            }
        } else {
            renderCheckCount++;
            if (renderCheckCount < 50) {
                setTimeout(tryRender, 100);
            } else {
                forceKillLoading();
            }
        }
    };

    window.addEventListener('game-ready', () => {
        tryRender();
    });

    const script = document.createElement('script');
    script.type = 'module';
    script.src = new URL('js/main.js', document.baseURI).href;
    script.onload = () => {
        // 给一个兜底的强杀时间
        setTimeout(forceKillLoading, 2500);
    };
    script.onerror = () => { window.CakeMonitorUI.showError('无法加载 js/main.js'); forceKillLoading(); };
    document.body.appendChild(script);
})();
