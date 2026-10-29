// js/actions/craft/quality.js
(function () {
    'use strict';
    const Cake = window.Cake;

    // 计算最终品质（perfect / good / normal）
    Cake.calculateQuality = function (recipe, recipeKey, ingredientQualityAvg) {
        const state = Cake.store.state;
        const req = recipe.qualityReq || {};

        const skillLv = (state.skills[recipe.skill] || { lv: 1 }).lv;
        const recipeLv = (state.recipeProf[recipeKey] || { lv: 1 }).lv;

        // 1. 检查各项硬性门槛
        const passIngredient = ingredientQualityAvg >= (req.minIngredientQuality || 0);
        const passSkill = skillLv >= (req.minSkillLevel || 0);
        const passRecipe = recipeLv >= (req.minRecipeProf || 0);
        
        // 2. 检查是否有提升完美率的专属工具
        let passTools = true;
        if (req.perfectTools && req.perfectTools.length > 0) {
            passTools = req.perfectTools.every(toolId => state.tools[toolId] && state.tools[toolId].owned);
        }

        // 3. 判定结果
        if (passIngredient && passSkill && passRecipe && passTools) {
            return 'perfect';
        }
        
        // 如果达不到完美，只要有基础熟练度，也能做出优良品
        if (skillLv >= 2 || recipeLv >= 1) {
            return 'good';
        }

        return 'normal';
    };
})();
