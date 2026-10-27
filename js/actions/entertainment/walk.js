// js/actions/entertainment/walk.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    const walk = (location) => {
        const locKey = location || 'home';
        const locConfig = Cake.LOCATIONS && Cake.LOCATIONS[locKey];
        const state = Cake.store.state;

        if (!locConfig) {
            Cake.addLog?.(`❌ 未知的地点：${locKey}`);
            Cake.refreshPage?.();
            return;
        }

        if (state.energy < locConfig.cost) {
            Cake.addLog?.(`😵 精力不足 ${locConfig.cost} 点，无法前往${locConfig.name}！`);
            Cake.refreshPage?.();
            return;
        }
        
        const beforeEnergy = state.energy;
        state.energy -= locConfig.cost;

        // 🌟 核心改动：呼叫地图监视器抽取事件
        const chosen = Cake.MapMonitor.checkWalkEvent(locKey, state);

        // 记录出发前的好感度
        const beforeAff = {};
        for (const [cid, cs] of Object.entries(state.characters)) {
            if (cs.met) beforeAff[cid] = cs.affection;
        }

        // 应用事件带来的效果（加钱、扣钱、加好感等）
        if (Cake.applyEventEffects && chosen) {
            Cake.applyEventEffects(chosen);
        }

        // 记录日志
        const delta = state.energy - beforeEnergy;
        const sign = delta >= 0 ? '+' : '';
        Cake.addLog?.(`🚶‍♀️ 在【${locConfig.name}】（⚡${sign}${delta}）：${chosen?.text || ''}`);

        // 检查好感里程碑
        const triggeredCid = Object.entries(state.characters).find(
            ([cid, cs]) => cs.met && cs.affection !== beforeAff[cid]
        )?.[0] ?? null;

        if (triggeredCid && Cake.checkAffEvent) Cake.checkAffEvent(triggeredCid);
        if (Cake.checkAchievements) Cake.checkAchievements();

        Cake.saveState?.();
        Cake.refreshPage?.();
    };

    Cake.walk = walk;
})();
