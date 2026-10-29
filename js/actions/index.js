// js/actions/index.js
// 顶层 await：保证引擎就绪时所有动作（craft/shop/entertainment/social）已挂载
console.log('🎮 [Actions] 开始逐个加载行为子模块...');

const ACTION_MODULES = [
    './system.js',
    './craft/index.js',
    './entertainment/index.js',
    './shop/index.js',
    './social/index.js'
];

for (const path of ACTION_MODULES) {
    try {
        await import(path);
        console.log(`✅ [Actions] 加载成功: ${path}`);
    } catch (err) {
        // 👈 放大镜：谁报错就打印谁
        console.warn(`⚠️ [Actions] 子模块加载失败，已跳过 -> ${path}`);
        console.warn(`原因: ${err.message}`);
    }
}

console.log('⚙️ [Actions] 所有行为操作层处理完毕');
