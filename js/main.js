// js/main.js
(async () => {
    'use strict';

    const modules = [
        { path: './data/index.js', name: '🚦 正在加载配方与色彩数据' },
        { path: './core/index.js', name: '🟱 正在加载底层渲染引擎' },
        { path: './time/index.js', name: '🕒 正在加载时间系统' },
        { path: './actions/index.js', name: '🎮 正在加载地图与音乐动作' },
        { path: './shared.js', name: '🟩 正在加载跨页面共享层' },
        { path: './host/index.js', name: '🏥 正在加载访客主体控制台' }
        // ⚠️ 不要 import './monitor.js'，那是启动器，会循环导入
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
            window.updateLoadingProgress('🎉 引燃全部引线完成！', 100);
        }

        // ✅ 关键：所有动态 import 已完成，通知启动器唤醒主页
        window.dispatchEvent(new CustomEvent('game-ready'));

    } catch (err) {
        if (window.updateLoadingProgress) {
            window.updateLoadingProgress(`⚠️ 致命错误：${err.message}`, 100);
            const bar = document.getElementById('loading-bar');
            if (bar) bar.style.background = 'red';
        }
        console.error(err);
    }
})();
