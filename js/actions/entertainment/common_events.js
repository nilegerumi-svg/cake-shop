// js/actions/entertainment/common_events.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    // 所有地点都会混入这些事件
    window.Cake.COMMON_WALK_EVENTS = deepFreeze([
        { text: '你走得太远，有点累了。', energy: -5 },
        { text: '你在路上捡到了一片漂亮的落叶，心情变好了。', rep: 1 },
        // 👈 修复：把 flour 改为食材库真实的 ID flour_low
        { text: '你发现一家便宜又新鲜的食材小店，买了一袋低筋面粉。', ing: { flour_low: 1 } },
        { text: '你四处闲逛，享受了片刻的宁静，什么也没有发生。' },
    ]);

    // 👈 新增：通用的“抽取并应用随机事件”引擎
    window.Cake.triggerRandomEvent = function () {
        const Cake = window.Cake;
        const state = Cake.store.state;
        if (!state) return;

        const events = Cake.COMMON_WALK_EVENTS;
        if (!events || events.length === 0) return;

        // 随机抽一个事件
        const evt = Cake.randomPick(events);

        // 1. 打印日志
        Cake.addLog(`🚶 [散步] ${evt.text}`);

        // 2. 结算精力 (不能低于 0)
        if (evt.energy) {
            state.energy = Math.max(0, state.energy + evt.energy);
        }

        // 3. 结算声望 (不能低于 0)
        if (evt.rep) {
            state.shop.stats.reputation = Math.max(0, state.shop.stats.reputation + evt.rep);
        }

        // 4. 结算食材获得（放入数组背包，带上随机保质期）
        if (evt.ing) {
            for (const [itemId, qty] of Object.entries(evt.ing)) {
                const itemData = Cake.INGREDIENTS[itemId];
                const shelfLife = Cake.getRandomShelfLife((itemData && itemData.tags && itemData.tags[0]) || 'default');
                
                for (let i = 0; i < qty; i++) {
                    state.inventory.push({
                        id: itemId,
                        quality: 50,
                        expireDay: state.time.day + shelfLife
                    });
                }
            }
        }

        // 5. 触发 UI 刷新
        if (Cake.emit) Cake.emit('refresh_ui');
    };
})();
