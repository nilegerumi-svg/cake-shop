// js/pages/router.js
// 页面系统入口：仅负责开始页（游戏页由 game.html 独立加载）
(() => {
    'use strict';

    const complete = () => {
        if (typeof window.appLoadingComplete === 'function') window.appLoadingComplete();
    };
    const fail = (msg) => {
        if (typeof window.appLoadingFail === 'function') window.appLoadingFail(msg);
        console.error('❌ [Router]', msg);
    };

    import('./start/index.js')
        .then(() => console.log('✅ start 逻辑加载成功'))
        .catch(err => fail('加载 start 失败: ' + (err && err.message || err)));

    // 兜底：模块内部若忘记收尾，1.5s 后由 router 关闭 loading
    setTimeout(complete, 1500);
})();
