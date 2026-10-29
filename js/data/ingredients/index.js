// js/data/ingredients/index.js
(async () => {
    'use strict';
    console.log('🛒 [Ingredients] 开始逐个加载食材子模块...');

    const ING_MODULES = [
        './grain/index.js',
        './meat/index.js',
        './seasoning/index.js',
        './vegetable/index.js',
        './egg/index.js',
        './fruit/index.js',
        './dairy/index.js',
        './additives/index.js',
        './important_shelf_life.js'
    ];

    for (const path of ING_MODULES) {
        try {
            await import(path);
        } catch (err) {
            // 👈 终极报错：直接把罪魁祸首的名字喊出来！
            const errMsg = `❌ [Ingredients] 致命错误！子模块加载失败 -> ${path}\n原因: ${err.message}`;
            console.error(errMsg);
            throw new Error(errMsg);
        }
    }

    window.Cake = window.Cake || {};
    
    // 合并各个子模块的数据
    window.Cake.INGREDIENTS = Object.assign(
        {},
        window.Cake.INGREDIENTS_MEAT || {},
        window.Cake.INGREDIENTS_GRAIN || {},
        window.Cake.INGREDIENTS_SEASONING || {},
        window.Cake.INGREDIENTS_VEGETABLE || {},
        window.Cake.INGREDIENTS_EGG_ALL || {},
        window.Cake.INGREDIENTS_FRUIT_ALL || {},
        window.Cake.INGREDIENTS_DAIRY_ALL || {},
        window.Cake.INGREDIENTS_ADDITIVES || {}
    );

    console.log('🛒 [Ingredients] 所有食材总库合并完毕，当前种类:', Object.keys(window.Cake.INGREDIENTS).length);
})();
