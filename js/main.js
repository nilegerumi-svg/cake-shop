// js/main.js
(async () => {
    'use strict';

    // 🚨 拦截器：如果有任何 JS 文件找不到（404），立刻弹窗报警！
    window.addEventListener('error', function(e) {
        if (e.target && (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK')) {
            const badUrl = e.target.src || e.target.href;
            alert('❌ 文件加载失败 (找不到文件)！\n路径: ' + badUrl);
        }
    }, true); // true 表示在捕获阶段拦截

    const loadModule = async (path) => {
        try {
            await import(path);
            alert(`✅ 成功加载: ${path}`);
        } catch (err) {
            // 🚨 抓取具体的错误堆栈，看看到底是哪个子文件炸了
            alert(`❌ 加载失败！当前正在加载目录: ${path}\n\n错误详情:\n${err.message}\n\n请截图发给我！`);
            throw err; // 中断后续加载
        }
    };

    try {
        await loadModule('./data/index.js');
        await loadModule('./core/index.js');
        await loadModule('./time/index.js');
        
        // 如果在这个目录下的某个小文件出错，错误信息会被精确捕获并弹窗
        await loadModule('./actions/index.js'); 
        
        await loadModule('./shared.js');
        await loadModule('./host/index.js');
        await loadModule('./monitor.js');
        
        alert('🎉 引擎全部加载完毕！准备进入主页！');
    } catch (e) {
        console.error(e);
    }
})();
