// js/core/state.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    /* ==================== 兜底 bridge ==================== */
    /* pages 没加载 bridge.js 时自动创建 */

    if (!Cake.bridge) {
        const inIframe = window.parent !== window;
        const instanceId =
            `${inIframe ? 'f:' : 'h:'}${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
        const stateListeners = [];

        window.addEventListener('message', (e) => {
            const msg = e.data;
            if (!msg || typeof msg !== 'object' || !msg.type) return;
            if (msg.sourceId && msg.sourceId === instanceId) return;
            if (inIframe && msg.type === 'state-sync') {
                for (const listener of stateListeners) {
                    try { listener(msg.sourceId); } catch (_) { /* ignore */ }
                }
            }
        });

        Cake.bridge = {
            inIframe,
            instanceId,
            onStateChanged: (fn) => {
                if (typeof fn === 'function') stateListeners.push(fn);
            },
            setHostBroadcaster: () => {},
            notifyStateChanged: () => {
                if (!inIframe) return;
                try {
                    window.parent.postMessage({ type: 'state-changed', sourceId: instanceId }, '*');
                } catch (_) { /* ignore */ }
            },
        };
    }

    /* ==================== 存档常量与默认状态 ==================== */

    const SAVE_KEY = 'cakeShopSave_v1';
    const SAVE_VERSION = 1;

    const defaultState = () => ({
        version: SAVE_VERSION,
        playerName: '小甜',
        shopName: '甜蜜物语',
        avatar: '👩‍🍳',
        money: 500,
        energy: 80,
        day: 1,
        hour:8,
        minute:0,
        reputation: 0,
        shopLevel: 1,
        decoration: 0,
        priceRate: 1.0,
        ingredients: { flour: 6, egg: 6, sugar: 6, butter: 2, cream: 2, fruit: 1, chocolate: 1, nuts: 1 },
        cakes: {},
        recipes: { '海绵蛋糕': true, '草莓奶油蛋糕': true },
        characters: {
            linmo:  { met: false, affection: 0, eventsTriggered: [] },
            guyan:  { met: false, affection: 0, eventsTriggered: [] },
            sumu:   { met: false, affection: 0, eventsTriggered: [] },
            xiazhi: { met: false, affection: 0, eventsTriggered: [] },
        },
        totalCakes: 0,
        totalEarned: 0,
        log: [],
        achievements: {},
        giftPanelFor: null,
    });

    const migrateSave = (saved) => {
        let s = saved;
        const version = Number(s && s.version) || 0;

        // 逐级迁移：旧版本 -> 当前版本
        if (version < 1) {
            // 预留：v0 -> v1 的字段补齐逻辑
            // 例：s.hour = Number.isFinite(Number(s.hour)) ? s.hour : 8;
        }

        // 后续有新版本时，按 if (version < 2) {...} 依次往上加
        return s;
    };

    /* ==================== 工具：能否转成有限数字 ==================== */

    // 与原写法 Number.isFinite(Number(v)) 完全等价
    const isNum = (v) => Number.isFinite(Number(v));

    /* ==================== 存档合并与校验 ==================== */

    const mergeWithDefault = (raw) => {
        const def = defaultState();
        if (!raw || typeof raw !== 'object') return def;

        let saved = raw;
        if ((saved.version || 0) < SAVE_VERSION) saved = migrateSave(saved);

        const s = { ...def, ...saved };

        /* --- 角色数据：只保留已知角色，逐个与默认值合并并校验 --- */
        s.characters = {};
        for (const k of Object.keys(def.characters)) {
            const src = (saved.characters && saved.characters[k]) || {};
            const char = { ...def.characters[k], ...src };
            if (!Array.isArray(char.eventsTriggered)) char.eventsTriggered = [];
            char.affection = Number.isFinite(Number(char.affection))
                ? Math.max(0, Math.min(100, Number(char.affection)))
                : def.characters[k].affection;
            char.met = !!char.met;
            s.characters[k] = char;
        }

        /* --- 食材 / 蛋糕 / 配方：与默认值合并 --- */
        s.ingredients = { ...def.ingredients, ...(saved.ingredients || {}) };
        s.cakes       = { ...def.cakes,       ...(saved.cakes       || {}) };
        s.recipes     = { ...def.recipes,     ...(saved.recipes     || {}) };

        /* --- 清理非法蛋糕与配方 --- */
        const RECIPES = Cake.RECIPES;

        for (const k of Object.keys(s.cakes)) {
            const v = Number(s.cakes[k]);
            if (!RECIPES[k] || !Number.isFinite(v) || v <= 0) delete s.cakes[k];
            else s.cakes[k] = Math.floor(v);
        }

        for (const k of Object.keys(s.recipes)) {
            if (!RECIPES[k]) delete s.recipes[k];
            else s.recipes[k] = !!s.recipes[k];
        }

        for (const k of Object.keys(s.ingredients)) {
            const v = Number(s.ingredients[k]);
            if (!Number.isFinite(v) || v < 0) s.ingredients[k] = 0;
            else s.ingredients[k] = Math.floor(v);
        }

        /* --- 数值字段夹紧 --- */
        s.money       = isNum(s.money)       ? Math.max(0, Number(s.money)) : def.money;
        s.energy      = isNum(s.energy)      ? Math.max(0, Math.min(100, Number(s.energy))) : def.energy;
        s.reputation  = isNum(s.reputation)  ? Math.max(0, Number(s.reputation)) : def.reputation;
        s.day         = isNum(s.day)         ? Math.max(1, Math.floor(Number(s.day))) : def.day;
        s.hour        = isNum(s.hour)        ? Math.max(0, Math.min(23, Math.floor(Number(s.hour)))) : 8;
        s.minute      = isNum(s.minute)      ? Math.max(0, Math.min(59, Math.floor(Number(s.minute)))) : 0;
        s.shopLevel   = isNum(s.shopLevel)   ? Math.max(1, Math.min(5, Math.floor(Number(s.shopLevel)))) : def.shopLevel;
        s.decoration  = isNum(s.decoration)  ? Math.max(0, Math.floor(Number(s.decoration))) : def.decoration;
        s.totalCakes  = isNum(s.totalCakes)  ? Math.max(0, Math.floor(Number(s.totalCakes))) : def.totalCakes;
        s.totalEarned = isNum(s.totalEarned) ? Math.max(0, Number(s.totalEarned)) : def.totalEarned;
        s.priceRate   = isNum(s.priceRate) && Number(s.priceRate) > 0 ? Number(s.priceRate) : def.priceRate;

        /* --- 日志清洗：只保留合法条目，最多 60 条 --- */
        if (!Array.isArray(s.log)) {
            s.log = def.log;
        } else {
            const newLog = [];
            for (const l of s.log) {
                if (l && typeof l === 'object' && typeof l.text === 'string') {
                    newLog.push({
                        day: Number.isFinite(Number(l.day)) ? Math.max(1, Math.floor(Number(l.day))) : def.day,
                        text: l.text,
                    });
                }
            }
            s.log = newLog.slice(-60);
        }

        /* --- 成就与送礼面板状态 --- */
        if (!s.achievements || typeof s.achievements !== 'object' || Array.isArray(s.achievements)) {
            s.achievements = {};
        }
        if (s.giftPanelFor && (!s.characters[s.giftPanelFor] || !s.characters[s.giftPanelFor].met)) {
            s.giftPanelFor = null;
        }

        s.version = SAVE_VERSION;
        return s;
    };

    /* ==================== 读写存档 ==================== */

    const hasSave = () => {
        try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
    };

    const loadStateFromStorage = () => {
        try {
            const d = localStorage.getItem(SAVE_KEY);
            if (d) return mergeWithDefault(JSON.parse(d));
        } catch (e) { /* 损坏的存档按新档处理 */ }
        return defaultState();
    };

    const saveState = () => {
        try {
            localStorage.setItem(SAVE_KEY, JSON.stringify(Cake.store.state));
        } catch (e) {
            return false;
        }
        // 写盘成功后广播，通知宿主与其它 iframe
        if (Cake.bridge && Cake.bridge.notifyStateChanged) {
            Cake.bridge.notifyStateChanged();
        }
        return true;
    };

    /* ==================== 挂载 ==================== */

    Object.assign(Cake, {
        SAVE_KEY,
        SAVE_VERSION,
        defaultState,
        mergeWithDefault,
        hasSave,
        loadStateFromStorage,
        saveState,
    });
})();
