// js/pages/router.js
(() => {
    'use strict';

    const path = window.location.pathname || '';
    
    // 👈 核心修复：只要路径包含 pages/home 或者 home.html，就认定为主页
    const isHome = path.includes('pages/home') || path.includes('home.html');

    // 统一收尾：开始页需要关闭 loading 屏，iframe 页不需要（父页面 monitor 管）
    const complete = () => {
        if (!isHome && typeof window.appLoadingComplete === 'function') {
            window.appLoadingComplete();
        }
    };
    const fail = (msg) => {
        if (!isHome && typeof window.appLoadingFail === 'function') {
            window.appLoadingFail(msg);
        }
        console.error('❌ [Router]', msg);
    };

    if (isHome) {
        import('./home/index.js')
            .then(() => console.log('✅ home 逻辑加载成功'))
            .catch(err => fail('加载 home 失败: ' + (err && err.message || err)));
    } else {
        import('./start/index.js')
            .then(() => console.log('✅ start 逻辑加载成功'))
            .catch(err => fail('加载 start 失败: ' + (err && err.message || err)));
    }

    // 兜底：模块加载完成但模块内部忘了调用 appLoadingComplete 时，
    // 延迟 1.5s 由 router 收尾（仅开始页）。
    if (!isHome) {
        setTimeout(() => {
            if (typeof window.appLoadingComplete === 'function') {
                window.appLoadingComplete();
            }
        }, 1500);
    }
})();
