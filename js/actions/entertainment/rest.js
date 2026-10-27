// js/entertainment/rest.js
(() => {
    'use strict';
    window.Cake = window.Cake || {};
    const Cake = window.Cake;
    
    const REST_GAIN = 40;

    const rest = () => {
        const state = Cake.store.state;
        
        if (state.energy >= 100) {
            Cake.addLog?.('😴 精力已经全满啦，不需要休息。');
            Cake.refreshPage?.();
            return;
        }

        const before = state.energy;
        state.energy = Math.min(100, state.energy + REST_GAIN);
        const gain = state.energy - before;

        Cake.addLog?.(`😴 你休息了一下，精力 +${gain}（当前${state.energy}）`);
        Cake.saveState?.();
        Cake.refreshPage?.();
    };

    // 挂载到全局
    Cake.rest = rest;
})();
