// js/shared.js
window.Cake = window.Cake || {};

// ── 1. 初始化状态 ──
(() => {
    const Cake = window.Cake;
    const store = Cake.store;
    if (!store) {
        console.error('❌ [Shared] 致命错误：core/store.js 未加载！');
        return;
    }

    const getDefaultState = () => {
        if (typeof Cake.defaultState === 'function') return Cake.defaultState();
        if (store.DEFAULT_STATE) return JSON.parse(JSON.stringify(store.DEFAULT_STATE));
        return {
            day: 1, money: 500, energy: 100, reputation: 20,
            shopLevel: 1, decoration: 0, priceRate: 1.0,
            avatar: '👩‍🍳', shopName: '甜蜜小屋',
            recipes: {}, cakes: {}, ingredients: {}, characters: {}, log: [],
        };
    };

    const hasSave = typeof Cake.hasSave === 'function' ? Cake.hasSave() : false;

    if (!hasSave) {
        const s = getDefaultState();
        try {
            const pn = localStorage.getItem('playerName');
            const sn = localStorage.getItem('shopName');
            const av = localStorage.getItem('playerAvatar');
            if (pn && pn.trim()) s.playerName = pn.trim().slice(0, 12);
            if (sn && sn.trim()) s.shopName = sn.trim().slice(0, 12);
            const AVATAR_MAP = { girl1: '👧🏻', girl2: '👩🏻', boy1: '👦🏻', cake: '🧁' };
            if (av && AVATAR_MAP[av]) s.avatar = AVATAR_MAP[av];
        } catch (_) { /* ignore */ }
        store.state = s;
        if (typeof Cake.saveState === 'function') Cake.saveState();
    } else if (typeof Cake.loadStateFromStorage === 'function') {
        store.state = Cake.loadStateFromStorage();
    }
})();

// ── 2. Game 兼容层：代理所有接口，供 iframe 子页面调用 ──
(() => {
    const Cake = window.Cake;
    const Game = (window.Game = window.Game || {});

    // 需要代理的属性/方法列表
    const LIVE_KEYS = [
        'INGREDIENTS', 'RECIPES', 'BUNDLES', 'CHARACTERS', 'AFF_EVENTS',
        'CHAT_DIALOGUES', 'DATE_DIALOGUES', 'MEETINGS', 'RANDOM_EVENTS',
        'ACHIEVEMENTS', 'SHOP_UPGRADE_COSTS',
        
        'LOCATIONS', 'COMMON_WALK_EVENTS', 'TOWN_EVENTS', 'Entertainment',
        
        'advanceTime', 'getTimeString', 'getPeriodString',
        'triggerRest', 'sleep', 'Actions', 'RestSys', 'RestMonitor',
        
        'SAVE_KEY', 'SAVE_VERSION',
        'defaultState', 'hasSave', 'saveState', 'loadStateFromStorage',
        'resetGame', 'saveGame', 'loadGame', 'showEnding',
        
        '$', 'addLog', 'ingredientTags', 'affLevel', 'escapeHtml', 'fail',
        'showModal', 'closeModal',
        'renderHeader', 'renderNav', 'renderFooter', 'renderLog',
        'initPage', 'refreshPage',
        
        'bakeCake', 'buyIngredient', 'buyBundle', 'researchRecipe',
        'upgradeShop', 'decorateShop', 'setPriceRate', 'openShop',
        'social', 'toggleGiftPanel', 'giveGift',
    ];

    // 动态代理挂载
    for (const key of LIVE_KEYS) {
        Object.defineProperty(Game, key, {
            configurable: true,
            enumerable: true,
            get: () => Cake[key],
            set: (v) => { Cake[key] = v; },
        });
    }

    // 单独代理 state
    Object.defineProperty(Game, 'state', {
        configurable: true,
        enumerable: true,
        get: () => Cake.store.state,
        set: (v) => { Cake.store.state = v; },
    });

    // 包装需要传参的方法（防止 undefined 报错）
    Game.rest = () => { if (typeof Cake.rest === 'function') return Cake.rest(); };
    Game.sleep = () => { if (typeof Cake.sleep === 'function') return Cake.sleep(); };
    Game.walk = (locName) => {
        const loc = typeof locName === 'string' ? locName : 'home';
        if (typeof Cake.walk === 'function') return Cake.walk(loc);
    };

    if (typeof Cake.initPage !== 'function') {
        console.warn('⚠️ [Shared] 警告：Cake.initPage 未挂载，主页可能白屏。');
    }
})();

// ── 3. bridge：跨 iframe 状态同步 ──
(() => {
    const Cake = window.Cake;

    const setup = () => {
        // 如果当前不在 iframe 中，不需要监听父页面同步
        if (!Cake.bridge || !Cake.bridge.inIframe) return false;
        if (typeof Cake.bridge.onStateChanged !== 'function') return false;

        Cake.bridge.onStateChanged(() => {
            if (typeof Cake.loadStateFromStorage === 'function') {
                Cake.store.state = Cake.loadStateFromStorage();
            }
            if (typeof Cake.refreshPage === 'function') {
                try { Cake.refreshPage(); return; } catch (_) { /* fallthrough */ }
            }
            try { window.location.reload(); } catch (_) { /* ignore */ }
        });
        return true;
    };

    if (setup()) return;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setTimeout(setup, 0);
    }
})();

console.log('🧩 [Shared] Game 兼容层挂载完毕');
