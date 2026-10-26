// js/core/store.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    // 默认状态模板：只读，ensureState 通过 JSON 深拷贝生成新对象
    const DEFAULT_STATE = Object.freeze({
        day: 1,
        money: 500,
        energy: 100,
        reputation: 20,
        shopLevel: 1,
        decoration: 0,
        priceRate: 1.0,
        avatar: '👩‍🍳',
        shopName: '甜蜜小屋',
        recipes: {},
        cakes: {},
        ingredients: {},
        characters: {},
        log: [],
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
        DEFAULT_STATE, // ES6 属性简写，等价于 DEFAULT_STATE: DEFAULT_STATE
    };
})();
