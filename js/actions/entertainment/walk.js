// js/actions/entertainment/walk.js
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
    if (Cake.__walkLoaded) {
        console.log('🚶 [Walk] 已加载，跳过重复初始化');
        return;
    }
    Cake.__walkLoaded = true;

    const num = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    /* ---------------- 兜底事件池 ---------------- */
    // 当 Cake.MapMonitor 未定义时，从全局事件池里抽一个
    const pickFallbackEvent = () => {
        const pool = [];
        if (Array.isArray(Cake.WALK_EVENTS))        pool.push(...Cake.WALK_EVENTS);
        if (Array.isArray(Cake.COMMON_WALK_EVENTS)) pool.push(...Cake.COMMON_WALK_EVENTS);
        if (pool.length === 0) return null;
        return pool[Math.floor(Math.random() * pool.length)];
    };

    const checkWalkEvent = (locKey, state) => {
        // 优先用地图监视器
        if (Cake.MapMonitor && typeof Cake.MapMonitor.checkWalkEvent === 'function') {
            try {
                const ev = Cake.MapMonitor.checkWalkEvent(locKey, state);
                if (ev) return ev;
            } catch (err) {
                console.warn('⚠️ [Walk] MapMonitor.checkWalkEvent 异常，改用兜底事件池', err);
            }
        }
        return pickFallbackEvent();
    };

    /* ---------------- walk ---------------- */

    const walk = (location) => {
        const state = Cake.store && Cake.store.state;
        if (!state) {
            Cake.addLog?.('❌ 游戏状态未就绪');
            Cake.refreshPage?.();
            return;
        }

        const locKey = location || 'home';
        const locConfig = Cake.LOCATIONS && Cake.LOCATIONS[locKey];

        if (!locConfig) {
            Cake.addLog?.(`❌ 未知的地点：${locKey}`);
            Cake.refreshPage?.();
            return;
        }

        const cost = num(locConfig.cost, 8);
        const energy = num(state.energy, 0);

        if (energy < cost) {
            Cake.addLog?.(`😵 精力不足 ${cost} 点，无法前往${locConfig.name || locKey}！`);
            Cake.refreshPage?.();
            return;
        }

        // 记录出发前状态
        const beforeEnergy = energy;
        const beforeAff = {};
        for (const [cid, cs] of Object.entries(state.characters || {})) {
            if (cs && cs.met) beforeAff[cid] = num(cs.affection, 0);
        }

        // 扣精力
        state.energy = energy - cost;

        // 抽取事件
        const chosen = checkWalkEvent(locKey, state);

        // 应用效果
        if (chosen && typeof Cake.applyEventEffects === 'function') {
            try {
                Cake.applyEventEffects(chosen);
            } catch (err) {
                console.warn('⚠️ [Walk] applyEventEffects 异常', err);
            }
        }

        // 日志
        const delta = num(state.energy, 0) - beforeEnergy;
        const sign = delta >= 0 ? '+' : '';
        const text = (chosen && chosen.text) || '一路平安，什么都没发生。';
        Cake.addLog?.(`🚶‍♀️ 在【${locConfig.name || locKey}】（⚡${sign}${delta}）：${text}`);

        // 好感变化检查：支持多个角色同时变化
        const changedCids = [];
        for (const [cid, before] of Object.entries(beforeAff)) {
            const cs = state.characters[cid];
            if (cs && num(cs.affection, 0) !== before) {
                changedCids.push(cid);
            }
        }
        for (const cid of changedCids) {
            try { Cake.checkAffEvent?.(cid); } catch (_) { /* ignore */ }
        }

        try { Cake.checkAchievements?.(); } catch (_) { /* ignore */ }

        // ⭐ 散步也要推进时间（每处地点在配置里声明 time，单位：分钟）
        const walkTime = num(locConfig.time, 0);

        if (typeof Cake.advanceTime === 'function' && walkTime > 0) {
            Cake.addLog?.(`⏰ 这次散步花了 ${walkTime} 分钟。`);
            // advanceTime 内部会 saveState + refreshPage
            Cake.advanceTime(walkTime);
        } else {
            Cake.saveState?.();
            Cake.refreshPage?.();
        }
    };

    Cake.walk = walk;
})();
