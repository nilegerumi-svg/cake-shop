// js/entertainment/rest/monitor.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 全局事件池（由各地点的 event 文件向这里注册数据）
    Cake.REST_EVENTS = Cake.REST_EVENTS || {};

    Cake.RestMonitor = {
        /**
         * 检查是否有事件触发
         * @param {string} region 区域 (如 'town')
         * @param {string} location 地点 (如 'home', 'park')
         * @param {string} action 动作 ('nap', 'sleep')
         * @returns {object|null} 返回触发的事件对象，如果没有则返回 null
         */
        check: (region, location, action) => {
            const key = `${region}_${location}_${action}`;
            const pool = Cake.REST_EVENTS[key];
            const state = Cake.store.state;

            if (!pool || !Array.isArray(pool)) return null;

            // 遍历该地点所有事件
            for (const ev of pool) {
                // 1. 检查触发条件 (比如好感度、时间、天气等)
                if (ev.condition && typeof ev.condition === 'function') {
                    if (!ev.condition(state)) continue;
                }
                
                // 2. 掷骰子 (默认 10% 概率)
                const chance = ev.chance ?? 0.1;
                if (Math.random() < chance) {
                    return ev; // 触发了！
                }
            }
            return null;
        }
    };
})();
