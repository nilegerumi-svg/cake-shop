// js/core/effects.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    const AFF_THRESHOLDS = [20, 40, 60, 80, 100];

    const num = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    /* ==================== 事件效果结算 ==================== */

    const applyEventEffects = (ev) => {
        const state = Cake.store && Cake.store.state;
        if (!state || !ev) return;

        // 金额
        if (ev.money) {
            state.money = Math.max(0, num(state.money) + ev.money);
            if (ev.money > 0) {
                state.totalEarned = num(state.totalEarned) + ev.money;
            }
        }

        // 声望
        if (ev.rep) {
            state.reputation = Math.max(0, num(state.reputation) + ev.rep);
        }

        // 精力
        if (ev.energy) {
            state.energy = Math.max(0, Math.min(100, num(state.energy) + ev.energy));
        }

        // 食材
        if (ev.ing) {
            if (!state.ingredients || typeof state.ingredients !== 'object') {
                state.ingredients = {};
            }
            for (const k of Object.keys(ev.ing)) {
                state.ingredients[k] = Math.max(0, num(state.ingredients[k]) + ev.ing[k]);
            }
        }

        // 好感（只有已相遇的角色才加）
        if (state.characters && typeof state.characters === 'object' && Cake.CHARACTERS) {
            for (const cid of Object.keys(Cake.CHARACTERS)) {
                const c = state.characters[cid];
                if (ev[cid] && c && c.met) {
                    c.affection = Math.min(100, num(c.affection) + ev[cid]);
                }
            }
        }
    };

    /* ==================== 成就检查 ==================== */

    const checkAchievements = () => {
        const state = Cake.store && Cake.store.state;
        if (!state) return;
        if (!Array.isArray(Cake.ACHIEVEMENTS)) return;

        if (!state.achievements || typeof state.achievements !== 'object') {
            state.achievements = {};
        }

        for (const a of Cake.ACHIEVEMENTS) {
            if (!a || !a.id) continue;
            if (state.achievements[a.id]) continue;

            let passed = false;
            try {
                passed = typeof a.cond === 'function' ? !!a.cond() : false;
            } catch (err) {
                console.warn(`⚠️ [Effects] 成就条件执行失败: ${a.id}`, err);
                continue;
            }

            if (passed) {
                state.achievements[a.id] = true;
                Cake.addLog?.(`🏅 达成成就：${a.name}！`);
            }
        }
    };

    /* ==================== 好感事件检查 ==================== */

    const checkAffEvent = (cid, silent = false) => {
        const state = Cake.store && Cake.store.state;
        if (!state || !state.characters) return [];

        const s = state.characters[cid];
        const evts = Cake.AFF_EVENTS && Cake.AFF_EVENTS[cid];
        if (!s || !evts) return [];

        if (!Array.isArray(s.eventsTriggered)) {
            s.eventsTriggered = [];
        }
        s.affection = num(s.affection);

        const triggered = [];

        for (const t of AFF_THRESHOLDS) {
            if (s.affection >= t && !s.eventsTriggered.includes(t) && evts[t]) {
                s.eventsTriggered.push(t);
                const ev = evts[t];
                applyEventEffects(ev);
                triggered.push(ev);
            }
        }

        if (triggered.length === 0) return [];

        const charName = (Cake.CHARACTERS && Cake.CHARACTERS[cid] && Cake.CHARACTERS[cid].name) || cid;

        for (let i = 0; i < triggered.length; i++) {
            Cake.addLog?.(`💫 与${charName}的好感事件触发！`);
        }

        if (!silent && typeof Cake.showModal === 'function') {
            const body = triggered.map((ev) => `<p>${ev.text}</p>`).join('');
            Cake.showModal(`💫 ${charName} · 好感事件`, body);
        }

        checkAchievements();
        return triggered;
    };

    /* ==================== 挂载 ==================== */

    Object.assign(Cake, {
        applyEventEffects,
        checkAchievements,
        checkAffEvent,
    });
})();
