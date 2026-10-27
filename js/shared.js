// js/shared.js
window.Cake = window.Cake || {};

// ── 1. 初始化状态（带防护，默认值优先复用 store.DEFAULT_STATE）──
(() => {
    const Cake = window.Cake;
    const { store } = Cake;
    if (!store) return; // core/store.js 未加载则放弃，避免崩

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

    const LIVE_KEYS = [
        // 基础数据
        'INGREDIENTS', 'RECIPES', 'BUNDLES', 'CHARACTERS', 'AFF_EVENTS',
        'CHAT_DIALOGUES', 'DATE_DIALOGUES', 'MEETINGS', 'RANDOM_EVENTS',
        'ACHIEVEMENTS', 'SHOP_UPGRADE_COSTS',
        
        // 🌟 最新重构后的地图与事件模块
        'LOCATIONS', 
        'COMMON_WALK_EVENTS',
        'Entertainment', // 娱乐模块的聚合命名空间
        
        // 存档与系统
        'SAVE_KEY', 'SAVE_VERSION',
        'defaultState', 'hasSave', 'saveState', 'loadStateFromStorage',
        'resetGame', 'saveGame', 'loadGame', 'showEnding',
        
        // 工具与渲染
        '$', 'addLog', 'ingredientTags', 'affLevel', 'escapeHtml', 'fail',
        'showModal', 'closeModal',
        'renderHeader', 'renderNav', 'renderFooter', 'renderLog',
        'initPage', 'refreshPage',
        
        // 动作模块
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

    // 这两个有参数处理，保留包装函数；内部实时访问 Cake，不受加载顺序影响
    Game.rest = () => {
        if (typeof Cake.rest === 'function') return Cake.rest();
    };

    Game.walk = (locName) => {
        const loc = typeof locName === 'string' ? locName : 'home';
        if (typeof Cake.walk === 'function') return Cake.walk(loc);
    };
})();

// ── 3. bridge：就绪检测 + 延迟重试，避免加载顺序导致静默失效 ──
(() => {
    const Cake = window.Cake;

    const setup = () => {
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

    if (setup()) return;

    // bridge.js 可能晚于 shared.js 加载：DOM 就绪后再试一次
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setTimeout(setup, 0);
    }
})();
