// js/host/main.js
(() => {
    'use strict';

    const mainFrame = document.getElementById('mainFrame');
    const logFrame  = document.getElementById('logFrame');
    const footer    = document.getElementById('footer');

    // 1. 绑定错误捕获（HostError 不存在时自动跳过）
    if (window.HostError) {
        if (mainFrame) window.HostError.bindErrorCatcher(mainFrame, '主页');
        if (logFrame)  window.HostError.bindErrorCatcher(logFrame, '日志');
    }

    // 2. footer 高度动态调整（monitor.js 也做了，这里幂等覆盖，无害）
    if (footer && window.ResizeObserver) {
        const ro = new ResizeObserver(() => {
            document.documentElement.style.setProperty('--footer-h', `${footer.offsetHeight}px`);
        });
        ro.observe(footer);
    }

    // 3. 首屏初始化渲染
    try {
        const Cake = window.Cake;
        if (Cake && Cake.store && typeof Cake.loadStateFromStorage === 'function') {
            const freshState = Cake.loadStateFromStorage();
            if (freshState) Cake.store.state = freshState;
        }

        const initializer =
            (window.Cake && window.Cake.initPage) ||
            (window.Game && window.Game.initPage);

        if (typeof initializer === 'function') {
            initializer('home', () => {}, false);
        } else {
            // HostError 可能因根监视器接管而未定义，兜底走 sendLog / console
            const msg = '首屏渲染失败: 未找到 initPage 方法';
            if (window.HostError) window.HostError.showError(msg);
            else if (window.sendLog) window.sendLog('❌ ' + msg, 'error');
            else console.error(msg);
        }
    } catch (err) {
        const msg = `首屏渲染失败: ${err.message}`;
        if (window.HostError) window.HostError.showError(msg);
        else if (window.sendLog) window.sendLog('❌ ' + msg, 'error');
        else console.error(msg);
    }
})();
