// js/actions/craft/index.js
(async () => {
    'use strict';

    const CRAFT_MODULES = [
        './shared.js',
        './quality.js',
        './buy.js',
        './research.js',
        './dispose.js',
        './craft.js'
    ];

    // 逐个加载制作子模块（防崩溃：单个失败只跳过并提示）
    for (const path of CRAFT_MODULES) {
        try {
            await import(path);
            console.log(`✅ [Actions/Craft] 加载成功: ${path}`);
        } catch (err) {
            console.warn(`⚠️ [Actions/Craft] 子模块加载失败，已跳过 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    console.log('⚙️ [Actions/Craft] 制作与交易动作处理完毕');
})();
