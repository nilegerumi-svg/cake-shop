// js/pages/index.js

(() => {
    'use strict';
    
    // 获取当前页面的路径
    const path = window.location.pathname;

    // 🌟 页面自动分发逻辑
    if (path.includes('home.html') || path.endsWith('pages/')) {
        // 如果当前是主页，动态加载 home 的逻辑
        import('./home/index.js');
    }
    
    // 💡 未来扩展：如果你做了商店页 shop.html
    // else if (path.includes('shop.html')) {
    //     import('./shop/index.js');
    // }
    
    // 💡 未来扩展：缘分页 love.html
    // else if (path.includes('love.html')) {
    //     import('./love/index.js');
    // }

})();
