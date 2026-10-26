window.Cake = window.Cake || {};

(function initState() {
    var Cake = window.Cake;
    if (!Cake.hasSave()) {
        var s = Cake.defaultState();
        try {
            var pn = localStorage.getItem('playerName');
            var sn = localStorage.getItem('shopName');
            var av = localStorage.getItem('playerAvatar');
            if (pn && pn.trim()) s.playerName = pn.trim().slice(0, 12);
            if (sn && sn.trim()) s.shopName = sn.trim().slice(0, 12);
            var AVATAR_MAP = { girl1: '👧🏻', girl2: '👩🏻', boy1: '👦🏻', cake: '🧁' };
            if (av && AVATAR_MAP[av]) s.avatar = AVATAR_MAP[av];
        } catch (_) {}
        Cake.store.state = s;
        Cake.saveState();
    } else {
        Cake.store.state = Cake.loadStateFromStorage();
    }
})();

window.Game = {
    get state() { return window.Cake.store.state; },
    set state(v) { window.Cake.store.state = v; },

    INGREDIENTS: window.Cake.INGREDIENTS,
    RECIPES: window.Cake.RECIPES,
    BUNDLES: window.Cake.BUNDLES,
    CHARACTERS: window.Cake.CHARACTERS,
    AFF_EVENTS: window.Cake.AFF_EVENTS,
    CHAT_DIALOGUES: window.Cake.CHAT_DIALOGUES,
    DATE_DIALOGUES: window.Cake.DATE_DIALOGUES,
    MEETINGS: window.Cake.MEETINGS,
    RANDOM_EVENTS: window.Cake.RANDOM_EVENTS,
    WALK_EVENTS: window.Cake.WALK_EVENTS,
    ACHIEVEMENTS: window.Cake.ACHIEVEMENTS,
    SHOP_UPGRADE_COSTS: window.Cake.SHOP_UPGRADE_COSTS,

    SAVE_KEY: window.Cake.SAVE_KEY,
    SAVE_VERSION: window.Cake.SAVE_VERSION,
    defaultState: window.Cake.defaultState,
    hasSave: window.Cake.hasSave,
    saveState: window.Cake.saveState,
    loadStateFromStorage: window.Cake.loadStateFromStorage,

    $: window.Cake.$,
    addLog: window.Cake.addLog,
    ingredientTags: window.Cake.ingredientTags,
    affLevel: window.Cake.affLevel,
    escapeHtml: window.Cake.escapeHtml,

    showModal: window.Cake.showModal,
    closeModal: window.Cake.closeModal,

    renderHeader: window.Cake.renderHeader,
    renderNav: window.Cake.renderNav,
    renderFooter: window.Cake.renderFooter,
    renderLog: window.Cake.renderLog,
    initPage: window.Cake.initPage,
    refreshPage: window.Cake.refreshPage,

    bakeCake: window.Cake.bakeCake,
    buyIngredient: window.Cake.buyIngredient,
    buyBundle: window.Cake.buyBundle,
    researchRecipe: window.Cake.researchRecipe,
    upgradeShop: window.Cake.upgradeShop,
    decorateShop: window.Cake.decorateShop,
    setPriceRate: window.Cake.setPriceRate,
    openShop: window.Cake.openShop,
    social: window.Cake.social,
    toggleGiftPanel: window.Cake.toggleGiftPanel,
    giveGift: window.Cake.giveGift,
    
    // 👇 修改点：增加了参数校验，防止把 event 对象传进去
    rest: function() {
        if (window.Cake.rest) return window.Cake.rest();
    },
    walk: function(location) {
        var loc = (typeof location === 'string') ? location : 'home';
        if (window.Cake.walk) return window.Cake.walk(loc);
    },
    // 👆 修改结束

    showEnding: window.Cake.showEnding,
    saveGame: window.Cake.saveGame,
    loadGame: window.Cake.loadGame,
    resetGame: window.Cake.resetGame,
};

/* ★ 子页面收到 state-sync 后重载并重绘 */
(function () {
    var Cake = window.Cake;
    if (!Cake.bridge || !Cake.bridge.inIframe) return;

    Cake.bridge.onStateChanged(function () {
        Cake.store.state = Cake.loadStateFromStorage();

        if (typeof Cake.refreshPage === 'function') {
            try { Cake.refreshPage(); return; } catch (_) {}
        }
        try { window.location.reload(); } catch (_) {}
    });
})();
