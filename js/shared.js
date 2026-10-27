// js/shared.js
window.Cake = window.Cake || {};

// ── 1. 初始化状态（带防护，默认值优先复用 store.DEFAULT_STATE）──
(() => {
    const Cake = window.Cake;
    const { store } = Cake;
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

// ── 2. Game 兼容层：全部改为实时读取，消除加载顺序依赖 ──
(() => {
    const Cake = window.Cake;
    const Game = (window.Game = window.Game || {});

    // 🌟 核心接口优先级列表
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

    for (const key of LIVE_KEYS) {
        Object.defineProperty(Game, key, {
            configurable: true,
            enumerable: true,
            get: () => Cake[key],
            set: (v) => { Cake[key] = v; },
        });
    }

    Object.defineProperty(Game, 'state', {
        configurable: true,
        enumerable: true,
        get: () => Cake.store.state,
        set: (v) => { Cake.store.state = v; },
    });

    // 包装必须有参数的方法
    Game.rest = () => { if (typeof Cake.rest === 'function') return Cake.rest(); };
    Game.sleep = () => { if (typeof Cake.sleep === 'function') return Cake.sleep(); };
    Game.walk = (locName) => {
        const loc = typeof locName === 'string' ? locName : 'home';
        if (typeof Cake.walk === 'function') return Cake.walk(loc);
    };

    // 🚨 自检：如果 Game.initPage 缺失，说明 core/render.js 没加载好
    if (typeof Cake.initPage !== 'function') {
        console.warn('⚠️ [Shared] 警告：Cake.initPage 未挂载！主页可能会白屏。请检查 core/render.js');
    }
})();

// ── 3. bridge：就绪检测 + 延迟重试，避免加载顺序导致静默失效 ──
(() => {
    const Cake = window.Cake;

    const setup = () => {
        // 如果没有 bridge 或者不在 iframe 里，直接跳过
        if (!Cake.bridge || !Cake.bridge.inIframe) return false;
        if (typeof Cake.bridge.onStateChanged !== 'function') return false;

        Cake.bridge.onStateChanged(() => {
            Cake.store.state = Cake.loadStateFromStorage();
            if (typeof Cake.refreshPage === 'function') {
                try { Cake.refreshPage(); return; } catch (_) { /* fallthrough */ }
            }
            try { window.location.reload(); } catch (_) { /* ignore */ }
        });
        return true;
    };

    // 尝试立即初始化，如果失败，等 DOM 就绪后再试
    if (setup()) return;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setTimeout(setup, 0);
    }
})();

console.log('🧩 [Shared] Game 兼容层挂载完毕');
