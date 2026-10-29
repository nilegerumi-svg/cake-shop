// js/host/router.js
(function () {
    'use strict';
    const Cake = window.Cake;

    Cake.router = {
        currentPath: '',
        routes: {},

        // 注册页面
        register: function (path, renderCallback) {
            this.routes[path] = renderCallback;
        },

        // 跳转页面 (比如 Cake.router.navigate('shop'))
        navigate: function (path) {
            if (!this.routes[path]) {
                console.warn(`⚠️ 路由未找到: ${path}`);
                return;
            }
            this.currentPath = path;
            window.location.hash = `#${path}`; // 更新URL
            console.log(`🚦 [Host/Router] 切换页面至: ${path}`);
            this.routes[path](); // 执行页面的渲染逻辑
        },

        // 监听 URL 变化
        init: function () {
            window.addEventListener('hashchange', () => {
                const path = window.location.hash.replace('#', '') || 'home';
                if (this.routes[path] && path !== this.currentPath) {
                    this.navigate(path);
                }
            });
            // 初始加载
            const initialPath = window.location.hash.replace('#', '') || 'home';
            this.navigate(initialPath);
        }
    };
})();
