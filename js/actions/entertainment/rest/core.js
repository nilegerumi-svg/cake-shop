// js/entertainment/rest/core.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    Cake.RestSys = {
        // 通用小憩
        nap: ({ energy = 0, time = 0, logs = [] }) => {
            const state = Cake.store.state;
            if (state.energy >= 100) {
                Cake.addLog?.('😴 精力已经全满啦，不需要休息。');
                Cake.refreshPage?.();
                return;
            }

            const before = state.energy;
            state.energy = Math.min(100, state.energy + energy);
            const actual = state.energy - before;

            // 输出所有日志
            logs.forEach(msg => Cake.addLog?.(msg));
            Cake.addLog?.(`🛏️ 小憩结束，精力 +${actual}（当前${state.energy}）`);
            
            if (typeof Cake.advanceTime === 'function') Cake.advanceTime(time);
            else { Cake.saveState?.(); Cake.refreshPage?.(); }
        },

        // 通用睡觉
        sleep: ({ time = 0, logs = [] }) => {
            const state = Cake.store.state;
            
            logs.forEach(msg => Cake.addLog?.(msg));
            Cake.addLog?.(`🌅 你醒了过来，精力全满！`);
            
            state.energy = 100; // 睡醒回满

            if (typeof Cake.advanceTime === 'function') Cake.advanceTime(time);
            else { Cake.saveState?.(); Cake.refreshPage?.(); }
        }
    };
})();
