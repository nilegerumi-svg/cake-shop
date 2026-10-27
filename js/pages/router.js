// js/pages/router.js
(() => {
    'use strict';
    
    // 获取当前页面的完整路径，例如 /cake-shop/index.html
    const path = window.location.pathname;

    // 如果是主页
    if (path.includes('home.html')) {
        import('./home/index.js')
            .then(() => console.log('✅ home 逻辑加载成功'))
            .catch(err => console.error('❌ 加载 home 失败:', err));
    } 
    // 如果是开始页（包括直接访问根目录或 index.html）
    else {
        import('./start/index.js')
            .then(() => console.log('✅ start 逻辑加载成功'))
            .catch(err => console.error('❌ 加载 start 失败:', err));
    }
})();
