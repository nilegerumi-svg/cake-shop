// js/core/index.js
(async () => {
    'use strict';
    console.log('🧱 [Core] 开始逐个加载核心模块...');

    const CORE_MODULES = [
        './schema.js',
        './migrate.js',
        './time_engine.js',
        './utils.js',
        './store.js',
        './bridge.js',
        './modal.js',
        './effects.js',
        './render/index.js'
    ];

    for (const path of CORE_MODULES) {
        try {
            await import(path);
        } catch (err) {
            // 👈 终极报错放大镜：谁坏了直接拉出来斩了
            const errMsg = `❌ [Core] 致命错误！核心模块加载失败 -> ${path}\n原因: ${err.message}`;
            console.error(errMsg);
            throw new Error(errMsg);
        }
    }

    console.log('🧱 [Core] 核心引擎与所有子模块装载完毕');
})();
