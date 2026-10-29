// 顶层 await：保证父模块 await import() 时本文件已真正加载完毕
const SMALL_MODULES = ['./cake.js', './bread.js', './dessert.js'];

for (const path of SMALL_MODULES) {
    try {
        await import(path);
    } catch (err) {
        console.warn(`⚠️ [Bakery/Small] ${path} 缺失，已兜底`);
    }
}

window.Cake = window.Cake || {};
window.Cake.RECIPES_SMALL = Object.assign(
    {},
    window.Cake.RECIPES_SMALL_CAKES || {},
    window.Cake.RECIPES_SMALL_BREAD || {},
    window.Cake.RECIPES_SMALL_DESSERT || {}
);
console.log('📖 [Bakery/Small] 小尺寸配方合并完毕，当前配方数:', Object.keys(window.Cake.RECIPES_SMALL).length);
