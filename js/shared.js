// js/main.js
(async () => {
    'use strict';
    
    // 创建一个全屏的调试框
    const debugBox = document.createElement('div');
    debugBox.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:#fff0f5; color:#d6336c; z-index:999999; padding:20px; overflow-y:auto; font-family:sans-serif;';
    debugBox.innerHTML = '<h2>🍰 正在启动引擎...</h2><div id="debug-log"></div>';
    document.body.appendChild(debugBox);
    
    const log = (msg, isError = false) => {
        const el = document.getElementById('debug-log');
        if (el) {
            el.innerHTML += `<div style="color:${isError ? 'red' : 'green'}; margin-bottom: 10px;">${isError ? '❌' : '✅'} ${msg}</div>`;
        }
    };

    try {
        log('1. 加载数据层 data...');
        await import('./data/index.js');

        log('2. 加载核心引擎 core...');
        await import('./core/index.js');

        log('3. 加载时间系统 time...');
        await import('./time/index.js');

        log('4. 加载动作与玩法 actions...');
        await import('./actions/index.js');

        log('5. 加载兼容层 shared...');
        await import('./shared.js');

        log('6. 加载宿主环境 host...');
        await import('./host/index.js');

        log('7. 加载监视器 monitor...');
        await import('./monitor.js');

        log('🎉 所有模块加载成功！准备进入游戏...');
        
        // 成功后，销毁调试框，让游戏显露出来
        setTimeout(() => {
            debugBox.style.display = 'none';
        }, 1000);

    } catch (err) {
        // 如果任何一个文件加载失败，直接把报错写在屏幕上！
        log(`致命错误：${err.message}`, true);
        log(`请检查报错文件中是否写错了路径或代码。`, true);
        console.error(err);
    }
})();
