// js/data/recipes/bakery/small/index.js
(async () => {
    'use strict';
    console.log('📖 [Bakery/Small] 开始加载小尺寸配方...');

    const SMALL_MODULES = [
        './cakes.js'
        // './breads.js' // 以后有了再加
    ];

    for (const path of SMALL_MODULES) {
        try {
            await import(path);
        } catch (err) {
            // 👈 终极报错放大镜
            console.warn(`⚠️ [Bakery/Small] 子文件加载失败，已跳过 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    window.Cake = window.Cake || {};
    
    // 👈 加上 || {} 兜底，就算 cakes.js 挂了，也不会报 undefined
    window.Cake.RECIPES_SMALL = Object.assign(
        {},
        window.Cake.RECIPES_SMALL_CAKES || {}
        // , window.Cake.RECIPES_SMALL_BREADS || {}
    );
    
    console.log('📖 [Bakery/Small] 小尺寸配方合并完毕，当前配方数:', Object.keys(window.Cake.RECIPES_SMALL).length);
})();
