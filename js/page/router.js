// js/pages/router.js
(() => {
    'use strict';
    
    // 获取当前页面的路径（例如 /pages/home.html）
    const path = window.location.pathname;

    // 🌟 页面路由注册表
    // 以后你新建了 shop.html，只需要在下面加一行 'shop': './shop/index.js'
    const routes = {
        'home': './home/index.js'
    };

    let matched = false;

    // 遍历路由表，看看当前路径匹配哪个页面
    for (const key in routes) {
        if (path.includes(`${key}.html`)) {
            import(routes[key]);
            matched = true;
            break;
        }
    }

    // 如果直接访问了 pages/ 目录（没带 html 后缀），默认加载主页
    if (!matched && (path.endsWith('pages/') || path.endsWith('pages/index.html'))) {
        import('./home/index.js');
        matched = true;
    }

    if (matched) {
        console.log(`📄 页面路由已匹配，正在加载...`);
    } else {
        console.warn(`⚠️ 未匹配到当前页面的专属逻辑: ${path}`);
    }
})();
