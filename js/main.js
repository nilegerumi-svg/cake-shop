// js/main.js
(async () => {
    'use strict';

    // 包含路径和描述的模块列表
    const modules = [
        { path: './data/index.js', name: '📦 正在加载配方与角色数据' },
        { path: './core/index.js', name: '🧱 正在加载底层渲染引擎' },
        { path: './time/index.js', name: '🕒 正在加载时间系统' },
        { path: './actions/index.js', name: '🎮 正在加载地图与娱乐动作' },
        { path: './shared.js', name: '🧩 正在加载跨页面兼容层' },
        { path: './host/index.js', name: '🖥️ 正在装配宿主控制台' },
        { path: './monitor.js', name: '👁️ 正在启动全局监视器' }
    ];

    try {
        for (let i = 0; i < modules.length; i++) {
            const mod = modules[i];
            // 计算当前进度百分比 (例如 1/7 = 14%)
            const percent = Math.round((i / modules.length) * 100);
            
            // 更新 UI：显示“正在加载 xxx”，并让进度条前进
            if (window.updateLoadingProgress) {
                window.updateLoadingProgress(`${mod.name} (${mod.path})...`, percent);
            }

            // 等待文件真正加载完成
            await import(mod.path);
        }

        // 所有模块跑完，进度条 100%
        if (window.updateLoadingProgress) {
            window.updateLoadingProgress('🎉 引擎全部准备完毕！', 100);
        }
        
    } catch (err) {
        // 如果代码写错或者路径找不到，直接红字显示在屏幕上！
        if (window.updateLoadingProgress) {
            window.updateLoadingProgress(`❌ 致命错误：${err.message}`, 100);
            document.getElementById('loading-bar').style.background = 'red';
        }
        console.error(err);
    }
})();
