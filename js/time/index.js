// js/time/index.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    const MINUTES_PER_DAY = 24 * 60; // 1440 分钟

    // 跨天处理逻辑（高内聚，以后跨天要扣租金、刷新商品都在这里加）
    const handleNextDay = (daysPassed) => {
        const state = Cake.store.state;
        state.energy = Math.min(100, state.energy + 30 * daysPassed); // 每天恢复 30 体力
        Cake.addLog?.(`🌅 新的一天开始了（第 ${state.day} 天），恢复了部分体力。`);
        
        // 💡 扩展点：跨天时，你可以在这里触发好感事件、扣除店铺租金等
    };

    /**
     * 推进时间（核心方法）
     * @param {number} minutes 要推进的分钟数
     */
    const advanceTime = (minutes) => {
        const state = Cake.store.state;
        
        // 兼容旧存档：如果没有时间字段，默认 08:00
        if (state.hour === undefined) state.hour = 8;
        if (state.minute === undefined) state.minute = 0;

        let totalMins = state.hour * 60 + state.minute + minutes;
        let daysPassed = Math.floor(totalMins / MINUTES_PER_DAY);

        // 处理跨天
        if (daysPassed > 0) {
            totalMins = totalMins % MINUTES_PER_DAY;
            state.day += daysPassed;
            handleNextDay(daysPassed);
        }

        // 重新计算小时和分钟
        state.hour = Math.floor(totalMins / 60);
        state.minute = totalMins % 60;

        // 触发保存和页面刷新
        Cake.saveState?.();
        Cake.refreshPage?.();
    };

    /**
     * 获取格式化时间字符串 (例如 "08:05")
     */
    const getTimeString = () => {
        const state = Cake.store.state;
        const h = String(state.hour ?? 8).padStart(2, '0');
        const m = String(state.minute ?? 0).padStart(2, '0');
        return `${h}:${m}`;
    };

    /**
     * 获取当前时间段（早晨、中午、晚上等）
     */
    const getPeriodString = () => {
        const state = Cake.store.state;
        const h = state.hour ?? 8;
        if (h >= 5 && h < 9) return '🌅 清晨';
        if (h >= 9 && h < 12) return '☀️ 上午';
        if (h >= 12 && h < 14) return '🍱 中午';
        if (h >= 14 && h < 18) return '🌤️ 下午';
        if (h >= 18 && h < 22) return '🌙 晚上';
        return '🌌 深夜';
    };

    // 挂载到全局
    Cake.advanceTime = advanceTime;
    Cake.getTimeString = getTimeString;
    Cake.getPeriodString = getPeriodString;
})();
