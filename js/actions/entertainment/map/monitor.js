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

            // 3. 优先级概率抽取（处理带有 chance 的稀有事件）
            for (const ev of validEvents) {
                if (ev.chance !== undefined) {
                    if (Math.random() < ev.chance) {
                        return ev; 
                    }
                }
            }

            // 4. 普通等概率抽取（从剩余无 chance 的池子里抽）
            const normalEvents = validEvents.filter(ev => ev.chance === undefined);
            const pool = normalEvents.length > 0 ? normalEvents : validEvents;
            
            return pool[Math.floor(Math.random() * pool.length)];
        }
    };
})();
