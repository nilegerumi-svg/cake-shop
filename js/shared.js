window.Cake = window.Cake || {};

// ── 1. 初始化状态（带防护，默认值优先复用 store.DEFAULT_STATE）──
(function initState() {
    var Cake = window.Cake;
    var store = Cake.store;
    if (!store) return; // core/store.js 未加载则放弃，避免崩

    function getDefaultState() {
        if (typeof Cake.defaultState === 'function') return Cake.defaultState();
        if (store.DEFAULT_STATE) return JSON.parse(JSON.stringify(store.DEFAULT_STATE));
        return {
            day: 1, money: 500, energy: 100, reputation: 20,
            shopLevel: 1, decoration: 0, priceRate: 1.0,
            avatar: '👩‍🍳', shopName: '甜蜜小屋',
            recipes: {}, cakes: {}, ingredients: {}, characters: {}, log: []
        };
    }

    var hasSave = typeof Cake.hasSave === 'function' ? Cake.hasSave() : false;

    if (!hasSave) {
        var s = getDefaultState();
        try {
            var pn = localStorage.getItem('playerName');
            var sn = localStorage.getItem('shopName');
            var av = localStorage.getItem('playerAvatar');
            if (pn && pn.trim()) s.playerName = pn.trim().slice(0, 12);
            if (sn && sn.trim()) s.shopName = sn.trim().slice(0, 12);
            var AVATAR_MAP = { girl1: '👧🏻', girl2: '👩🏻', boy1: '👦🏻', cake: '🧁' };
            if (av && AVATAR_MAP[av]) s.avatar = AVATAR_MAP[av];
        } catch (_) {}
        store.state = s;
        if (typeof Cake.saveState === 'function') Cake.saveState();
    } else if (typeof Cake.loadStateFromStorage === 'function') {
        store.state = Cake.loadStateFromStorage();
    }
})();

// ── 2. Game 兼容层：全部改为实时读取，消除加载顺序依赖 ──
(function exposeGameAlias() {
    var Cake = window.Cake;
    var Game = window.Game = window.Game || {};

    var LIVE_KEYS = [
        'INGREDIENTS', 'RECIPES', 'BUNDLES', 'CHARACTERS', 'AFF_EVENTS',
        'CHAT_DIALOGUES', 'DATE_DIALOGUES', 'MEETINGS', 'RANDOM_EVENTS',
        'WALK_EVENTS', 'ACHIEVEMENTS', 'SHOP_UPGRADE_COSTS',
        'SAVE_KEY', 'SAVE_VERSION',
        'defaultState', 'hasSave', 'saveState', 'loadStateFromStorage',
        '$', 'addLog', 'ingredientTags', 'affLevel', 'escapeHtml', 'fail',
        'showModal', 'closeModal',
        'renderHeader', 'renderNav', 'renderFooter', 'renderLog',
        'initPage', 'refreshPage',
        'bakeCake', 'buyIngredient', 'buyBundle', 'researchRecipe',
        'upgradeShop', 'decorateShop', 'setPriceRate', 'openShop',
        'social', 'toggleGiftPanel', 'giveGift',
        'showEnding', 'saveGame', 'loadGame', 'resetGame'
    ];

    for (var i = 0; i < LIVE_KEYS.length; i++) {
        (function (key) {
            Object.defineProperty(Game, key, {
                configurable: true,
                enumerable: true,
                get: function () { return Cake[key]; },
                set: function (v) { Cake[key] = v; }
            });
        })(LIVE_KEYS[i]);
    }

    Object.defineProperty(Game, 'state', {
        configurable: true,
        enumerable: true,
        get: function () { return Cake.store.state; },
        set: function (v) { Cake.store.state = v; }
    });

    // 这两个有参数处理，保留包装函数；内部实时访问 Cake，不受加载顺序影响
    Game.rest = function () {
        if (typeof Cake.rest === 'function') return Cake.rest();
    };

    // 原参数名 location 遮蔽了 window.location，改名 locName
    Game.walk = function (locName) {
        var loc = (typeof locName === 'string') ? locName : 'home';
        if (typeof Cake.walk === 'function') return Cake.walk(loc);
    };
})();

// ── 3. bridge：就绪检测 + 延迟重试，避免加载顺序导致静默失效 ──
(function bindBridge() {
    var Cake = window.Cake;

    function setup() {
        if (!Cake.bridge || !Cake.bridge.inIframe) return false;
        if (typeof Cake.bridge.onStateChanged !== 'function') return false;
        Cake.bridge.onStateChanged(function () {
            Cake.store.state = Cake.loadStateFromStorage();
            if (typeof Cake.refreshPage === 'function') {
                try { Cake.refreshPage(); return; } catch (_) {}
            }
            try { window.location.reload(); } catch (_) {}
        });
        return true;
    }

    if (setup()) return;
    // bridge.js 可能晚于 shared.js 加载：DOM 就绪后再试一次
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setTimeout(setup, 0);
    }
})();
