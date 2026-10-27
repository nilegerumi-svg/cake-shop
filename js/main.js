// js/main.js
(async () => {
    'use strict';
    
    // 打印错误到屏幕
    const printError = (msg) => {
        if (window.updateLoadingUI) window.updateLoadingUI(msg, true);
        else console.error(msg);
    };

    // 超时看门狗（15秒）
    let isFinished = false;
    const watchdog = setTimeout(() => {
        if (!isFinished) printError('❌ 加载超时！请检查网络或某个模块是否死循环。');
    }, 15000);

    try {
        if (window.updateLoadingUI) window.updateLoadingUI('📦 正在加载配方与角色数据 (data)...');
        await import('./data/index.js');

        if (window.updateLoadingUI) window.updateLoadingUI('🧱 正在加载底层渲染引擎 (core)...');
        await import('./core/index.js');

        if (window.updateLoadingUI) window.updateLoadingUI('🕒 正在加载时间系统 (time)...');
        await import('./time/index.js');

        if (window.updateLoadingUI) window.updateLoadingUI('🎮 正在加载地图与娱乐动作 (actions)...');
        await import('./actions/index.js');

        if (window.updateLoadingUI) window.updateLoadingUI('🧩 正在加载跨页面兼容层 (shared)...');
        await import('./shared.js');

        if (window.updateLoadingUI) window.updateLoadingUI('🖥️ 正在装配宿主控制台 (host)...');
        await import('./host/index.js');

        if (window.updateLoadingUI) window.updateLoadingUI('👁️ 正在启动全局监视器 (monitor)...');
        await import('./monitor.js');

        isFinished = true;
        clearTimeout(watchdog);
        
        if (window.updateLoadingUI) window.updateLoadingUI('🎉 引擎全部准备完毕！');
        
    } catch (err) {
        isFinished = true;
        clearTimeout(watchdog);
        // 🚨 直接打印是哪个文件崩了
        printError(`❌ 模块加载失败：${err.message}`);
        console.error(err);
    }
})();
