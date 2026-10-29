// js/actions/craft/quality.js
(function () {
    'use strict';
    const Cake = window.Cake;

    Cake.calculateQuality = function (recipe, recipeKey, avgIngQuality) {
        try {
            const state = Cake.store.state;
            const req = recipe.qualityReq || {};

            // 食材固定 50 分，所以平均分就是 50
            avgIngQuality = avgIngQuality || 50;

            // 1. 提取熟练度
            const skillLv = (state.skills?.[recipe.skill]?.lv) || 1;
            const recipeLv = (state.recipeProf?.[recipeKey]?.lv) || 1;

            // 2. 检查完美门槛
            let canPerfect = true;
            
            // 如果配方要求了食材品质，且当前 50 分达不到，就做不出完美
            if (req.minIngredientQuality && avgIngQuality < req.minIngredientQuality) canPerfect = false;
            // 检查技能等级
            if (req.minSkillLevel && skillLv < req.minSkillLevel) canPerfect = false;
            // 检查配方熟练度
            if (req.minRecipeProf && recipeLv < req.minRecipeProf) canPerfect = false;
            
            // 检查完美工具
            if (req.perfectTools && req.perfectTools.length > 0) {
                const hasAllPerfectTools = req.perfectTools.every(toolId => 
                    state.tools?.[toolId]?.owned
                );
                if (!hasAllPerfectTools) canPerfect = false;
            }

            if (canPerfect) return 'perfect';

            // 3. 判断优良 (如果没达到完美，但厨艺或配方熟练度够高)
            let score = (skillLv * 2) + (recipeLv * 3);
            if (score >= 10) return 'good';

            // 4. 普通
            return 'normal';
        } catch (err) {
            console.warn('[Quality] 判定引擎异常，降级为普通', err);
            return 'normal'; 
        }
    };
})();
