// js/entertainment/rest/core.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    Cake.RestSys = {
        // 通用小憩
        nap: ({ energy = 40, time = 60, title = '休息', logText = '' }) => {
            const state = Cake.store.state;
            if (state.energy >= 100) {
                Cake.addLog?.('😴 精力已经全满啦，不需要休息。');
                Cake.refreshPage?.();
                return;
            }

            const before = state.energy;
            state.energy = Math.min(100, state.energy + energy);
            const actual = state.energy - before;

            Cake.addLog?.(`${title} 精力 +${actual}（当前${state.energy}）。${logText}`);
            
            if (typeof Cake.advanceTime === 'function') Cake.advanceTime(time);
            else { Cake.saveState?.(); Cake.refreshPage?.(); }
        },

        // 通用睡觉（跨天）
        sleep: ({ time = 'next_day', title = '睡觉', logText = '' }) => {
            const state = Cake.store.state;
            let timeToAdvance = 0;
            
            if (time === 'next_day') {
                timeToAdvance = state.hour < 8 
                    ? (8 - state.hour) * 60 - state.minute 
                    : (24 - state.hour + 8) * 60 - state.minute;
            } else {
                timeToAdvance = Number(time) || 480;
            }

            Cake.addLog?.(`🛌 ${title} 你进入了梦乡……${logText}`);
            state.energy = 100; // 睡醒回满

            if (typeof Cake.advanceTime === 'function') Cake.advanceTime(timeToAdvance);
            else { Cake.saveState?.(); Cake.refreshPage?.(); }
        }
    };
})();
