// js/host/error.js
(() => {
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
                if (!win || win.__errorBound) return;
                win.__errorBound = true;
                win.addEventListener('error', (e) => showError(`${name}: ${formatError(e)}`));
            } catch (_) { /* 跨域时忽略 */ }
        };
        iframe.addEventListener('load', attach);
        attach();
    };

    // 挂载到全局
    window.HostError = { showError, bindErrorCatcher };
})();
