window.Cake = window.Cake || {};

// 初始化 state
window.Cake.store.state = window.Cake.loadStateFromStorage();

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