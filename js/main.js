// js/main.js
alert('🚀 开始运行 main.js');

async function loadGame() {
    try {
        alert('1. 准备加载基础数据层 (data)...');
        await import('./data/index.js');

        alert('2. 准备加载核心引擎层 (core)...');
        await import('./core/index.js');

        alert('3. 准备加载时间系统 (time)...');
        await import('./time/index.js');

        alert('4. 准备加载动作与玩法层 (actions)...');
        await import('./actions/index.js');

        alert('5. 准备加载兼容层 (shared)...');
        await import('./shared.js');

        alert('6. 准备加载宿主环境 (host)...');
        await import('./host/index.js'); // 🌟 精简为这一行

        alert('7. 准备加载全局监视器 (monitor)...');
        await import('./monitor.js');

        alert('✅ 全系统启动完毕！');
    } catch (err) {
        alert('❌ 致命错误，加载崩溃：\n' + err.message + '\n\n请去检查报错的那一步对应的文件夹！');
        console.error('模块加载失败:', err);
    }
}

loadGame();
