// js/core/store.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    // ⚠️ 这是极早期兜底模板。
    // 完整默认状态在 state.js 的 defaultState()（含 totalEarned / totalCakes / hour / minute / achievements 等）。
    // shared.js 会在引擎启动时用 defaultState() 或存档覆盖它，因此这里字段少不会影响游戏。
    const DEFAULT_STATE = Object.freeze({
        version: 1,
        day: 1,
        money: 500,
        energy: 100,
        reputation: 20,
        shopLevel: 1,
        decoration: 0,
        priceRate: 1.0,
        hour: 8,
        minute: 0,
        avatar: '👩‍🍳',
        shopName: '甜蜜小屋',
        recipes: {},
        cakes: {},
        ingredients: {},
        characters: {},
        log: [],
        achievements: {},
        totalCakes: 0,
        totalEarned: 0,
    });

    let _state = null;

    const ensureState = () => {
        if (!_state) {
            _state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        }
        return _state;
    };

    window.Cake.store = {
        get state() {
            return ensureState();
        },
        set state(val) {
            _state = val;
        },
        DEFAULT_STATE,
    };
})();
