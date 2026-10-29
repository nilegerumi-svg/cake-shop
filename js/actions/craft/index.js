// js/actions/craft/index.js
(async () => {
    'use strict';
    console.log('⚙️ [Actions/Craft] 开始逐个加载制作模块...');

    const CRAFT_MODULES = [
        './_shared.js',
        './quality.js',
        './buy.js',
        './research.js',
        './dispose.js',
        './craft.js'
    ];

    for (const path of CRAFT_MODULES) {
        try {
            await import(path);
        } catch (err) {
            // 👈 终极报错放大镜：谁不在，或者谁写错了，直接揪出来！
            console.warn(`⚠️ [Craft] 子模块加载失败，已跳过 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    console.log('⚙️ [Actions/Craft] 制作与交易动作处理完毕');
})();
