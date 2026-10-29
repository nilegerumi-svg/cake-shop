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
})();
