// js/shared.js
window.Cake = window.Cake || {};

// 🚨 核心护盾：子页面直接跳过，防止互相劫持
if (window.self !== window.top) {
    console.log('🧩 [Shared] 检测到子页面环境，跳过代理生成。');
} else {

    // ── 1. 初始化状态（对齐新的 schema 与 store） ──
    (() => {
        const Cake = window.Cake;
        const store = Cake.store;
        if (!store) {
            console.error('❌ [Shared] 致命错误：core/store.js 未加载！');
            return;
        }

        // 👈 修复：强制使用 schema.js 的 createEmptyState
        const getDefaultState = () => {
            if (typeof Cake.createEmptyState === 'function') return Cake.createEmptyState();
            console.warn('⚠️ [Shared] 找不到 createEmptyState，使用极简兜底');
            return { version: 1, money: 200, time: { day: 1, hour: 8, minute: 0 }, inventory: [] };
        };

        // 判断是否已经有存档
        let hasSave = false;
        try {
            hasSave = !!localStorage.getItem(Cake.store.SAVE_KEY || 'cake_shop_save');
        } catch (_) {}

        if (!hasSave) {
            const s = getDefaultState();
            // 兼容你之前的开局名字与头像设置
            try {
                const pn = localStorage.getItem('playerName');
                const sn = localStorage.getItem('shopName');
                const av = localStorage.getItem('playerAvatar');
                if (pn && pn.trim()) s.playerName = pn.trim().slice(0, 12);
                if (sn && sn.trim() && s.shop) s.shop.name = sn.trim().slice(0, 12);
                const AVATAR_MAP = { girl1: '👧🏻', girl2: '👩🏻', boy1: '👦🏻', cake: '🧁' };
                if (av && AVATAR_MAP[av]) s.avatar = AVATAR_MAP[av];
            } catch (_) { /* ignore */ }
            
            store.state = s;
            if (typeof Cake.saveState === 'function') Cake.saveState();
        } else if (typeof Cake.loadStateFromStorage === 'function') {
            store.state = Cake.loadStateFromStorage();
        }
    })();

    // ── 2. Game 兼容层：动态 Proxy ──
    (() => {
        const Cake = window.Cake;

        const Game = new Proxy({}, {
            get(target, prop) {
                if (prop === 'state') {
                    return Cake.store ? Cake.store.state : undefined;
                }
                if (prop in target) return target[prop]; 
                return Cake[prop];                          
            },
            set(target, prop, value) {
                if (prop === 'state') {
                    if (Cake.store) Cake.store.state = value;
                    return true;
                }
                target[prop] = value;                       
                return true;
            },
            has(target, prop) {
                return prop === 'state' || prop in target || prop in Cake;
            },
        });

        window.Game = Game;
        console.log('🧩 [Shared] 父页面 Game 动态代理已挂载');
    })();

    // ── 3. 跨 iframe 状态同步 (适配新的 bridge.js) ──
    (() => {
        const Cake = window.Cake;
        
        // 监听来自 bridge.js 的刷新事件
        if (typeof Cake.on === 'function') {
            Cake.on('refresh_ui', () => {
                // 收到子页面通知，重新从 localStorage 拉取最新数据
                if (typeof Cake.loadStateFromStorage === 'function') {
                    Cake.store.state = Cake.loadStateFromStorage();
                }
                // 触发父页面渲染
                if (typeof Cake.refreshPage === 'function') {
                    try { Cake.refreshPage(); } catch (_) {}
                }
            });
        }
    })();

    console.log('🧩 [Shared] 父页面共享层装载完毕');
}
