// js/core/time_engine.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    Cake.advanceTime = function (minutes) {
        if (!minutes || minutes <= 0) return;
        const state = Cake.store.state;

        state.time.totalMinutes += minutes;
        let currentMins = state.time.hour * 60 + state.time.minute;
        currentMins += minutes;

        // 处理跨天
        while (currentMins >= 1440) {
            currentMins -= 1440;
            state.time.day += 1;
            
            // 新的一天：精力回满，卫生度下降
            state.energy = state.maxEnergy;
            state.shop.stats.cleanliness = Math.max(0, state.shop.stats.cleanliness - 10);
            
            Cake.addLog(`☀️ 第 ${state.time.day} 天开始了，精力已恢复。`);
        }

        // 更新当前时间
        state.time.hour = Math.floor(currentMins / 60);
        state.time.minute = currentMins % 60;

        // 检查是否到了打烊时间
        if (state.shop.isOpen && currentMins >= state.shop.closeTime) {
            state.shop.isOpen = false;
            Cake.addLog(`🌙 晚上 ${state.time.hour}:00 了，店铺自动打烊。`);
        }
    };
})();
