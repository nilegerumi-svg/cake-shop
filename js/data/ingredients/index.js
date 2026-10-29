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
            console.log(`✅ [Ingredients] 成功加载: ${path}`);
        } catch (err) {
            // 👈 修改：只警告，不 throw 抛出死机！
            console.warn(`⚠️ [Ingredients] 子模块加载失败，已跳过 -> ${path}`);
            console.warn(`原因: ${err.message || err}`);
        }
    }

    window.Cake = window.Cake || {};
    
    // 合并各个子模块的数据（全部都加上 || {} 兜底）
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
