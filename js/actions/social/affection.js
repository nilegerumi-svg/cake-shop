// js/actions/social/affection.js
(function () {
    'use strict';
    const Cake = window.Cake;

    // 确保数据结构存在
    const ensureCharState = (state, charId) => {
        if (!state.characters) state.characters = {};
        if (!state.characters[charId]) {
            state.characters[charId] = { met: false, affection: 0 };
        }
        return state.characters[charId];
    };

    // 👈 核心引擎 1：增加好感度（供随机事件调用）
    Cake.Social = Cake.Social || {};
    Cake.Social.addAffection = function (affObj) {
        const state = Cake.store.state;
        if (!state || !affObj) return;

        for (const [charId, amount] of Object.entries(affObj)) {
            const charData = Cake.CHARACTERS[charId];
            if (!charData) continue;

            const cs = ensureCharState(state, charId);
            
            // 如果还没相遇，就加不了好感
            if (!cs.met) continue;

            const oldAff = cs.affection;
            cs.affection = Math.max(0, cs.affection + amount);
            
            // 简单的日志提示
            const sign = amount > 0 ? '+' : '';
            Cake.addLog(`💕 ${charData.name} 的好感度 ${sign}${amount} (当前: ${cs.affection})`);

            // 检查是否触发了特定的好感事件（比如达到 20, 40, 60 等）
            Cake.Social.checkAffEvent(charId, oldAff, cs.affection);
        }
    };

    // 👈 核心引擎 2：检查是否触发好感里程碑事件
    Cake.Social.checkAffEvent = function (charId, oldAff, newAff) {
        const state = Cake.store.state;
        const events = Cake.AFF_EVENTS && Cake.AFF_EVENTS[charId];
        if (!events) return;

        // 遍历该角色配置的所有阈值（20, 40, 60...）
        for (const [thresholdStr, evt] of Object.entries(events)) {
            const threshold = Number(thresholdStr);
            // 如果跨过了这个阈值
            if (oldAff < threshold && newAff >= threshold) {
                // 应用事件奖励（金钱、声望、物品等）
                if (typeof Cake.applyEventEffects === 'function') {
                    Cake.applyEventEffects(evt); // 复用我们之前写的通用事件引擎
                }
                Cake.addLog(`✨ [羁绊深化] ${evt.text}`, 'success');
            }
        }
    };

    // 👈 核心引擎 3：跨天时检查是否有新角色登场
    Cake.Social.checkDailyMeet = function (state) {
        if (!Cake.MEETINGS) return;
        
        const day = state.time?.day;
        const charId = Cake.MEETINGS[day];
        if (!charId) return;

        const charData = Cake.CHARACTERS[charId];
        if (!charData) return;

        const cs = ensureCharState(state, charId);
        if (!cs.met) {
            cs.met = true;
            cs.affection = 10; // 初次相遇送 10 点好感
            Cake.addLog(`🌟 新角色登场：${charData.metText}`, 'success');
        }
    };
})();
