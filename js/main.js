// js/main.js
(async () => {
    'use strict';

    // 当前正在加载的文件名（用于超时或报错时精准定位）
    let currentLoadingFile = '准备启动...';

    const log = (msg, isError = false) => {
        if (window.updateLoadingUI) window.updateLoadingUI(msg, isError);
        console.log(`[Engine] ${msg}`);
    };

    // 🚨 超时看门狗：15 秒没加载完，直接指出卡在哪个文件！
    let isFinished = false;
    const watchdog = setTimeout(() => {
        if (!isFinished) {
            log(`❌ 加载超时！卡在文件: ${currentLoadingFile}`, true);
        }
    }, 15000);

    // 核心：带追踪的加载函数
    const loadModule = async (path) => {
        currentLoadingFile = path;
        log(`⏳ 正在加载: ${path}...`);
        try {
            await import(path);
        } catch (err) {
            // 如果发生语法错误或 404，立即中断并报出具体文件
            throw new Error(`加载失败 [${path}]: ${err.message}`);
        }
    };

    try {
        await loadModule('./data/index.js');
        await loadModule('./core/index.js');
        await loadModule('./time/index.js');
        await loadModule('./actions/index.js');
        await loadModule('./shared.js');
        await loadModule('./host/index.js');
        await loadModule('./monitor.js');

        isFinished = true;
        clearTimeout(watchdog);
        
        log('🎉 引擎全部准备完毕！');
        
    } catch (err) {
        isFinished = true;
        clearTimeout(watchdog);
        // 🚨 直接把具体的死穴文件显示在屏幕上
        log(`❌ 致命错误：${err.message}`, true);
        console.error(err);
    }
})();
