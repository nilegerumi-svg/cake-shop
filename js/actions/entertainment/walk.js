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
        { text: '你走得太远，有点累了。', energy: -5 }, // 👈 这里明确是扣精力的
        { text: '你在路上捡到了一片漂亮的落叶，心情变好了。', rep: 1 },
        { text: '你发现一家便宜又新鲜的食材小店，买了一袋低筋面粉。', ing: { flour_low: 1 } },
        { text: '你四处闲逛，享受了片刻的宁静，什么也没有发生。' },
    ]);

    // 👈 事件效果应用引擎
    window.Cake.applyEventEffects = function (evt) {
        const Cake = window.Cake;
        const state = Cake.store.state;
        if (!state || !evt) return;

        // 1. 结算精力 (如果是负数就是扣精力)
        if (evt.energy) {
            state.energy = Math.max(0, state.energy + evt.energy);
        }

        // 2. 结算声望
        if (evt.rep) {
            state.shop.stats.reputation = Math.max(0, state.shop.stats.reputation + evt.rep);
        }

        // 3. 结算金钱（👈 之前漏掉的，现在补上了！）
        if (evt.money) {
            state.money = Math.max(0, state.money + evt.money);
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
    };

    // 辅助函数：抽取并应用随机事件
    window.Cake.triggerRandomEvent = function () {
        const Cake = window.Cake;
        const state = Cake.store.state;
        if (!state) return;

        const events = Cake.COMMON_WALK_EVENTS;
        if (!events || events.length === 0) return;

        const evt = Cake.randomPick(events);
        Cake.addLog(`🚶 [散步] ${evt.text}`);

        // 调用上面的应用引擎
        window.Cake.applyEventEffects(evt);

        if (Cake.emit) Cake.emit('refresh_ui');
    };
})();
