// js/core/effects.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    // 好感事件触发的阈值档位
    const AFF_THRESHOLDS = [20, 40, 60, 80, 100];

    /* ==================== 事件效果结算 ==================== */

    const applyEventEffects = (ev) => {
        const state = Cake.store.state;
        const CHARACTERS = Cake.CHARACTERS;

        if (ev.money) {
            state.money = Math.max(0, state.money + ev.money);
            if (ev.money > 0) state.totalEarned += ev.money;
        }

        if (ev.rep) state.reputation = Math.max(0, state.reputation + ev.rep);

        if (ev.energy) state.energy = Math.max(0, Math.min(100, state.energy + ev.energy));

        if (ev.ing) {
            for (const k of Object.keys(ev.ing)) {
                state.ingredients[k] = Math.max(0, (state.ingredients[k] || 0) + ev.ing[k]);
            }
        }

        // 只有已相遇的角色才加好感
        for (const cid of Object.keys(CHARACTERS)) {
            const c = state.characters[cid];
            if (ev[cid] && c && c.met) {
                c.affection = Math.min(100, c.affection + ev[cid]);
            }
        }
    };

    /* ==================== 成就检查 ==================== */

    const checkAchievements = () => {
        const state = Cake.store.state;

        for (const a of Cake.ACHIEVEMENTS) {
            if (!state.achievements[a.id] && a.cond()) {
                state.achievements[a.id] = true;
                Cake.addLog(`🏅 达成成就：${a.name}！`);
            }
        }
    };

    /* ==================== 好感事件检查 ==================== */
    // silent=true 时不弹模态框，直接返回触发的 ev 数组，
    // 方便 openShop 把好感事件合并进「今日营业」弹窗里。
    const checkAffEvent = (cid, silent = false) => {
        const state = Cake.store.state;
        const s = state.characters[cid];
        const evts = Cake.AFF_EVENTS[cid];
        if (!s || !evts) return [];

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

        for (const _ of triggered) {
            Cake.addLog(`💫 与${Cake.CHARACTERS[cid].name}的好感事件触发！`);
        }

        if (!silent) {
            const body = triggered.map((ev) => `<p>${ev.text}</p>`).join('');
            Cake.showModal(`💫 ${Cake.CHARACTERS[cid].name} · 好感事件`, body);
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
