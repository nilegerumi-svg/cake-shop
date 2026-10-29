// js/data/recipes/bakery/small/index.js
(async () => {
    'use strict';
    try {
        await import('./cakes.js');
    } catch (err) {
        console.warn('⚠️ [Bakery/Small] cakes.js 缺失，已兜底');
    }

    window.Cake = window.Cake || {};
    window.Cake.RECIPES_SMALL = Object.assign({}, window.Cake.RECIPES_SMALL_CAKES || {});
    console.log('📖 [Bakery/Small] 小尺寸配方合并完毕，当前配方数:', Object.keys(window.Cake.RECIPES_SMALL).length);
})();
