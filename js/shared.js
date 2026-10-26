window.Cake = window.Cake || {};

// ============ 初始化 state ============
(function initState() {
    var Cake = window.Cake;

    if (!Cake.hasSave()) {
        // 首次进入：用 index.html 保存的初始设置，避免玩家名字被 defaultState 覆盖
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
        Cake.saveState(); // 首次落盘；此时父页面 broadcaster 可能未设置，静默跳过
    } else {
        Cake.store.state = Cake.loadStateFromStorage();
    }
})();

window.Game = {
    get state() { return window.Cake.store.state; },
    set state(v) { window.Cake.store.state = v; },

    // 数据
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

    // 存档
    SAVE_KEY: window.Cake.SAVE_KEY,
    SAVE_VERSION: window.Cake.SAVE_VERSION,
    defaultState: window.Cake.defaultState,
    hasSave: window.Cake.hasSave,
    saveState: window.Cake.saveState,
    loadStateFromStorage: window.Cake.loadStateFromStorage,

    // 工具
    $: window.Cake.$,
    addLog: window.Cake.addLog,
    ingredientTags: window.Cake.ingredientTags,
    affLevel: window.Cake.affLevel,
    escapeHtml: window.Cake.escapeHtml,

    // 模态框
    showModal: window.Cake.showModal,
    closeModal: window.Cake.closeModal,

    // 渲染
    renderHeader: window.Cake.renderHeader,
    renderNav: window.Cake.renderNav,
    renderFooter: window.Cake.renderFooter,
    renderLog: window.Cake.renderLog,
    initPage: window.Cake.initPage,
    refreshPage: window.Cake.refreshPage,

    // 业务
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
    rest: window.Cake.rest,
    walk: window.Cake.walk,
    showEnding: window.Cake.showEnding,
    saveGame: window.Cake.saveGame,
    loadGame: window.Cake.loadGame,
    resetGame: window.Cake.resetGame,
};

// ============ 子页面：收到父页面的 state-sync 后从磁盘重载并重渲染 ============
(function () {
    var Cake = window.Cake;
    if (!Cake.bridge || !Cake.bridge.inIframe) return;

    Cake.bridge.onHostMessage(function (msg) {
        if (msg.type !== 'state-sync') return;

        Cake.store.state = Cake.loadStateFromStorage();

        // 优先调用页面自定义的刷新；没有则重载 iframe 兜底
        if (typeof Cake.refreshPage === 'function') {
            try { Cake.refreshPage(); return; }
            catch (err) {
                if (window.console) console.warn('[bridge] refreshPage failed', err);
            }
        }
        try { window.location.reload(); } catch (_) {}
    });
})();
