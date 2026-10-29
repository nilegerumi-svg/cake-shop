// js/actions/craft/index.js
(async () => {
    'use strict';
    const CRAFT_MODULES = [
        './_shared.js', // 如果它 404，下面的 try-catch 会兜住它
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
            // 静默跳过，只在需要排错时打警告
            console.warn(`⚠️ [Craft] 子模块加载失败，已兜底跳过 -> ${path}`);
        }
    }
    console.log('⚙️ [Actions/Craft] 制作与交易动作处理完毕');
})();
