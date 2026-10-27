// js/host/main.js
(() => {
    const mainFrame = document.getElementById('mainFrame');
    const logFrame  = document.getElementById('logFrame');
    const footer    = document.getElementById('footer');
    const frames    = [mainFrame, logFrame].filter(Boolean);

    // 1. 绑定错误捕获
    if (window.HostError) {
        window.HostError.bindErrorCatcher(mainFrame, '主页');
        window.HostError.bindErrorCatcher(logFrame, '日志');
    }

    // 2. 绑定路由拦截 (监听 iframe load 事件以注入拦截器)
    if (window.HostRouter) {
        for (const f of frames) {
            f.addEventListener('load', () => {
                try { window.HostRouter.bindLinkInterceptor(f.contentDocument); } catch (_) {}
            });
        }
    }

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
            initializer('home', () => {}, false);
        } else if (window.HostError) {
            window.HostError.showError('首屏渲染失败: 未找到 initPage 方法');
        }
    } catch (err) {
        if (window.HostError) window.HostError.showError(`首屏渲染失败: ${err.message}`);
    }
})();
