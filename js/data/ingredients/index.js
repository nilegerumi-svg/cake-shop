// js/data/ingredients/index.js
// 顶层 await：保证合并 INGREDIENTS 时各分类子模块已就位
console.log('🛒 [Ingredients] 开始逐个加载食材子模块...');

const ING_MODULES = [
    './grain/index.js',
    './meat/index.js',
    './seasoning/index.js',
    './vegetable/index.js',
    './egg/index.js',
    './fruit/index.js',
    './dairy/index.js',
    './additives/index.js',
    './materials.js',
    './important_shelf_life.js'
];

// 食材分类模块各自独立挂载数据，可安全并行加载提速
window.setLoadTotal?.(ING_MODULES.length, 'ingredients');

await Promise.all(ING_MODULES.map(async (path) => {
    try {
        await import(path);
        window.loadTick?.(path);
        console.log(`✅ [Ingredients] 成功加载: ${path}`);
    } catch (err) {
        // 👈 修改：只警告，不 throw 抛出死机！
        console.warn(`⚠️ [Ingredients] 子模块加载失败，已跳过 -> ${path}`);
        console.warn(`原因: ${err.message || err}`);
    }
}));

window.Cake = window.Cake || {};

/* ==================== 保质期分类打标 ====================
 * 食材的 tags 存的是风味/口感语义词（aromatic、sour、umami…），
 * 与保质期规则的 key（meat/vegetable/grain/seasoning）完全对不上，
 * 会导致所有食材都落到 default(7天)。
 * 这里在合并时按「来源目录」打上 shelfCategory，作为保质期的可靠依据；
 * 食材自带 shelfCategory 时以其为准，不做覆盖。
 */
const tagShelfCategory = (dict, category) => {
    if (!dict || typeof dict !== 'object') return dict || {};
    for (const item of Object.values(dict)) {
        if (!item || typeof item !== 'object') continue;
        if (item.shelfCategory) continue;
        if (Object.isFrozen(item)) continue;   // 冻结数据跳过，避免严格模式下抛错
        try { item.shelfCategory = category; } catch (_) { /* 忽略 */ }
    }
    return dict;
};

// 合并各个子模块的数据（全部都加上 || {} 兜底）
window.Cake.INGREDIENTS = Object.assign(
    {},
    tagShelfCategory(window.Cake.INGREDIENTS_MEAT, 'meat'),
    tagShelfCategory(window.Cake.INGREDIENTS_GRAIN, 'grain'),
    tagShelfCategory(window.Cake.INGREDIENTS_SEASONING, 'seasoning'),
    tagShelfCategory(window.Cake.INGREDIENTS_VEGETABLE, 'vegetable'),
    tagShelfCategory(window.Cake.INGREDIENTS_EGG_ALL, 'egg'),
    tagShelfCategory(window.Cake.INGREDIENTS_FRUIT_ALL, 'fruit'),
    tagShelfCategory(window.Cake.INGREDIENTS_DAIRY_ALL, 'dairy'),
    tagShelfCategory(window.Cake.INGREDIENTS_ADDITIVES, 'additive'),
    // 建材类（木材/生铁/精密零件）此前从未被合并，导致河边商店买不到
    tagShelfCategory(window.Cake.INGREDIENTS_MATERIALS, 'material')
);

console.log('🛒 [Ingredients] 所有食材总库合并完毕，当前种类:', Object.keys(window.Cake.INGREDIENTS).length);
