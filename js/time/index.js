// js/time/index.js
(() => {
    'use strict';

    // 跨域守卫
    const getCake = () => {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) {
                return window.parent.Cake;
            }
        } catch (_) { /* 跨域忽略 */ }
        return window.Cake || null;
    };

    const Cake = getCake();
    if (!Cake) return;

    // 防重复挂载
    if (Cake.__timeModuleLoaded) {
        console.log('🕒 [Time] 时间模块已加载，跳过重复初始化');
        return;
    }
    Cake.__timeModuleLoaded = true;

    const MINUTES_PER_DAY = 24 * 60;

    const handleNextDay = (daysPassed) => {
        const state = Cake.store.state;
        state.energy = Math.min(100, state.energy + 30 * daysPassed);
        Cake.addLog?.(`🌅 新的一天开始了！（第 ${state.day} 天），恢复了全部体力。`);
        // 🟡 扩展点：跨天时触发好感事件、刷新货架等
    };

    const advanceTime = (minutes) => {
        const m = Number(minutes);
        if (!Number.isFinite(m) || m < 0) {
            console.warn('[Time] 非法时间推进被拒绝:', minutes);
            return;
        }

        const state = Cake.store.state;

        if (state.hour === undefined) state.hour = 8;
        if (state.minute === undefined) state.minute = 0;

        let totalMins = state.hour * 60 + state.minute + m;
        let daysPassed = Math.floor(totalMins / MINUTES_PER_DAY);

        if (daysPassed > 0) {
            totalMins = totalMins % MINUTES_PER_DAY;
            state.day += daysPassed;
            handleNextDay(daysPassed);
        }

        state.hour = Math.floor(totalMins / 60);
        state.minute = totalMins % 60;

        Cake.saveState?.();
        Cake.refreshPage?.();
    };

    const getTimeString = () => {
        const state = Cake.store.state;
        const h = String(state.hour ?? 8).padStart(2, '0');
        const m = String(state.minute ?? 0).padStart(2, '0');
        return `${h}:${m}`;
    };

    const getPeriodString = () => {
        const h = Cake.store.state.hour ?? 8;
        if (h >= 5 && h < 9) return '🌅 清晨';
        if (h >= 9 && h < 12) return '☀️ 上午';
        if (h >= 12 && h < 14) return '🍚 中午';
        if (h >= 14 && h < 18) return '🌤️ 下午';
        if (h >= 18 && h < 22) return '🌙 晚上';
        return '🌌 深夜';
    };

    Cake.advanceTime = advanceTime;
    Cake.getTimeString = getTimeString;
    Cake.getPeriodString = getPeriodString;
})();
