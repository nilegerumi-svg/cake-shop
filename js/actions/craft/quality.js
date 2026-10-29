// js/actions/craft/quality.js
(function () {
    'use strict';
    const Cake = window.Cake;

    Cake.calculateQuality = function (recipe, recipeKey, avgIngQuality) {
        try {
            const state = Cake.store.state;
            const req = recipe.qualityReq || {};

            // 1. 提取四维熟练度
            const skillLv = (state.skills?.[recipe.skill]?.lv) || 1;
            const recipeLv = (state.recipeProf?.[recipeKey]?.lv) || 1;

            // 2. 检查完美门槛
            let canPerfect = true;
            
            if (req.minIngredientQuality && avgIngQuality < req.minIngredientQuality) canPerfect = false;
            if (req.minSkillLevel && skillLv < req.minSkillLevel) canPerfect = false;
            if (req.minRecipeProf && recipeLv < req.minRecipeProf) canPerfect = false;
            
            // 检查完美工具
            if (req.perfectTools && req.perfectTools.length > 0) {
                const hasAllPerfectTools = req.perfectTools.every(toolId => 
                    state.tools?.[toolId]?.owned
                );
                if (!hasAllPerfectTools) canPerfect = false;
            }

            if (canPerfect) return 'perfect';

            // 3. 判断优良
            let score = (skillLv * 2) + (recipeLv * 3) + (avgIngQuality / 10);
            if (score >= 15) return 'good';

            // 4. 普通
            return 'normal';
        } catch (err) {
            console.warn('[Quality] 判定引擎异常，降级为普通', err);
            return 'normal'; // 绝对兜底，防止引擎崩溃
        }
    };
})();
