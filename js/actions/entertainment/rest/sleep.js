// js/actions/entertainment/rest/sleep.js
(() => {
    'use strict';

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
    if (Cake.__sleepLoaded) return;
    Cake.__sleepLoaded = true;

    Cake.RestSys = Cake.RestSys || {};

    const num = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    Cake.RestSys.sleep = ({ time = 0, logs = [] } = {}) => {
        const state = Cake.store && Cake.store.state;
        if (!state) return;

        if (Array.isArray(logs)) {
            for (const msg of logs) Cake.addLog?.(msg);
        }
        Cake.addLog?.('🌅 你醒了过来，精力全满！');

        state.energy = 100; // 睡醒必定回满

        // advanceTime 内部会 saveState + refreshPage
        if (typeof Cake.advanceTime === 'function') {
            Cake.advanceTime(num(time, 0));
        } else {
            Cake.saveState?.();
            Cake.refreshPage?.();
        }
    };
})();
