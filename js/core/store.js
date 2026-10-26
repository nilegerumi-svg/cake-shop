// js/core/store.js
window.Cake = window.Cake || {};

(function () {
    var DEFAULT_STATE = {
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
        log: []
    };

    var _state = null;

    function ensureState() {
        if (!_state) {
            _state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        }
        return _state;
    }

    window.Cake.store = {
        get state() {
            return ensureState();
        },
        set state(val) {
            _state = val;
        },
        DEFAULT_STATE: DEFAULT_STATE
    };
})();
