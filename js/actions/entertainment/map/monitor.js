// js/actions/entertainment/map/monitor.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    Cake.MapMonitor = {
        checkWalkEvent: (location, state) => {
            const locConfig = Cake.LOCATIONS?.[location];
            if (!locConfig) return null;

            // 1. 收集所有候选事件
            // A. 全局通用事件（如捡到面粉）
            const commonPool = Cake.COMMON_WALK_EVENTS || [];
            // B. 区域通用事件（如城镇突发事件）
            const regionPool = Cake.TOWN_EVENTS || []; 
            // C. 地点专属事件（如公园遇到顾言）
            const mapEvents = locConfig.events || [];

            const allEvents = [
                ...commonPool.map(ev => ({ ...ev, _type: 'common' })),
                ...regionPool.map(ev => ({ ...ev, _type: 'region' })),
                ...mapEvents.map(ev => ({ ...ev, _type: 'location' }))
            ];

            // 2. 过滤条件 (condition)
            const validEvents = allEvents.filter(ev => {
                if (ev.condition && typeof ev.condition === 'function') {
                    try {
                        return ev.condition(state);
                    } catch (err) {
                        console.warn('事件条件检查报错:', err);
                        return false;
                    }
                }
                return true;
            });

            if (validEvents.length === 0) {
                return { text: '你四处走了走，但什么也没有发生。' };
            }

            // 3. 统一权重抽取：
            //    - 普通事件（无 chance）权重 = 1
            //    - 稀有事件（有 chance）权重 = chance
            //    所有事件共享一次随机判定，概率与数组顺序无关，不再先中先返。
            const weighted = validEvents.map((ev) => ({
                ev,
                weight: ev.chance !== undefined ? Math.max(0, Number(ev.chance) || 0) : 1,
            }));

            const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);

            // 全部权重为 0（理论不会发生）时退回等概率
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
        }
    };
})();
