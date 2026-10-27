// js/pages/router.js
(() => {
    'use strict';
    
    const path = window.location.pathname;

    const routes = {
        'home': './home/index.js',
        'index': './start/index.js'  // 🌟 新增：匹配 index.html
    };

    let matched = false;

    for (const key in routes) {
        // 针对根目录的 index.html，做特殊处理
        if ((key === 'index' && (path.endsWith('index.html') || path.endsWith('/'))) || 
            (key !== 'index' && path.includes(`${key}.html`))) {
            import(routes[key]);
            matched = true;
            break;
        }
    }

    if (!matched && (path.endsWith('pages/') || path.endsWith('pages/index.html'))) {
        import('./home/index.js');
        matched = true;
    }
})();
