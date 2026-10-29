// js/actions/craft/index.js
(async () => {
    'use strict';

    const CRAFT_MODULES = [
        '../../shared.js',
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
            console.warn(`⚠️ [Craft] 子模块加载失败，已兜底跳过 -> ${path}`, err);
        }
    }

    console.log('⚙️ [Actions/Craft] 制作与交易动作处理完毕');
})();
