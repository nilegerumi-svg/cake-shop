// js/data/achievements/index.js
import './sales.js';
import './reputation.js';
import './recipes.js';
import './social.js';
import './shop.js';

(function () {
    'use strict';
    window.Cake = window.Cake || {};
    const Cake = window.Cake;

    // 1. 把各个模块的成就拼起来
    Cake.ACHIEVEMENTS = Object.freeze([
        ...(Cake.ACH_SALES || []),
        ...(Cake.ACH_REP || []),
        ...(Cake.ACH_RECIPES || []),
        ...(Cake.ACH_SOCIAL || []),
        ...(Cake.ACH_SHOP || [])
    ]);

    // 2. 提供一个全局的“成就检测引擎”
    // 以后在时间流逝、卖出蛋糕、好感提升时，只要调用 Cake.checkAchievements()，就能全盘扫描一次
    Cake.checkAchievements = function () {
        const state = Cake.store?.state;
        if (!state) return;

        if (!state.achievements) state.achievements = {};
        let unlockedAny = false;

        for (const ach of Cake.ACHIEVEMENTS) {
            // 如果已经解锁，跳过
            if (state.achievements[ach.id]) continue;

            // 如果没有解锁，执行条件判断
            try {
                if (ach.cond()) {
                    state.achievements[ach.id] = true; // 标记为已解锁
                    unlockedAny = true;
                    
                    // 弹日志通知
                    if (Cake.addLog) {
                        Cake.addLog(`🏅 解锁成就：【${ach.name}】 ${ach.icon}`, 'success');
                    }
                }
            } catch (err) {
                console.warn(`[Achievements] 检测 ${ach.id} 失败:`, err);
            }
        }

        // 如果有新成就，触发刷新
        if (unlockedAny && Cake.emit) {
            Cake.emit('refresh_ui');
        }
    };

    console.log('🏅 [Data/Achievements] 成就系统装载完毕，共', Cake.ACHIEVEMENTS.length, '个');
})();
