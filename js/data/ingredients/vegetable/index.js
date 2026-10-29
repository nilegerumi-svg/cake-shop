// js/data/ingredients/vegetable/index.js
(async () => {
    'use strict';
    console.log('🥬 [Vegetable] 开始逐个加载蔬菜子模块...');

    const VEG_MODULES = [
        './leafy.js',
        './roots.js',
        './gourds.js', // 依然是优雅加载
        './mushrooms.js',
        './monitor.js'
    ];

    for (const path of VEG_MODULES) {
        try {
            await import(path);
            console.log(`✅ [Vegetable] 成功加载: ${path}`);
        } catch (err) {
            // 静默跳过缺失或报错的文件，不中断主流程
            console.warn(`⚠️ [Vegetable] 子模块加载失败，已跳过 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    window.Cake = window.Cake || {};
    
    // 优雅合并，哪怕 gourds 挂了，也不会报 undefined
    window.Cake.INGREDIENTS_VEGETABLE = Object.assign(
        {},
        window.Cake.VEG_LEAFY || {},
        window.Cake.VEG_ROOTS || {},
        window.Cake.VEG_GOURDS || {},
        window.Cake.VEG_MUSHROOMS || {}
    );

    console.log('🥬 [Vegetable] 蔬菜类合并完毕，当前种类:', Object.keys(window.Cake.INGREDIENTS_VEGETABLE).length);
})();
