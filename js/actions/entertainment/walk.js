// js/entertainment/walk.js
(() => {
    'use strict';
    window.Cake = window.Cake || {};
    const Cake = window.Cake;

    const walk = (location) => {
        const locKey = location || 'home';
        const locConfig = Cake.LOCATIONS && Cake.LOCATIONS[locKey];
        const state = Cake.store.state;

        // 如果地点不存在，直接返回
        if (!locConfig) {
            Cake.addLog?.(`❌ 未知的地点：${locKey}`);
            Cake.refreshPage?.();
            return;
        }

        // 扣除体力
        if (state.energy < locConfig.cost) {
            Cake.addLog?.(`😵 精力不足 ${locConfig.cost} 点，无法前往${locConfig.name}！`);
            Cake.refreshPage?.();
            return;
        }
        
        const beforeEnergy = state.energy;
        state.energy -= locConfig.cost;

        // 合并事件池：通用事件 + 该地点专属事件
        const commonPool = Cake.COMMON_WALK_EVENTS || [];
        const mapEvents = locConfig.events || [];
        const fullPool = [...commonPool, ...mapEvents];

        // 抽取事件
        const chosen = fullPool.length > 0
            ? fullPool[Math.floor(Math.random() * fullPool.length)]
            : { text: '你四处走了走，但什么也没有发生。' };

        // 记录出发前的好感度，用于判断这次事件是否增加了特定角色的好感
        const beforeAff = {};
        for (const [cid, cs] of Object.entries(state.characters)) {
            if (cs.met) beforeAff[cid] = cs.affection;
        }

        // 应用事件带来的效果（加钱、扣钱、加好感、加食材等）
        if (Cake.applyEventEffects) {
            Cake.applyEventEffects(chosen);
        }

        // 记录日志
        const delta = state.energy - beforeEnergy;
        const sign = delta >= 0 ? '+' : '';
        Cake.addLog?.(`🚶‍♀️ 在【${locConfig.name}】（⚡${sign}${delta}）：${chosen.text || ''}`);

        // 检查是否有角色因为这次事件触发了好感里程碑
        const triggeredCid = Object.entries(state.characters).find(
            ([cid, cs]) => cs.met && cs.affection !== beforeAff[cid]
        )?.[0] ?? null;

        if (triggeredCid && Cake.checkAffEvent) Cake.checkAffEvent(triggeredCid);
        if (Cake.checkAchievements) Cake.checkAchievements();

        // 保存并刷新页面
        Cake.saveState?.();
        Cake.refreshPage?.();
    };

    // 挂载到全局
    Cake.walk = walk;
})();
