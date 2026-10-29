// js/data/recipes/bakery/medium/index.js
(async () => {
    'use strict';
    console.log('📖 [Bakery/Medium] 开始加载中尺寸配方...');

    const MEDIUM_MODULES = [
        './cakes.js'
    ];

    for (const path of MEDIUM_MODULES) {
        try {
            await import(path);
        } catch (err) {
            // 👈 终极报错放大镜
            console.warn(`⚠️ [Bakery/Medium] 子文件加载失败，已跳过 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    window.Cake = window.Cake || {};
    
    // 👈 加上 || {} 兜底，防止 undefined 报错
    window.Cake.RECIPES_MEDIUM = Object.assign({}, window.Cake.RECIPES_MEDIUM_CAKES || {});
    
    console.log('📖 [Bakery/Medium] 中尺寸配方合并完毕，当前配方数:', Object.keys(window.Cake.RECIPES_MEDIUM).length);
})();
