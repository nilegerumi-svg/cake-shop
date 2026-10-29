// js/actions/craft/_shared.js
(function () {
    'use strict';
    const Cake = window.Cake;

    // 检查玩家是否拥有匹配的工具（支持按 ID 或 技法 tech 匹配）
    Cake.hasTool = function (state, toolSpec) {
        if (!toolSpec) return true;
        return Object.keys(state.tools).some(toolId => {
            const ownedTool = state.tools[toolId];
            if (!ownedTool || !ownedTool.owned) return false;
            
            if (toolSpec.id) return toolId === toolSpec.id; // 按具体ID匹配
            if (toolSpec.tech) { // 按技法匹配（比如任何带有'bake'技法的烤箱）
                const toolData = Cake.TOOLS[toolId];
                return toolData && toolData.tech === toolSpec.tech;
            }
            return false;
        });
    };
})();
