// js/actions/entertainment/rest/monitor.js
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
    if (Cake.__restMonitorLoaded) {
        console.log('🎲 [RestMonitor] 已加载，跳过重复初始化');
        return;
    }
    Cake.__restMonitorLoaded = true;

    // 所有事件都往这里塞（保持可变：各地点事件库在加载时注册）
    Cake.REST_EVENTS = Cake.REST_EVENTS || {};

    const safeCondition = (ev, state) => {
        if (!ev || typeof ev.condition !== 'function') return true;
        try {
            return !!ev.condition(state);
        } catch (err) {
            console.warn('⚠️ [RestMonitor] 事件 condition 执行失败', err);
            return false;
        }
    };

    const safeChance = (ev) => {
        const c = Number(ev && ev.chance);
        return Number.isFinite(c) ? Math.max(0, Math.min(1, c)) : 0.1;
    };

    const pickFromPool = (pool, state, action) => {
        if (!Array.isArray(pool)) return null;

        for (const ev of pool) {
            if (!ev) continue;
            // action 过滤：通用事件池里可以限制只在小憩或睡觉时触发
            if (ev.action && action && ev.action !== action) continue;
            if (!safeCondition(ev, state)) continue;
            if (Math.random() < safeChance(ev)) return ev;
        }
        return null;
    };

    Cake.RestMonitor = {
        check: (region, location, action) => {
            const state = Cake.store && Cake.store.state;
            if (!state) return null;

            // 1. 优先检查【地点专属事件】
            const placeKey = `${region}_${location}_${action}`;
            const hitPlace = pickFromPool(Cake.REST_EVENTS[placeKey] || [], state, null);
            if (hitPlace) return hitPlace;

            // 2. 其次检查【区域通用事件】
            const commonKey = `${region}_common`;
            const hitCommon = pickFromPool(Cake.REST_EVENTS[commonKey] || [], state, action);
            if (hitCommon) return hitCommon;

            return null;
        },
    };
})();
