(async () => {
    'use strict';
    try {
        await import('./cake.js'); // 修正：原来写的是 cakes.js，实际文件是 cake.js
    } catch (err) {
        console.warn('⚠️ [Bakery/Small] cake.js 缺失，已兜底');
    }

    window.Cake = window.Cake || {};
    window.Cake.RECIPES_SMALL = Object.assign({}, window.Cake.RECIPES_SMALL_CAKES || {});
    console.log('📖 [Bakery/Small] 小尺寸配方合并完毕，当前配方数:', Object.keys(window.Cake.RECIPES_SMALL).length);
})();
