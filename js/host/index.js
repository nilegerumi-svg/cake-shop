// js/host/index.js
(async () => {
    'use strict';
    console.log('🏠 [Host] 开始加载宿主环境子模块...');

    const HOST_MODULES = [
        './error.js',
        './sync.js',
        './router.js',
        './monitor/index.js'
    ];

    for (const path of HOST_MODULES) {
        try {
            await import(path);
        } catch (err) {
            // 谁报错就打印谁，但绝不会卡死整个引擎！
            console.warn(`⚠️ [Host] 模块加载失败，已跳过 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    console.log('🏠 [Host] 宿主环境装载完毕');
})();
