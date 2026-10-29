// js/data/recipes/index.js
// 顶层 await：保证合并 RECIPES 时子模块已真正加载完毕
console.log('📖 [Recipes] 开始逐个加载菜谱子模块...');

const RECIPE_MODULES = [
    './bakery/index.js',
    './China_reciped/index.js'
];

for (const path of RECIPE_MODULES) {
    try {
        await import(path);
        console.log(`✅ [Recipes] 加载成功: ${path}`);
    } catch (err) {
        // 👈 终极报错放大镜：谁报错就打印谁
        console.warn(`⚠️ [Recipes] 子模块加载失败，已跳过 -> ${path}`);
        console.warn(`原因: ${err.message}`);
    }
}

window.Cake = window.Cake || {};

// 👈 加上 || {} 兜底，确保就算子模块没加载出来，也不会报 undefined
window.Cake.RECIPES = Object.assign(
    {},
    window.Cake.RECIPES_BAKERY || {},
    window.Cake.RECIPES_CHINA || {}
);

console.log('📖 [Recipes] 菜谱总库合并完毕，当前配方数:', Object.keys(window.Cake.RECIPES).length);
