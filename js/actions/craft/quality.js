// js/actions/craft/quality.js
(function () {
    'use strict';
    const Cake = window.Cake;

    /* ==================== 属性系统接线 ====================
     * 配方的 output.attrs 声明了成品应有的风味/口感画像。
     * 这里把它折算成「属性丰富度」，用于优良判定：
     * 属性维度越多、主属性越突出，越容易做出优良品。
     * 注意：不参与 perfect 门槛，四维品质体系（食材/厨艺/配方/工具）保持不变。
     */
    const calcAttrScore = (attrs) => {
        if (!attrs || typeof attrs !== 'object') return 0;

        const DICT = Cake.ATTRIBUTES || {};
        let dims = 0;       // 声明了几个属性维度（flavor/texture/aroma/temperature）
        let peak = 0;       // 最高的单项属性强度
        let valid = 0;      // 属性键在字典中可识别的数量

        for (const [dim, values] of Object.entries(attrs)) {
            if (!values || typeof values !== 'object') continue;
            dims++;
            const dict = DICT[dim] || {};

            for (const [key, score] of Object.entries(values)) {
                const num = Number(score) || 0;
                if (num <= 0) continue;
                valid += dict[key] ? 1 : 0;
                if (num > peak) peak = num;
            }
        }

        if (dims === 0) return 0;
        // 维度广度 + 主属性强度 + 字典可识别度，折算为 0~6 的加成
        const breadth = Math.min(2, dims);
        const strength = Math.min(3, peak / 30);
        const fidelity = valid > 0 ? Math.min(1, valid / 4) : 0;
        return breadth + strength + fidelity;
    };

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

            // 3. 判断优良：厨艺 + 配方熟练度 + 属性丰富度
            const attrScore = calcAttrScore(recipe.output && recipe.output.attrs);
            const score = (skillLv * 2) + (recipeLv * 3) + attrScore;
            if (score >= 10) return 'good';

            // 4. 普通
            return 'normal';
        } catch (err) {
            console.warn('[Quality] 判定引擎异常，降级为普通', err);
            return 'normal'; 
        }
    };

    // 暴露属性评分，便于配方页与调试查看
    Cake.calcAttrScore = calcAttrScore;
})();
