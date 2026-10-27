// js/monitor/index.js

// 1. 引入子监视器
import './time.js';
import './page.js';

(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    console.log('👁️ 全局监控中心已启动，开始扫描各文件夹模块...');

    // 2. 监视各个文件夹（模块）的挂载状态
    const folderRegistry = {
        'actions/bakery': typeof Cake.bakeCake === 'function',
        'actions/shop': typeof Cake.openShop === 'function',
        'actions/social': typeof Cake.social === 'function',
        'actions/entertainment': typeof Cake.Entertainment === 'object',
        'time': typeof Cake.advanceTime === 'function',
        'core/render': typeof Cake.initPage === 'function'
    };

    let missing = false;

    // 3. 执行自检
    for (const [folderName, isLoaded] of Object.entries(folderRegistry)) {
        if (!isLoaded) {
            console.error(`❌ [监控中心警告] 文件夹 [${folderName}] 的核心方法未成功装载！请检查是否漏了 import。`);
            missing = true;
        }
    }

    if (!missing) {
        console.log('✅ [监控中心] 所有核心文件夹已成功接入系统！');
    }
})();
