// js/host/error.js
(() => {
    'use strict';

    // 根 monitor.js 已接管全局错误捕获与 iframe 错误转发，
    // 这里直接退出，避免同一条错误在 overlay 上重复显示两次。
    if (window.__rootMonitorLoaded) {
        console.log('🛡️ [HostError] 根监视器已接管错误捕获，跳过重复绑定');
        return;
    }

    const errorOverlay = document.getElementById('error-overlay');
    if (!errorOverlay) return;

    const MAX_ERRORS = 20;
    let errorCount = 0;

    const showError = (msg) => {
        if (errorCount >= MAX_ERRORS) return;
        errorCount += 1;
        errorOverlay.style.display = 'block';

        const line = document.createElement('div');
        line.textContent = `🚨 ${msg}`;
        errorOverlay.appendChild(line);

        if (errorCount === MAX_ERRORS) {
            const more = document.createElement('div');
            more.textContent = '（错误过多，已停止显示）';
            errorOverlay.appendChild(more);
        }
    };

    const formatError = (e) => {
        const file = e.filename ? e.filename.split('/').pop() : 'unknown';
        return `${e.message} (${file}:${e.lineno})`;
    };

    window.addEventListener('error', (e) => showError(`主页面: ${formatError(e)}`));

    const bindErrorCatcher = (iframe, name) => {
        const attach = () => {
            try {
                const win = iframe.contentWindow;
                const doc = iframe.contentDocument;
                if (!win || !doc) return;
                // 用 document 做幂等标记：iframe 导航后是新 document
                if (doc.__hostErrorBound) return;
                doc.__hostErrorBound = true;
                win.addEventListener('error', (e) => showError(`${name}: ${formatError(e)}`));
            } catch (_) { /* 跨域忽略 */ }
        };
        iframe.addEventListener('load', attach);
        attach();
    };

    window.HostError = { showError, bindErrorCatcher };
})();
