// js/data/ingredients/vegetable/index.js
(async () => {
    'use strict';
    console.log('🥬 [Vegetable] 开始逐个加载蔬菜子模块...');

    const VEG_MODULES = [
        './leafy.js',
        './roots.js',
        './gourds.js',
        './mushrooms.js',
        './monitor.js'
    ];

    for (const path of VEG_MODULES) {
        try {
            await import(path);
            console.log(`✅ [Vegetable] 加载成功: ${path}`);
        } catch (err) {
            // 👈 终极报错放大镜：谁报错就打印谁
            console.warn(`⚠️ [Vegetable] 子模块加载失败，已跳过 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    window.Cake = window.Cake || {};
    
    // 加上 || {} 兜底，就算某个文件加载失败，也绝不会报 undefined 错误
    window.Cake.INGREDIENTS_VEGETABLE = Object.assign(
        {},
        window.Cake.VEG_LEAFY || {},
        window.Cake.VEG_ROOTS || {},
        window.Cake.VEG_GOURDS || {},
        window.Cake.VEG_MUSHROOMS || {}
    );

    console.log('🥬 [Vegetable] 蔬菜类合并完毕，当前种类:', Object.keys(window.Cake.INGREDIENTS_VEGETABLE).length);
})();
