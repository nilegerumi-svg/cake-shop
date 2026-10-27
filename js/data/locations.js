// js/entertainment/walk.js
(() => {
    'use strict';
    window.Cake = window.Cake || {};
    const Cake = window.Cake;

    const walk = (location) => {
        const locKey = location || 'home';
        const locConfig = Cake.LOCATIONS[locKey];
        const state = Cake.store.state;

        if (!locConfig) return;

        // 扣除基础体力
        if (state.energy < locConfig.cost) {
            Cake.addLog?.(`😵 精力不足 ${locConfig.cost} 点，无法前往${locConfig.name}！`);
            Cake.refreshPage?.();
            return;
        }

        const before = state.energy;
        state.energy -= locConfig.cost;

        // 抽取该地点专属的事件池
        const pool = locConfig.events || [];
        const chosen = pool.length > 0
            ? pool[Math.floor(Math.random() * pool.length)]
            : { text: '你四处走了走，但什么也没有发生。' };

        // 记录好感（用于后续判断是否触发好感事件）
        const beforeAff = {};
        for (const [cid, cs] of Object.entries(state.characters)) {
            if (cs.met) beforeAff[cid] = cs.affection;
        }

        // 应用事件带来的各种数值变化（比如遇到角色加减好感、事件带钱等）
        if (Cake.applyEventEffects && chosen !== undefined) {
            Cake.applyEventEffects(chosen);
        }

        // 记录日志
        const delta = state.energy - before;
        const sign = delta >= 0 ? '+' : '';
        
        Cake.addLog?.(`🚶‍♀️ 在【${locConfig.name}】（⚡${sign}${delta}）：${chosen.text || ''}`);

        // 触发好感事件与成就
        const triggeredCid = Object.entries(state.characters).find(
            ([cid, cs]) => cs.met && cs.affection !== beforeAff[cid]
        )?.[0] ?? null;

        if (triggeredCid) Cake.checkAffEvent?.(triggeredCid);
        Cake.checkAchievements?.();

        Cake.saveState?.();
        Cake.refreshPage?.();
    };

    Cake.walk = walk;
})();
