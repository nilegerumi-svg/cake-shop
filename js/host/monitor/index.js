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

    // 兜底放行：即使引擎迟迟未就绪，也平滑收起加载遮罩
    const forceKillLoading = () => {
        console.log('🔧 [Monitor] 就绪超时，放行加载遮罩层');
        gracefulHideLoading();
    };

    // 加载遮罩最短展示时长：避免模块加载过快导致加载画面一闪而过
    const LOADING_MIN_MS = 1200;
    const LOADING_FADE_MS = 400;
    const loadingShownAt = Date.now();

    // 平滑隐藏加载遮罩：先把进度条拉满，再保证至少展示 LOADING_MIN_MS 后淡出
    const gracefulHideLoading = () => {
        const barEl = document.getElementById('loading-bar');
        if (barEl) barEl.style.width = '100%';

        const remaining = LOADING_MIN_MS - (Date.now() - loadingShownAt);
        const doHide = () => {
            const loadingEl = document.getElementById('app-loading');
            if (!loadingEl || !loadingEl.isConnected) return;
            loadingEl.style.transition = 'opacity 0.4s ease';
            loadingEl.style.setProperty('opacity', '0', 'important');
            setTimeout(() => {
                if (!loadingEl.isConnected) return;
                loadingEl.style.setProperty('display', 'none', 'important');
                if (loadingEl.parentNode) loadingEl.parentNode.removeChild(loadingEl);
            }, LOADING_FADE_MS);
        };
        if (remaining > 0) setTimeout(doHide, remaining);
        else doHide();
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
