// js/shared.js
window.Cake = window.Cake || {};

// 🚨 核心护盾：如果当前是子页面（iframe），绝不执行代理逻辑，防止互相劫持爆栈！
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
            } catch (_) { /* ignore */ }
            store.state = s;
            if (typeof Cake.saveState === 'function') Cake.saveState();
        } else if (typeof Cake.loadStateFromStorage === 'function') {
            store.state = Cake.loadStateFromStorage();
        }
    })();

    // ── 2. Game 兼容层：动态 Proxy（替代原来的 LIVE_KEYS 静态清单） ──
    (() => {
        const Cake = window.Cake;

        // Game 只是 Cake 的一个「实时视图」：
        //  - 读 Game.xxx  → 转发到 Cake.xxx（任何新方法自动生效，无需登记）
        //  - 写 Game.xxx  → 落在 Game 自身，绝不污染 Cake（彻底避免 setter 覆盖事故）
        //  - Game.state  → 特殊映射到 Cake.store.state（游戏存档）
        const Game = new Proxy({}, {
            get(target, prop) {
                if (prop === 'state') {
                    return Cake.store ? Cake.store.state : undefined;
                }
                if (prop in target) return target[prop];   // 允许 Game 上的临时覆盖（如 main.js 的 meta）
                return Cake[prop];                          // 默认动态转发到 Cake
            },
            set(target, prop, value) {
                if (prop === 'state') {
                    if (Cake.store) Cake.store.state = value;
                    return true;
                }
                target[prop] = value;                       // 只写 Game 自身，不污染 Cake
                return true;
            },
            has(target, prop) {
                return prop === 'state' || prop in target || prop in Cake;
            },
        });

        window.Game = Game;
        console.log('🧩 [Shared] 父页面 Game 动态代理已挂载（无需维护 LIVE_KEYS）');
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

    console.log('🧩 [Shared] 父页面共享层装载完毕');
}
