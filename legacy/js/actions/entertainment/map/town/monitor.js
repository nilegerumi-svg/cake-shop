// js/actions/entertainment/map/town/monitor.js
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
    if (Cake.__townMonitorLoaded) {
        console.log('🎲 [TownMonitor] 已加载，跳过重复初始化');
        return;
    }
    Cake.__townMonitorLoaded = true;

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    // concat 合并，避免与其他模块注册的同名 key 冲突
    const events = [
        {
            text: '🏘️ 城镇的街道今天格外热闹，路边的小贩在叫卖。',
            rep: 1,
        },
        {
            text: '📰 你在街角的公告栏看到了最新的甜品大赛海报，灵感涌现。',
            rep: 2,
        },
        {
            text: '🚂 一辆送货车飞驰而过，溅了你一身泥水……',
            energy: -2,
            // 👈 修复：适配最新的 schema，从 state.time.hour 读取小时
            condition: (state) => state.time && state.time.hour > 6 && state.time.hour < 9,
        },
    ].map(deepFreeze);

    const existing = Cake.TOWN_EVENTS;
    Cake.TOWN_EVENTS = Object.freeze(
        Array.isArray(existing) ? existing.concat(events) : events
    );
})();
