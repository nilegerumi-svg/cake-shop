// js/monitor/index.js
import './time.js';
import './page.js';

(() => {
    'use strict';

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

    if (Cake.__monitorCenterLoaded) {
        console.log('👁️ [监控中心] 已加载，跳过重复初始化');
        return;
    }
    Cake.__monitorCenterLoaded = true;

    console.log('👁️ 全局监控中心已启动');
})();
