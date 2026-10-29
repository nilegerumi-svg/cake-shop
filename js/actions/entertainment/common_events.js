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
        { text: '你发现一家便宜又新鲜的食材小店，买了一袋低筋面粉。', ing: { flour_low: 1 } },
        { text: '你四处闲逛，享受了片刻的宁静，什么也没有发生。' },
    ]);

    // 👈 核心引擎：将事件属性应用到玩家身上（walk.js 依赖于此）
    window.Cake.applyEventEffects = function (evt) {
        const Cake = window.Cake;
        const state = Cake.store.state;
        if (!state || !evt) return;

        // 1. 结算精力
        if (evt.energy) {
            state.energy = Math.max(0, state.energy + evt.energy);
        }

        // 2. 结算声望
        if (evt.rep) {
            state.shop.stats.reputation = Math.max(0, state.shop.stats.reputation + evt.rep);
        }

        // 3. 结算金钱（新增：支持你 home 里的捡硬币事件）
        if (evt.money) {
            state.money = Math.max(0, state.money + evt.money);
        }

        // 4. 结算食材获得
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

    // 👈 保留你写的这个辅助函数（虽然 walk.js 用的是 MapMonitor，但这可以作为备用抽取器）
    window.Cake.triggerRandomEvent = function () {
        const Cake = window.Cake;
        const state = Cake.store.state;
        if (!state) return;

        const events = Cake.COMMON_WALK_EVENTS;
        if (!events || events.length === 0) return;

        const evt = Cake.randomPick(events);
        Cake.addLog(`🚶 [散步] ${evt.text}`);

        // 直接调用上面的应用引擎
        window.Cake.applyEventEffects(evt);

        if (Cake.emit) Cake.emit('refresh_ui');
    };
})();
