// js/data/index.js
(async () => {
    'use strict';
    console.log('🟢 [Data] 开始加载 Data 模块...');
    
    const DATA_MODULES = [
        './attributes/index.js',
        './ingredients/index.js',
        './recipes/index.js',
        './tool/index.js',
        './characters/index.js',
        './seasons/index.js',
        './achievements/index.js',
        './bundles/index.js',
        './usually_shop_events/index.js',
        './shop/index.js'
    ];

    for (const path of DATA_MODULES) {
        try {
            console.log(`⏳ [Data] 准备加载: ${path}`);
            await import(path);
            console.log(`✅ [Data] 加载成功: ${path}`);
        } catch (err) {
            // 如果这里报错，说明是这个具体的文件404或者有语法错误
            console.error(`❌ [Data] 致命错误！加载 ${path} 失败:`);
            console.error(err);
            // 抛出带有文件名的错误
            throw new Error(`Data 目录下的文件报错或找不到: ${path} (${err.message || '未知错误'})`);
        }
    }

    console.log('📦 [Data] 所有核心数据层装载完毕');
})();
