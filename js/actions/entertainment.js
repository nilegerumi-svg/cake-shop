// js/actions/entertainment.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    /* ==================== 常量 ==================== */

    const REST_GAIN = 40;
    const WALK_ENERGY_COST = 8;

    const LOCATION_NAMES = {
        home: '家园周围',
        park: '街心公园',
        street: '商业街',
        river: '河边',
    };

    /* ==================== 休息 ==================== */

    const rest = () => {
        const state = Cake.store.state;

        if (state.energy >= 100) {
            if (Cake.addLog) Cake.addLog('😴 精力已经全满啦，不需要休息。');
            if (Cake.refreshPage) Cake.refreshPage();
            return;
        }

        const before = state.energy;
        state.energy = Math.min(100, state.energy + REST_GAIN);
        const gain = state.energy - before;

        if (Cake.addLog) {
            Cake.addLog(`😴 你休息了一下，精力 +${gain}（当前${state.energy}）`);
        }

        // 保存状态并刷新页面
        if (Cake.saveState) Cake.saveState();
        if (Cake.refreshPage) Cake.refreshPage();
    };

    /* ==================== 散步：事件池筛选 ==================== */

    // 过滤掉涉及「尚未相遇角色」的事件；全部被过滤则退回原始事件池
    const buildEventPool = (state, WALK_EVENTS, CHARACTERS) => {
        const charIds = Object.keys(CHARACTERS);

        const evPool = WALK_EVENTS.filter((ev) =>
            !charIds.some((cid) => {
                const ch = state.characters[cid];
                return ev[cid] && (!ch || !ch.met);
            })
        );

        return evPool.length > 0 ? evPool : WALK_EVENTS;
    };

    /* ==================== 散步：地点奖励 ==================== */

    const applyLocationBonus = (state, location) => {
        switch (location) {
            case 'park':
                state.reputation = (state.reputation || 0) + 2;
                return '【街心公园】声望 +2。';
            case 'street':
                state.money = (state.money || 0) + 15;
                return '【商业街】金币 +15。';
            case 'river':
                state.energy = Math.min(100, state.energy + 3);
                return '【河边】体力额外恢复了 3 点。';
            default:
                return '【家园周围】熟悉的小路，让人感到安心。';
        }
    };

    /* ==================== 散步主流程 ==================== */

    const walk = (location) => {
        // 保留 `||` 而非默认参数：传 '' 时原逻辑会回落到 home，默认参数不会
        const loc = location || 'home';
        const state = Cake.store.state;

        if (state.energy < WALK_ENERGY_COST) {
            if (Cake.addLog) Cake.addLog('😵 精力不足 8 点，无法出门散步！');
            if (Cake.refreshPage) Cake.refreshPage();
            return;
        }

        const before = state.energy;
        state.energy -= WALK_ENERGY_COST; // 固定扣除 8 点体力

        // 1. 抽取事件
        const CHARACTERS = Cake.CHARACTERS || {};
        const WALK_EVENTS = Cake.WALK_EVENTS || [];

        const pool = buildEventPool(state, WALK_EVENTS, CHARACTERS);
        const chosen = pool.length > 0
            ? pool[Math.floor(Math.random() * pool.length)]
            : { text: '安静地走了一圈。' };

        // 记录好感（用于判断本次事件是否触发了已相遇角色的好感变化）
        const beforeAff = {};
        for (const [cid, cs] of Object.entries(state.characters)) {
            if (cs.met) beforeAff[cid] = cs.affection;
        }

        // 应用原版事件效果（chosen 恒不为 undefined，此处与原文一致保留判断）
        if (Cake.applyEventEffects && chosen !== undefined) {
            Cake.applyEventEffects(chosen);
        }

        // 2. 地点数值奖励
        const extraLog = applyLocationBonus(state, loc);

        // 3. 写日志
        const delta = state.energy - before;
        const sign = delta >= 0 ? '+' : '';
        const locName = LOCATION_NAMES[loc] || '附近';

        if (Cake.addLog) {
            Cake.addLog(
                `🚶‍♀️ 去${locName}散步（⚡${sign}${delta}）：${chosen.text || ''} ${extraLog}`
            );
        }

        // 4. 触发好感与成就
        const triggeredCid =
            Object.entries(state.characters).find(
                ([cid, cs]) => cs.met && cs.affection !== beforeAff[cid]
            )?.[0] ?? null;

        if (triggeredCid && Cake.checkAffEvent) Cake.checkAffEvent(triggeredCid);
        if (Cake.checkAchievements) Cake.checkAchievements();

        // 5. 保存并刷新
        if (Cake.saveState) Cake.saveState();
        if (Cake.refreshPage) Cake.refreshPage();
    };

    /* ==================== 挂载 ==================== */

    Object.assign(Cake, { rest, walk });
})();
