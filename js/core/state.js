window.Cake = window.Cake || {};
(function () {
    /* ========= 兜底 bridge：pages 没加载 bridge.js 时自动创建 ========= */
    if (!window.Cake.bridge) {
        var inIframe = window.parent !== window;
        var instanceId = (inIframe ? 'f:' : 'h:') +
                         Math.random().toString(36).slice(2, 10) +
                         Date.now().toString(36);
        var stateListeners = [];

        window.addEventListener('message', function (e) {
            var msg = e.data;
            if (!msg || typeof msg !== 'object' || !msg.type) return;
            if (msg.sourceId && msg.sourceId === instanceId) return;
            if (inIframe && msg.type === 'state-sync') {
                for (var i = 0; i < stateListeners.length; i++) {
                    try { stateListeners[i](msg.sourceId); } catch (_) {}
                }
            }
        });

        window.Cake.bridge = {
            inIframe: inIframe,
            instanceId: instanceId,
            onStateChanged: function (fn) {
                if (typeof fn === 'function') stateListeners.push(fn);
            },
            setHostBroadcaster: function () {},
            notifyStateChanged: function () {
                if (!inIframe) return;
                try {
                    window.parent.postMessage(
                        { type: 'state-changed', sourceId: instanceId }, '*');
                } catch (_) {}
            }
        };
    }

    /* ========= 以下是你原来的 state 逻辑，唯一改动在 saveState ========= */
    var SAVE_KEY = 'cakeShopSave_v1';
    var SAVE_VERSION = 1;

    function defaultState() {
        return {
            version: SAVE_VERSION,
            playerName: '小甜', shopName: '甜蜜物语', avatar: '👩‍🍳',
            money: 500, energy: 80, day: 1, reputation: 0,
            shopLevel: 1, decoration: 0, priceRate: 1.0,
            ingredients: { flour: 6, egg: 6, sugar: 6, butter: 2, cream: 2, fruit: 1, chocolate: 1, nuts: 1 },
            cakes: {},
            recipes: { '海绵蛋糕': true, '草莓奶油蛋糕': true },
            characters: {
                linmo:  { met: false, affection: 0, eventsTriggered: [] },
                guyan:  { met: false, affection: 0, eventsTriggered: [] },
                sumu:   { met: false, affection: 0, eventsTriggered: [] },
                xiazhi: { met: false, affection: 0, eventsTriggered: [] },
            },
            totalCakes: 0, totalEarned: 0,
            log: [], achievements: {}, giftPanelFor: null,
        };
    }

    function migrateSave(saved) { return saved; }

    function mergeWithDefault(raw) {
        var def = defaultState();
        if (!raw || typeof raw !== 'object') return def;

        var saved = raw;
        if ((saved.version || 0) < SAVE_VERSION) saved = migrateSave(saved);

        var s = Object.assign({}, def, saved);

        s.characters = Object.assign({}, saved.characters || {});
        for (var k in def.characters) {
            if (!Object.prototype.hasOwnProperty.call(def.characters, k)) continue;
            var char = Object.assign({}, def.characters[k], s.characters[k] || {});
            if (!Array.isArray(char.eventsTriggered)) char.eventsTriggered = [];
            char.affection = Number.isFinite(Number(char.affection))
                ? Math.max(0, Math.min(100, Number(char.affection)))
                : def.characters[k].affection;
            char.met = !!char.met;
            s.characters[k] = char;
        }

        s.ingredients = Object.assign({}, def.ingredients, saved.ingredients || {});
        s.cakes       = Object.assign({}, def.cakes,       saved.cakes       || {});
        s.recipes     = Object.assign({}, def.recipes,     saved.recipes     || {});

        var RECIPES = window.Cake.RECIPES;
        var k2, v2;
        for (k2 in s.cakes) {
            if (!Object.prototype.hasOwnProperty.call(s.cakes, k2)) continue;
            v2 = Number(s.cakes[k2]);
            if (!RECIPES[k2] || !Number.isFinite(v2) || v2 <= 0) delete s.cakes[k2];
            else s.cakes[k2] = Math.floor(v2);
        }
        for (k2 in s.recipes) {
            if (!Object.prototype.hasOwnProperty.call(s.recipes, k2)) continue;
            if (!RECIPES[k2]) delete s.recipes[k2];
            else s.recipes[k2] = !!s.recipes[k2];
        }
        for (k2 in s.ingredients) {
            if (!Object.prototype.hasOwnProperty.call(s.ingredients, k2)) continue;
            v2 = Number(s.ingredients[k2]);
            if (!Number.isFinite(v2) || v2 < 0) s.ingredients[k2] = 0;
            else s.ingredients[k2] = Math.floor(v2);
        }

        s.money       = Number.isFinite(Number(s.money))       ? Math.max(0, Number(s.money)) : def.money;
        s.energy      = Number.isFinite(Number(s.energy))      ? Math.max(0, Math.min(100, Number(s.energy))) : def.energy;
        s.reputation  = Number.isFinite(Number(s.reputation))  ? Math.max(0, Number(s.reputation)) : def.reputation;
        s.day         = Number.isFinite(Number(s.day))         ? Math.max(1, Math.floor(Number(s.day))) : def.day;
        s.shopLevel   = Number.isFinite(Number(s.shopLevel))   ? Math.max(1, Math.min(5, Math.floor(Number(s.shopLevel)))) : def.shopLevel;
        s.decoration  = Number.isFinite(Number(s.decoration))  ? Math.max(0, Math.floor(Number(s.decoration))) : def.decoration;
        s.totalCakes  = Number.isFinite(Number(s.totalCakes))  ? Math.max(0, Math.floor(Number(s.totalCakes))) : def.totalCakes;
        s.totalEarned = Number.isFinite(Number(s.totalEarned)) ? Math.max(0, Number(s.totalEarned)) : def.totalEarned;
        s.priceRate   = Number.isFinite(Number(s.priceRate)) && Number(s.priceRate) > 0 ? Number(s.priceRate) : def.priceRate;

        if (!Array.isArray(s.log)) {
            s.log = def.log;
        } else {
            var newLog = [];
            for (var i = 0; i < s.log.length; i++) {
                var l = s.log[i];
                if (l && typeof l === 'object' && typeof l.text === 'string') {
                    newLog.push({
                        day: Number.isFinite(Number(l.day)) ? Math.max(1, Math.floor(Number(l.day))) : def.day,
                        text: l.text
                    });
                }
            }
            s.log = newLog.slice(-60);
        }

        if (!s.achievements || typeof s.achievements !== 'object' || Array.isArray(s.achievements)) {
            s.achievements = {};
        }
        if (s.giftPanelFor && (!s.characters[s.giftPanelFor] || !s.characters[s.giftPanelFor].met)) {
            s.giftPanelFor = null;
        }
        s.version = SAVE_VERSION;
        return s;
    }

    function hasSave() {
        try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
    }

    function loadStateFromStorage() {
        try {
            var d = localStorage.getItem(SAVE_KEY);
            if (d) return mergeWithDefault(JSON.parse(d));
        } catch (e) {}
        return defaultState();
    }

    function saveState() {
        try {
            localStorage.setItem(SAVE_KEY, JSON.stringify(window.Cake.store.state));
        } catch (e) { return false; }
        // ★ 唯一改动：写盘成功后广播
        if (window.Cake.bridge && window.Cake.bridge.notifyStateChanged) {
            window.Cake.bridge.notifyStateChanged();
        }
        return true;
    }

    window.Cake.SAVE_KEY = SAVE_KEY;
    window.Cake.SAVE_VERSION = SAVE_VERSION;
    window.Cake.defaultState = defaultState;
    window.Cake.mergeWithDefault = mergeWithDefault;
    window.Cake.hasSave = hasSave;
    window.Cake.loadStateFromStorage = loadStateFromStorage;
    window.Cake.saveState = saveState;
})();
