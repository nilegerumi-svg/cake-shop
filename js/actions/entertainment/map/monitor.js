// js/actions/entertainment/map/monitor.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    Cake.MapMonitor = {
        /**
         * 检查并抽取散步事件
         * @param {string} location 当前地点 (如 'park')
         * @param {object} state 当前游戏状态
         * @returns {object|null} 选中的事件对象
         */
        checkWalkEvent: (location, state) => {
            const locConfig = Cake.LOCATIONS?.[location];
            if (!locConfig) return null;

            // 1. 收集所有候选事件（通用 + 地点专属）
            const commonPool = Cake.COMMON_WALK_EVENTS || [];
            const mapEvents = locConfig.events || [];
            
            // 给事件打上来源标记（可选，方便调试）
            const allEvents = [
                ...commonPool.map(ev => ({ ...ev, _type: 'common' })),
                ...mapEvents.map(ev => ({ ...ev, _type: 'location' }))
            ];

            // 2. 过滤：剔除不满足 condition 的事件
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
                // 如果全被过滤了，给一个终极保底
                return { text: '你四处走了走，但什么也没有发生。' };
            }

            // 3. 抽取：如果事件写了 chance (比如 0.1 表示 10% 概率必触发)，优先检查
            // 这里我们采用经典的“权重池”逻辑，如果没写 chance 就当做 1 (等概率)
            for (const ev of validEvents) {
                if (ev.chance !== undefined) {
                    if (Math.random() < ev.chance) {
                        return ev; // 触发高优先级特殊事件
                    }
                }
            }

            // 4. 兜底：如果没有触发特殊 chance 事件，或者根本没写 chance，就从普池里随机抽一个
            // 过滤掉那些已经判定过 chance 的事件，避免它们被抽中两次
            const normalEvents = validEvents.filter(ev => ev.chance === undefined);
            const pool = normalEvents.length > 0 ? normalEvents : validEvents;
            
            return pool[Math.floor(Math.random() * pool.length)];
        }
    };
})();
