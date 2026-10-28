// js/monitor/index.js
import './time.js';
import './page.js';

(() => {
    'use strict';

    // 跨域守卫：iframe 中访问 parent 可能抛错
    const getCake = () => {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) {
                return window.parent.Cake;
            }
        } catch (_) { /* 跨域忽略 */ }
        return window.Cake || null;
    };

    const Cake = getCake();
    if (!Cake) {
        console.warn('⚠️ [监控中心] 未找到 Cake，跳过自检');
        return;
    }

    // 防重复挂载（monitor/index.js 若被多处 import 只跑一次）
    if (Cake.__monitorCenterLoaded) {
        console.log('👁️ [监控中心] 已加载，跳过重复初始化');
        return;
    }
    Cake.__monitorCenterLoaded = true;

    console.log('👁️ 全局监控中心已启动，开始扫描各文件夹模块...');

    const folderRegistry = {
        'actions/bakery':       () => typeof Cake.bakeCake === 'function',
        'actions/shop':         () => typeof Cake.openShop === 'function',
        'actions/social':       () => typeof Cake.social === 'function',
        'actions/entertainment':() => typeof Cake.Entertainment === 'object' && Cake.Entertainment !== null,
        'time':                 () => typeof Cake.advanceTime === 'function',
        'core/render':          () => typeof Cake.initPage === 'function'
    };

    const runCheck = () => {
        let missing = false;

        for (const [folderName, check] of Object.entries(folderRegistry)) {
            if (!check()) {
                console.error(
                    `❌ [监控中心警告] 文件夹 [${folderName}] 的核心方法未成功装载！请检查是否漏了 import。`
                );
                missing = true;
            }
        }

        if (!missing) {
            console.log('✅ [监控中心] 所有核心文件夹已成功接入系统！');
        }
    };

    // 延迟一拍，等所有模块的同步副作用（挂载方法）跑完
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(runCheck, 0), { once: true });
    } else {
        setTimeout(runCheck, 0);
    }
})();
