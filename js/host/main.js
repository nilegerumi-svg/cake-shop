// js/host/main.js
(() => {
    'use strict';
    
    const mainFrame = document.getElementById('mainFrame');
    const logFrame  = document.getElementById('logFrame');
    const footer    = document.getElementById('footer');

    // 1. 绑定错误捕获
    if (window.HostError) {
        if (mainFrame) window.HostError.bindErrorCatcher(mainFrame, '主页');
        if (logFrame) window.HostError.bindErrorCatcher(logFrame, '日志');
    }

    // 🌟 2. 路由拦截已经全权交给了 router.js 内部的霸王条款，main.js 不需要再管了！
    // （删除了原先调用 bindLinkInterceptor 会导致报错的代码）

    // 3. footer 高度动态调整
    if (footer && window.ResizeObserver) {
        const ro = new ResizeObserver(() => {
            document.documentElement.style.setProperty('--footer-h', `${footer.offsetHeight}px`);
        });
        ro.observe(footer);
    }

    // 4. 首屏初始化渲染
    try {
        const Cake = window.Cake;
        if (Cake && Cake.store && typeof Cake.loadStateFromStorage === 'function') {
            const freshState = Cake.loadStateFromStorage();
            if (freshState) Cake.store.state = freshState;
        }

        const initializer = (window.Cake && window.Cake.initPage) || (window.Game && window.Game.initPage);
        if (typeof initializer === 'function') {
            // 让外层框架先渲染出来（导航栏、顶栏等）
            initializer('home', () => {}, false);
        } else if (window.HostError) {
            window.HostError.showError('首屏渲染失败: 未找到 initPage 方法');
        }
    } catch (err) {
        if (window.HostError) window.HostError.showError(`首屏渲染失败: ${err.message}`);
    }
})();
