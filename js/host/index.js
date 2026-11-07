// js/host/index.js
// 顶层 await：保证宿主环境装载完毕后引擎才宣布就绪
console.log('🏠 [Host] 开始加载宿主环境子模块...');

const HOST_MODULES = [
    './error.js',
    './sync.js',
    './router.js'
    // 👈 彻底删掉 './monitor/index.js'，它已经在 game.html 顶层加载了，绝对不能在这里再引！
];

for (const path of HOST_MODULES) {
    try {
        await import(path);
    } catch (err) {
        console.warn(`⚠️ [Host] 模块加载失败，已跳过 -> ${path}`);
    }
}

console.log('🏠 [Host] 宿主环境所有子模块装载完毕');
