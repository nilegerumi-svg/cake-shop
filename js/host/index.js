// js/host/index.js
(async () => {
    'use strict';
    console.log('🏠 [Host] 开始精准排查宿主环境子模块...');

    const HOST_MODULES = [
        './error.js',
        './sync.js',
        './router.js',
        './monitor/index.js'
    ];

    for (const path of HOST_MODULES) {
        try {
            await import(path);
            console.log(`✅ [Host] 成功加载: ${path}`);
        } catch (err) {
            // 👈 终极法医鉴定：如果是 404 还是语法错误，全部扒光！
            console.error(`❌ [Host] 真凶找到了！加载失败 -> ${path}`);
            console.error(`错误原因: ${err.message}`);
            
            // 抛出带有具体文件名和具体错误信息的异常，直接通知引擎！
            throw new Error(`Host 子模块加载失败: ${path} - ${err.message}`);
        }
    }

    console.log('🏠 [Host] 宿主环境所有子模块装载完毕');
})();
