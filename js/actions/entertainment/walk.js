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

        if (state.energy < locConfig.cost) {
            Cake.addLog?.(`😵 精力不足 ${locConfig.cost} 点，无法前往${locConfig.name}！`);
            Cake.refreshPage?.();
            return;
        }

        const before = state.energy;
        state.energy -= locConfig.cost;

        // 核心修改：合并【通用事件】与【地点专属事件】
        const commonPool = Cake.COMMON_WALK_EVENTS || [];
        const mapEvents = locConfig.events || [];
        const fullPool = [...commonPool, ...mapEvents];

        const chosen = fullPool.length > 0
            ? fullPool[Math.floor(Math.random() * fullPool.length)]
            : { text: '你四处走了走，但什么也没有发生。' };

        // 记录好感
        const beforeAff = {};
        for (const [cid, cs] of Object.entries(state.characters)) {
            if (cs.met) beforeAff[cid] = cs.affection;
        }

        // 结算效果
        if (Cake.applyEventEffects && chosen !== undefined) {
            Cake.applyEventEffects(chosen);
        }

        // 日志
        const delta = state.energy - before;
        const sign = delta >= 0 ? '+' : '';
        
        Cake.addLog?.(`🚶‍♀️ 在【${locConfig.name}】（⚡${sign}${delta}）：${chosen.text || ''}`);

        // 触发好感与成就
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
