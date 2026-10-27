// js/main.js
(async () => {
    'use strict';
    
    // 1. 在页面最上层建一个监控台
    const debugBox = document.createElement('div');
    debugBox.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:#fff; color:#333; z-index:999999; padding:20px; font-family:sans-serif; overflow-y:auto;';
    debugBox.innerHTML = '<h2 style="color: #ff6b81;">🍰 游戏引擎加载中...</h2><div id="log"></div>';
    document.body.appendChild(debugBox);
    
    const log = (msg, isError = false) => {
        const el = document.getElementById('log');
        if (el) el.innerHTML += `<div style="color:${isError ? 'red' : 'green'}; margin-bottom: 8px;">> ${msg}</div>`;
    };

    // 超时看门狗：如果 10 秒内没跑完，直接报错
    let isFinished = false;
    const watchdog = setTimeout(() => {
        if (!isFinished) {
            log('❌ 超时！10秒未加载完毕。大概率是某个文件造成了死循环或报错！', true);
        }
    }, 10000);

    try {
        log('1. 加载基础数据...');
        await import('./data/index.js');

        log('2. 加载核心引擎...');
        await import('./core/index.js');

        log('3. 加载时间系统...');
        await import('./time/index.js');

        log('4. 加载娱乐与动作 (最容易出错的地方)...');
        await import('./actions/index.js');

        log('5. 加载兼容层...');
        await import('./shared.js');

        log('6. 加载宿主环境...');
        await import('./host/index.js');

        log('7. 加载监视器...');
        await import('./monitor.js');

        isFinished = true;
        clearTimeout(watchdog);
        
        log('✅ 引擎加载成功！准备进入主页...');
        debugBox.style.display = 'none'; // 加载成功，隐藏监控台

    } catch (err) {
        isFinished = true;
        clearTimeout(watchdog);
        // 🚨 捕获到具体哪个文件报错了
        log(`❌ 模块加载崩溃：${err.message}`, true);
        console.error(err);
    }
})();
