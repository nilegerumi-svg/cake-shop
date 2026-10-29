// js/host/monitor/index.js
import './error-ui.js';

(function () {
    'use strict';
    if (window.__rootMonitorLoaded) return;
    window.__rootMonitorLoaded = true;

    // 1. 过滤无关报错
    window.addEventListener('error', (e) => {
        if (e.message && (e.message.includes('LIDNotifyId') || e.message.includes('WeixinJSBridge'))) return;
        window.CakeMonitorUI.showError(e.message || '全局脚本错误');
    }, true);

    // 2. 进度条更新器
    window.updateLoadingProgress = (text, percent) => {
        const textEl = document.getElementById('loading-text');
        const barEl = document.getElementById('loading-bar');
        if (textEl && text) textEl.innerText = text;
        if (barEl && percent !== undefined) barEl.style.width = `${percent}%`;
    };

    // 3. 隐藏 Loading
    const hideLoading = () => {
        const loadingEl = document.getElementById('app-loading');
        if (loadingEl) {
            loadingEl.style.opacity = '0';
            setTimeout(() => { loadingEl.style.display = 'none'; }, 300);
        }
    };

    // 4. 👈 核心修复：优雅的轮询渲染（解决渲染引擎加载慢的问题）
    let renderCheckCount = 0;
    const tryRender = () => {
        if (window.Cake && typeof window.Cake.renderAll === 'function') {
            console.log('🎨 [Monitor] 找到渲染引擎，开始绘制主界面！');
            try {
                window.Cake.renderAll();
                hideLoading();
                console.log('✅ [Monitor] 主界面渲染成功');
            } catch (err) {
                console.error('❌ [Monitor] 渲染时报错:', err);
            }
        } else {
            // 如果渲染引擎还没加载出来，每 100 毫秒等一次，最多等 5 秒
            renderCheckCount++;
            if (renderCheckCount < 50) {
                setTimeout(tryRender, 100);
            } else {
                console.warn('⚠️ [Monitor] 渲染引擎始终未加载，强行显示外壳');
                hideLoading();
            }
        }
    };

    // 监听正常的 game-ready
    window.addEventListener('game-ready', () => {
        console.log('🎨 [Monitor] 收到引擎就绪信号，准备渲染主界面...');
        tryRender(); // 呼叫防呆轮询渲染
    });

    // 5. 加载主引擎
    const script = document.createElement('script');
    script.type = 'module';
    script.src = new URL('js/main.js', document.baseURI).href;

    script.onload = () => {
        console.log('📦 [Monitor] main.js 加载完毕...');
    };
    
    script.onerror = () => { window.CakeMonitorUI.showError('无法加载 js/main.js'); hideLoading(); };
    document.body.appendChild(script);
})();
