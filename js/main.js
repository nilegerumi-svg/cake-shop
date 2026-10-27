// js/main.js
alert('🚀 开始运行 main.js');

async function loadGame() {
    try {
        alert('1. 准备加载基础数据层...');
        await import('./data/ingredients.js');
        await import('./data/recipes.js');
        await import('./data/bundles.js');
        await import('./data/characters.js');
        await import('./data/events.js');
        await import('./data/shop-config.js');
        await import('./data/achievements.js');

        alert('2. 准备加载核心引擎层 (core)...');
        await import('./core/index.js');

        alert('3. 准备加载时间系统 (time)...');
        await import('./time/index.js');

        alert('4. 准备加载动作与玩法层 (actions)...');
        await import('./actions/index.js');

        alert('5. 准备加载兼容层 (shared)...');
        await import('./shared.js');

        alert('6. 准备加载宿主环境 (host)...');
        await import('./host/error.js');
        await import('./host/router.js');
        await import('./host/sync.js');
        await import('./host/main.js');

        alert('7. 准备加载全局监视器 (monitor)...');
        await import('./monitor.js');

        alert('✅ 全系统启动完毕！(此时应该能看到 Game 对象了)');
    } catch (err) {
        // 🚨 一旦加载失败，这里会弹窗告诉你到底死在哪一步
        alert('❌ 致命错误，加载崩溃：\n' + err.message + '\n\n请去检查报错的那一步对应的文件夹！');
        console.error('模块加载失败:', err);
    }
}

loadGame();
