// js/actions/entertainment/rest/nap.js
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
    if (Cake.__napLoaded) return;
    Cake.__napLoaded = true;

    Cake.RestSys = Cake.RestSys || {};

    const num = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    Cake.RestSys.nap = ({ energy = 0, time = 0, logs = [] } = {}) => {
        const state = Cake.store && Cake.store.state;
        if (!state) return;

        const curEnergy = num(state.energy, 0);

        if (curEnergy >= 100) {
            Cake.addLog?.('😴 精力已经全满啦，不需要休息。');
            Cake.refreshPage?.();
            return;
        }

        const gain = Math.max(0, num(energy, 0));
        state.energy = Math.min(100, curEnergy + gain);
        const actual = state.energy - curEnergy;

        if (Array.isArray(logs)) {
            for (const msg of logs) Cake.addLog?.(msg);
        }
        Cake.addLog?.(`🛏️ 小憩结束，精力 +${actual}（当前${state.energy}）`);

        // advanceTime 内部会 saveState + refreshPage
        if (typeof Cake.advanceTime === 'function') {
            Cake.advanceTime(num(time, 0));
        } else {
            Cake.saveState?.();
            Cake.refreshPage?.();
        }
    };
})();
