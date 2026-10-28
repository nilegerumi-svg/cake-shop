// js/shared.js
window.Cake = window.Cake || {};

if (window.self !== window.top) {
    console.log('🧩 [Shared] 检测到子页面环境，跳过代理生成。');
} else {

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
            } catch (_) {}
            store.state = s;
            if (typeof Cake.saveState === 'function') Cake.saveState();
        } else if (typeof Cake.loadStateFromStorage === 'function') {
            store.state = Cake.loadStateFromStorage();
        }
    })();

    // ── 2. Game 兼容层 ──
    (() => {
        const Cake = window.Cake;
        const Game = (window.Game = window.Game || {});

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

        // Game.state = 游戏存档（不是引擎状态）
        Object.defineProperty(Game, 'state', {
            configurable: true,
            enumerable: true,
            get: () => (Cake.store ? Cake.store.state : undefined),
            set: (v) => { if (Cake.store) Cake.store.state = v; },
        });

        Game.rest = () => { if (typeof Cake.rest === 'function') return Cake.rest(); };
        Game.sleep = () => { if (typeof Cake.sleep === 'function') return Cake.sleep(); };
        Game.walk = (locName) => {
            const loc = typeof locName === 'string' ? locName : 'home';
            if (typeof Cake.walk === 'function') return Cake.walk(loc);
        };
    })();

    // ── 3. bridge：跨 iframe 状态同步 ──
    (() => {
        const Cake = window.Cake;
        const setup = () => {
            if (!Cake.bridge || !Cake.bridge.inIframe) return false;
            if (typeof Cake.bridge.onStateChanged !== 'function') return false;

            Cake.bridge.onStateChanged(() => {
                if (typeof Cake.loadStateFromStorage === 'function') {
                    Cake.store.state = Cake.loadStateFromStorage();
                }
                if (typeof Cake.refreshPage === 'function') {
                    try { Cake.refreshPage(); return; } catch (_) {}
                }
                try { window.location.reload(); } catch (_) {}
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

    console.log('🧩 [Shared] 父页面 Game 兼容层挂载完毕');
}
