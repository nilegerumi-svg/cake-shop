// js/main.js
(async () => {
    'use strict';

    const modules = [
        { path: './data/index.js', name: '📦 正在加载配方与角色数据' },
        { path: './core/index.js', name: '🧱 正在加载底层渲染引擎' },
        { path: './time/index.js', name: '🕒 正在加载时间系统' },
        { path: './actions/index.js', name: '🎮 正在加载地图与娱乐动作' },
        { path: './shared.js', name: '🧩 正在加载跨页面兼容层' },
        { path: './host/index.js', name: '🖥️ 正在装配宿主控制台' },
    ];

    try {
        for (let i = 0; i < modules.length; i++) {
            const mod = modules[i];
            const percent = Math.round((i / modules.length) * 100);
            
            if (window.updateLoadingProgress) {
                window.updateLoadingProgress(`${mod.name} (${mod.path})...`, percent);
            }

            await import(mod.path);
        }

        if (window.updateLoadingProgress) {
            window.updateLoadingProgress('🎉 引擎全部准备完毕！', 100);
        }
        // 新增：告诉启动器“所有动态 import 已完成”
        window.dispatchEvent(new CustomEvent('game-ready'));
        
    } catch (err) {
        if (window.updateLoadingProgress) {
            window.updateLoadingProgress(`❌ 致命错误：${err.message}`, 100);
            document.getElementById('loading-bar').style.background = 'red';
        }
        console.error(err);
    }
})();
