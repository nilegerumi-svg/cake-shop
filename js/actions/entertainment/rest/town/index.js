// js/actions/entertainment/rest/town/index.js

// 引入事件库
import './events/index.js';

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
    if (!Cake) return;

    // 防重复挂载
    if (Cake.__townRestLoaded) {
        console.log('🏘️ [TownRest] 已加载，跳过重复初始化');
        return;
    }
    Cake.__townRestLoaded = true;

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    // 纯数据配置（冻结，防止运行时被意外修改）
    Cake.TownRestConfig = deepFreeze({
        home: {
            nap:   { name: '家里小憩', energy: 40, time: 60 },
            sleep: { name: '睡觉', time: 'next_day' },
        },
        park: {
            nap:   { name: '公园小憩', energy: 20, time: 30 },
            // park 没有配置 sleep，所以不能睡觉
        },
    });

    // 将城镇休息配置挂载到总表（不覆盖其他区域）
    Cake.Actions = Cake.Actions || {};
    Cake.Actions.Rest = Cake.Actions.Rest || {};
    Cake.Actions.Rest.town = Cake.TownRestConfig;

    console.log('🏘️ 城镇休息模块装载完毕');
})();
