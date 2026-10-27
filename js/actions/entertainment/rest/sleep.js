// js/actions/entertainment/rest/sleep.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    Cake.RestSys = Cake.RestSys || {};

    Cake.RestSys.sleep = ({ time = 0, logs = [] }) => {
        const state = Cake.store.state;
        
        logs.forEach(msg => Cake.addLog?.(msg));
        Cake.addLog?.(`🌅 你醒了过来，精力全满！`);
        
        state.energy = 100; // 睡醒必定回满

        if (typeof Cake.advanceTime === 'function') Cake.advanceTime(time);
        else { Cake.saveState?.(); Cake.refreshPage?.(); }
    };
})();
