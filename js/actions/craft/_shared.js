(function () {
    'use strict';
    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    Cake.hasTool = function (state, toolSpec) {
        if (!toolSpec) return true;
        if (!state || !state.tools || typeof state.tools !== 'object') return false;

        return Object.keys(state.tools).some(toolId => {
            const ownedTool = state.tools[toolId];
            if (!ownedTool || !ownedTool.owned) return false;

            if (toolSpec.id) return toolId === toolSpec.id;
            if (toolSpec.tech) {
                const toolData = Cake.TOOLS?.[toolId];
                return toolData && toolData.tech === toolSpec.tech;
            }
            return false;
        });
    };

    // 👈 熟练度增长：技能(如烘焙/料理)与配方熟练度共用
    // 经验满 100 升 1 级，升级时保留溢出经验
    Cake.addProficiencyExp = function (prof, type, amount = 1) {
        if (!prof || !type) return;
        if (typeof prof !== 'object') return;

        const EXP_PER_LEVEL = 100;

        const curExp = Number.isFinite(Number(prof.exp)) ? Number(prof.exp) : 0;
        const curLv = Number.isFinite(Number(prof.lv)) ? Number(prof.lv) : 1;

        let total = curExp + Math.max(0, Number(amount) || 0);
        let lv = curLv;

        while (total >= EXP_PER_LEVEL) {
            total -= EXP_PER_LEVEL;
            lv += 1;
        }

        prof.lv = lv;
        prof.exp = total;
    };
})();
