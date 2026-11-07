// js/actions/craft/dispose.js
(function () {
    'use strict';
    const Cake = window.Cake;

    Cake.disposeTrash = function () {
        const state = Cake.store.state;
        
        let hasRotten = state.inventory.some(i => i.isRotten);
        let hasFailed = Object.values(state.foods).some(f => f.failed > 0);
        
        if (!hasRotten && !hasFailed) return Cake.fail('✨ 店里干干净净，没有垃圾。');

        const costEnergy = 10;
        const costTime = 5;
        
        if (state.energy < costEnergy) return Cake.fail('⚡ 太累了，连倒垃圾的力气都没了。');

        state.energy -= costEnergy;
        if (hasRotten) state.inventory = state.inventory.filter(i => !i.isRotten);
        if (hasFailed) {
            for (const key in state.foods) state.foods[key].failed = 0;
        }

        Cake.advanceTime(costTime);
        Cake.addLog(`🗑️ 花了一点时间，把垃圾扔了出去。`);
        if (Cake.refreshPage) Cake.refreshPage();
    };
})();
