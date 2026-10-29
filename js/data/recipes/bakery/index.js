// js/data/recipes/bakery/index.js
(async () => {
    'use strict';
    console.log('🍰 [Bakery] 开始逐个加载烘焙配方子模块...');

    const BAKERY_MODULES = [
        './config.js',
        './small/index.js',
        './medium/index.js',
        './large/index.js'
    ];

    for (const path of BAKERY_MODULES) {
        try {
            await import(path);
            console.log(`✅ [Bakery] 成功加载: ${path}`);
        } catch (err) {
            // 👈 核心：只要报错，直接告诉你是哪个文件挂了！
            console.warn(`⚠️ [Bakery] 致命错误！加载失败 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    window.Cake = window.Cake || {};
    
    // 加上 || {} 兜底，防止因为某个文件缺失导致 undefined 报错
    window.Cake.RECIPES_BAKERY = Object.assign(
        {},
        window.Cake.RECIPES_SMALL || {},
        window.Cake.RECIPES_MEDIUM || {},
        window.Cake.RECIPES_LARGE || {}
    );
    
    console.log('🍰 [Recipes/Bakery] 烘焙配方合并完毕，当前配方数:', Object.keys(window.Cake.RECIPES_BAKERY).length);
})();
