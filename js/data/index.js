// js/data/index.js
// 顶层 await：保证调用方 await import() 时，全部数据字典已装载完毕
console.log('🟢 [Data] 开始加载 Data 模块...');

const DATA_MODULES = [
    './attributes/index.js',
    './ingredients/index.js',
    './recipes/index.js',
    './tool/index.js',
    './characters/index.js',
    './world/index.js',
    './gardening/index.js',
    './festivals/index.js',
    './topics/index.js',
    './extracted/index.js',
    './furniture/index.js',
    './sewing/index.js',
    './books/index.js',
    './stars.js',
    './solar_terms.js',
    './newspapers/index.js',
    './health.js',
    './seasons/index.js',
    './achievements/index.js',
    './bundles/index.js',
    './usually_shop_events/index.js',
    './shop/index.js',
    './descriptions.js',
    './ingredients/detailed_descs.js',
    './ingredients/merged_for_game.js',
    './subsidy.js',
    './systems.js',
    './systems2.js'
];

// 数据子模块互相独立（各自向 window.Cake 挂载数据），可并行加载提速；
// 文件级进度上报让加载界面的"剩余文件数"持续变动。
window.setLoadTotal?.(DATA_MODULES.length);

await Promise.all(DATA_MODULES.map(async (path) => {
    try {
        console.log(`⏳ [Data] 准备加载: ${path}`);
        await import(path);
        window.loadTick?.(path);
        console.log(`✅ [Data] 加载成功: ${path}`);
    } catch (err) {
        // 如果这里报错，说明是这个具体的文件404或者有语法错误
        console.error(`❌ [Data] 致命错误！加载 ${path} 失败:`);
        console.error(err);
        // 抛出带有文件名的错误
        throw new Error(`Data 目录下的文件报错或找不到: ${path} (${err.message || '未知错误'})`);
    }
}));

console.log('📦 [Data] 所有核心数据层装载完毕');

// 用离线包提取的描述回填到食谱/食材（旧 schema 没有 desc 字段）
(() => {
    const C = window.Cake || {};
    const D = C.DESCRIPTIONS || {};
    if (!Object.keys(D).length) return;
    const fill = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        for (const v of Object.values(obj)) {
            if (!v || typeof v !== 'object') continue;
            if (!v.desc && typeof v.name === 'string' && D[v.name]) v.desc = D[v.name];
        }
    };
    let filled = 0;
    for (const key of Object.keys(C)) {
        if (!/^(INGREDIENTS|RECIPES_|RECIPES$)/.test(key)) continue;
        const obj = C[key];
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) continue;
        for (const v of Object.values(obj)) {
            if (v && typeof v === 'object' && !v.desc && typeof v.name === 'string' && D[v.name]) { v.desc = D[v.name]; filled++; }
        }
    }
    console.log('📝 [Data] 已用离线包描述回填', filled, '条');

    // 旧版精细食材按 id 补充描述
    const DD = C.INGREDIENT_DESCS_DETAILED || {};
    let filled2 = 0;
    for (const [id, desc] of Object.entries(DD)) {
        const ing = C.INGREDIENTS && C.INGREDIENTS[id];
        if (ing && !ing.desc) { ing.desc = desc; filled2++; }
    }
    if (filled2) console.log('📝 [Data] 精细食材补充描述', filled2, '条');
})();

