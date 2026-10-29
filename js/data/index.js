// js/data/index.js
(async () => {
    'use strict';
    
    const DATA_MODULES = [
        './attributes/index.js',          // 属性字典
        './ingredients/index.js',         // 食材（肉、菜、面粉等）
        './recipes/index.js',             // 菜谱（烘焙、料理）
        './tool/index.js',                // 工具（烤箱、炒锅）
        './characters/index.js',          // 角色（恋爱系统） 👈 注意这里加了逗号！
        './seasons/index.js',             // 季节白名单系统
        './achievements/index.js',        // 成就系统
        './bundles/index.js',             // 材料包系统
        './usually_shop_events/index.js', // 随机事件与散步事件
        './shop/index.js'                 // 商店配置与货架
    ];

    for (const path of DATA_MODULES) {
        try {
            await import(path);
        } catch (err) {
            console.error(`❌ [Data] 加载失败: ${path}`, err);
            throw new Error(`Data 目录下的文件报错或找不到: ${path}`);
        }
    }

    console.log('📦 [Data] 所有核心数据层装载完毕');
})();
