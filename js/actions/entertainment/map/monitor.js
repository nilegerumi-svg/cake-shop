// js/actions/entertainment/map/monitor.js
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
    if (Cake.__mapMonitorLoaded) {
        console.log('🎲 [MapMonitor] 已加载，跳过重复初始化');
        return;
    }
    Cake.__mapMonitorLoaded = true;

    // 权重归一化：明确区分「未设置 chance」和「chance: 0」
    const normalizeWeight = (ev) => {
        if (!ev || ev.chance === undefined) return 1;
        const n = Number(ev.chance);
        return Number.isFinite(n) ? Math.max(0, n) : 1;
    };

    const safeCondition = (ev, state) => {
        if (!ev || typeof ev.condition !== 'function') return true;
        try {
            return !!ev.condition(state);
        } catch (err) {
            console.warn('⚠️ [MapMonitor] 事件条件检查报错:', err);
            return false;
        }
    };

    Cake.MapMonitor = {
        checkWalkEvent: (location, state) => {
            const locConfig = Cake.LOCATIONS && Cake.LOCATIONS[location];
            if (!locConfig) return null;

            // 1. 收集所有候选事件
            const commonPool = Array.isArray(Cake.COMMON_WALK_EVENTS) ? Cake.COMMON_WALK_EVENTS : [];
            const regionPool = Array.isArray(Cake.TOWN_EVENTS) ? Cake.TOWN_EVENTS : [];
            const mapEvents = Array.isArray(locConfig.events) ? locConfig.events : [];

            const allEvents = [
                ...commonPool.map(ev => ({ ...ev, _type: 'common' })),
                ...regionPool.map(ev => ({ ...ev, _type: 'region' })),
                ...mapEvents.map(ev => ({ ...ev, _type: 'location' })),
            ];

            // 2. 过滤条件
            const validEvents = allEvents.filter(ev => safeCondition(ev, state));

            if (validEvents.length === 0) {
                return { text: '你四处走了走，但什么也没有发生。' };
            }

            // 3. 统一权重抽取：
            //    - 普通事件（无 chance）权重 = 1
            //    - 稀有事件（有 chance）权重 = chance
            //    - chance: 0 明确表示永不触发
            const weighted = validEvents.map((ev) => ({
                ev,
                weight: normalizeWeight(ev),
            }));

            const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);

            // 全部权重为 0 时退回等概率，避免除零
            if (totalWeight <= 0) {
                return validEvents[Math.floor(Math.random() * validEvents.length)];
            }

            let roll = Math.random() * totalWeight;
            for (const { ev, weight } of weighted) {
                roll -= weight;
                if (roll < 0) return ev;
            }

            // 浮点误差兜底
            return weighted[weighted.length - 1].ev;
        },
    };
})();
