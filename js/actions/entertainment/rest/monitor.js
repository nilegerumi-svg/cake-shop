(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 所有事件都往这里塞
    Cake.REST_EVENTS = Cake.REST_EVENTS || {};

    Cake.RestMonitor = {
        check: (region, location, action) => {
            const state = Cake.store.state;

            // 1. 优先检查【地点专属事件】
            const placeKey = `${region}_${location}_${action}`;
            const placePool = Cake.REST_EVENTS[placeKey] || [];
            
            for (const ev of placePool) {
                if (ev.condition && !ev.condition(state)) continue;
                const chance = ev.chance ?? 0.1;
                if (Math.random() < chance) return ev; 
            }

            // 2. 其次检查【区域通用事件】
            const commonKey = `${region}_common`;
            const commonPool = Cake.REST_EVENTS[commonKey] || [];

            for (const ev of commonPool) {
                // 通用事件可以限制只能在小憩或睡觉时触发
                if (ev.action && ev.action !== action) continue;
                if (ev.condition && !ev.condition(state)) continue;
                const chance = ev.chance ?? 0.1;
                if (Math.random() < chance) return ev;
            }

            return null;
        }
    };
})();
