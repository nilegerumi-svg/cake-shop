// js/core/time_engine.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    /**
     * 时间流逝引擎
     * @param {Number} minutes 经过的分钟数
     */
    Cake.advanceTime = function (minutes) {
        if (!minutes || minutes <= 0) return;
        const state = Cake.store.state;
        const shop = state.shop;

        state.time.totalMinutesPassed += minutes;

        let currentMinsInDay = state.time.hour * 60 + state.time.minute;
        let targetMinsInDay = currentMinsInDay + minutes;

        // 1. 处理跨天（超过 24:00，即 1440 分钟）
        while (targetMinsInDay >= 1440) {
            targetMinsInDay -= 1440;
            state.time.day += 1;
            
            // --- 触发每日结算事件 ---
            Cake.triggerNewDayEvents(state);
        }

        // 2. 更新当前时间
        state.time.hour = Math.floor(targetMinsInDay / 60);
        state.time.minute = targetMinsInDay % 60;

        // 3. 检查是否需要自动打烊
        const nowMins = state.time.hour * 60 + state.time.minute;
        if (shop.isOpen && nowMins >= shop.closeTime) {
            shop.isOpen = false;
            Cake.addLog(`🌙 晚上 ${state.time.hour}:${String(state.time.minute).padStart(2, '0')}，店铺已自动打烊。`);
        }

        if (Cake.refreshPage) Cake.refreshPage();
    };

    // --- 每日跨天时的结算逻辑 ---
    Cake.triggerNewDayEvents = function (state) {
        // 1. 精力恢复
        state.energy = state.maxEnergy;
        
        // 2. 店铺日常维护（比如卫生度每天自然下降 10 点）
        state.shop.stats.cleanliness = Math.max(0, state.shop.stats.cleanliness - 10);

        // 3. 食材过期变质检测
        let rottenCount = 0;
        if (state.inventory && state.inventory.length > 0) {
            state.inventory.forEach(item => {
                if (state.time.day > item.expireDay && !item.isRotten) {
                    item.isRotten = true;
                    rottenCount++;
                }
            });
        }

        Cake.addLog(`☀️ 第 ${state.time.day} 天。精力已完全恢复。`);
        if (rottenCount > 0) {
            Cake.addLog(`🤢 有 ${rottenCount} 份食材因为过期而腐烂了！`);
        }
    };

    // 辅助：获取格式化时间字符串 (HH:MM)
    Cake.getFormattedTime = function () {
        const t = Cake.store.state.time;
        return `${String(t.hour).padStart(2, '0')}:${String(t.minute).padStart(2, '0')}`;
    };
})();
