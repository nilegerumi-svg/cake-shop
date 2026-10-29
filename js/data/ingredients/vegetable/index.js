(async () => {
    'use strict';
    console.log('🥬 [Vegetable] 开始逐个加载蔬菜子模块...');

    const VEG_MODULES = [
        './leafy.js',
        './roots.js',
        './gourd.js',
        './mushrooms.js',
        './monitor.js'
    ];

    for (const path of VEG_MODULES) {
        try {
            await import(path);
            console.log(`✅ [Vegetable] 成功加载: ${path}`);
        } catch (err) {
            console.warn(`⚠️ [Vegetable] 子模块加载失败，已跳过 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    window.Cake = window.Cake || {};

    window.Cake.INGREDIENTS_VEGETABLE = Object.assign(
        {},
        window.Cake.VEG_LEAFY || {},
        window.Cake.VEG_ROOTS || {},
        window.Cake.VEG_GOURDS || {},
        window.Cake.VEG_MUSHROOMS || {}
    );

    console.log('🥬 [Vegetable] 蔬菜类合并完毕，当前种类:', Object.keys(window.Cake.INGREDIENTS_VEGETABLE).length);
})();
