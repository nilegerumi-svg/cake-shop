// js/data/recipes/bakery/medium/index.js
(async () => {
    'use strict';
    try {
        await import('./cakes.js');
    } catch (err) {
        console.warn('⚠️ [Bakery/Medium] cakes.js 缺失，已兜底');
    }

    window.Cake = window.Cake || {};
    window.Cake.RECIPES_MEDIUM = Object.assign({}, window.Cake.RECIPES_MEDIUM_CAKES || {});
    console.log('📖 [Bakery/Medium] 中尺寸配方合并完毕，当前配方数:', Object.keys(window.Cake.RECIPES_MEDIUM).length);
})();
