// js/shared.js
(() => {
    'use strict';

    const defineGlobal = (key, value) => {
        try {
            const desc = Object.getOwnPropertyDescriptor(window, key);
            if (desc && desc.configurable === false && desc.writable === false) {
                console.warn(`[Shared] ${key} is read-only; skipping global assignment.`);
                return false;
            }
        } catch (_) {}

        try {
            window[key] = value;
            return true;
        } catch (_) {
            try {
                Object.defineProperty(window, key, {
                    value,
                    configurable: true,
                    writable: true,
                    enumerable: true
                });
                return true;
            } catch (err) {
                console.warn(`[Shared] cannot define ${key}`, err);
                return false;
            }
        }
    };

    const ensureCake = () => {
        if (!window.Cake) {
            window.Cake = {};
        }
        return window.Cake;
    };

    const Cake = ensureCake();

    // 子页面不需要父页面全局代理，直接退出
    if (window.self !== window.top) {
        console.log('🧩 [Shared] 检测到子页面环境，跳过代理生成。');
        return;
    }

    const bootKey = '__cakeSharedBooted';
    if (window[bootKey]) return;
    window[bootKey] = true;

    const initShared = () => {
        const Cake = ensureCake();

        if (!Cake.store) {
            console.warn('⚠️ [Shared] store 尚未准备好，稍后重试。');
            setTimeout(initShared, 100);
            return;
        }

        const getDefaultState = () => {
            if (typeof Cake.createEmptyState === 'function') return Cake.createEmptyState();
            console.warn('⚠️ [Shared] 找不到 createEmptyState，使用极简兜底');
            return {
                version: 1,
                money: 200,
                time: { day: 1, hour: 8, minute: 0 },
                inventory: []
            };
        };

        let hasSave = false;
        try {
            hasSave = !!localStorage.getItem(Cake.store.SAVE_KEY || 'cake_shop_save');
        } catch (_) {}

        if (!hasSave) {
            const s = getDefaultState();
            try {
                const pn = localStorage.getItem('playerName');
                const sn = localStorage.getItem('shopName');
                const av = localStorage.getItem('playerAvatar');
                if (pn && pn.trim()) s.playerName = pn.trim().slice(0, 12);
                if (sn && sn.trim() && s.shop) s.shop.name = sn.trim().slice(0, 12);
                const AVATAR_MAP = { girl1: '👧🏻', girl2: '👩🏻', boy1: '👦🏻', cake: '🧁' };
                if (av && AVATAR_MAP[av]) s.avatar = AVATAR_MAP[av];
            } catch (_) {}

            Cake.store.state = s;
            if (typeof Cake.saveState === 'function') Cake.saveState();
        } else if (typeof Cake.loadStateFromStorage === 'function') {
            Cake.store.state = Cake.loadStateFromStorage();
        }

        const Game = new Proxy({}, {
            get(target, prop) {
                if (prop === 'state') return Cake.store ? Cake.store.state : undefined;
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
            }
        });

        defineGlobal('Game', Game);
        console.log('🧩 [Shared] 父页面 Game 动态代理已挂载');

        if (typeof Cake.on === 'function') {
            Cake.on('refresh_ui', () => {
                if (typeof Cake.loadStateFromStorage === 'function') {
                    Cake.store.state = Cake.loadStateFromStorage();
                }
                if (typeof Cake.refreshPage === 'function') {
                    try { Cake.refreshPage(); } catch (_) {}
                }
            });
        }

        console.log('🧩 [Shared] 父页面共享层装载完毕');
    };

    initShared();
})();
