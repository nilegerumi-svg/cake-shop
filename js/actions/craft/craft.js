// js/actions/craft/craft.js
(function () {
    'use strict';

    const Cake = window.Cake;

    const SKILL_LOCATION_RULES = {
        bakery: 'home',
        cook: 'home'
    };

    Cake.craft = function (recipeKey, times = 1) {
        const state = Cake.store?.state;
        if (!state) return Cake.fail('❌ 游戏状态未就绪');

        const recipe = Cake.RECIPES?.[recipeKey];
        if (!recipe) return Cake.fail('❌ 未知配方');

        if (!state.unlockedRecipes) state.unlockedRecipes = {};
        if (!state.foods) state.foods = {};
        if (!state.inventory) state.inventory = [];
        if (!state.tools) state.tools = {};
        if (!state.skills) state.skills = { bakery: { lv: 1, exp: 0 }, cook: { lv: 1, exp: 0 } };
        if (!state.recipeProf) state.recipeProf = {};

        if (!state.unlockedRecipes[recipeKey]) {
            return Cake.fail('🔒 尚未解锁该配方');
        }

        const requiredLoc = SKILL_LOCATION_RULES[recipe.skill];
        if (requiredLoc && state.currentLocation !== requiredLoc) {
            const locName = requiredLoc === 'home' ? '家园' : requiredLoc;
            return Cake.fail(`📍 必须回到【${locName}】才能进行${recipe.skill === 'bakery' ? '烘焙' : '烹饪'}哦！`);
        }

        times = Math.max(1, Math.floor(times));

        if (Array.isArray(recipe.tools)) {
            let hasAllRequired = true;
            recipe.tools.forEach((t) => {
                const toolOwned = Object.keys(state.tools).some((toolId) => {
                    const ownedTool = state.tools[toolId];
                    if (!ownedTool || !ownedTool.owned) return false;
                    return t.id ? toolId === t.id : (Cake.TOOLS?.[toolId]?.tech === t.tech);
                });
                if (t.role === 'required' && !toolOwned) hasAllRequired = false;
            });
            if (!hasAllRequired) return Cake.fail('🛠️ 缺少必需工具，做不了！');
        }

        const ingMap = recipe.ing || {};
        for (const [ingId, reqQty] of Object.entries(ingMap)) {
            const required = Number(reqQty) || 0;
            const owned = state.inventory.filter((item) => item && item.id === ingId && !item.isRotten).length;
            if (owned < required * times) {
                return Cake.fail(`❌ 食材不足：${Cake.INGREDIENTS?.[ingId]?.name || ingId} 需要 ${required * times} 份`);
            }
        }

        const sizeRules = (Cake.BAKERY_SIZE_CONFIG && Cake.BAKERY_SIZE_CONFIG[recipe.size]) || {
            timeBase: 15,
            timeRand: 5,
            yield: 1,
            successModifier: 0
        };

        const skill = state.skills[recipe.skill] || { lv: 1, exp: 0 };
        const rProf = state.recipeProf[recipeKey] || { lv: 1, exp: 0 };

        let successRate = 0.5 + (skill.lv * 0.05) + (rProf.lv * 0.1) + (sizeRules.successModifier || 0);
        successRate = Math.max(0.1, Math.min(0.98, successRate));

        let totalTimeCost = 0;
        let counts = { perfect: 0, good: 0, normal: 0, failed: 0 };
        let batchesDone = 0;

        for (let i = 0; i < times; i++) {
            if (state.energy < recipe.energy) break;

            let qualitySum = 0;
            let qualityCount = 0;

            for (const [ingId, reqQty] of Object.entries(ingMap)) {
                let needToRemove = Number(reqQty) || 0;
                for (let j = state.inventory.length - 1; j >= 0 && needToRemove > 0; j--) {
                    const item = state.inventory[j];
                    if (item && item.id === ingId && !item.isRotten) {
                        qualitySum += (item.quality || 50);
                        qualityCount++;
                        state.inventory.splice(j, 1);
                        needToRemove--;
                    }
                }
            }

            const avgIngQuality = qualityCount > 0 ? (qualitySum / qualityCount) : 50;
            state.energy -= recipe.energy;

            totalTimeCost += (sizeRules.timeBase || 15) + Math.floor(Math.random() * ((sizeRules.timeRand || 5) + 1));

            const yieldAmount = sizeRules.yield || 1;
            const isSuccess = Math.random() <= successRate;

            if (!state.foods[recipeKey]) {
                state.foods[recipeKey] = { perfect: 0, good: 0, normal: 0, failed: 0 };
            }

            if (isSuccess) {
                let finalQuality = 'normal';
                if (typeof Cake.calculateQuality === 'function') {
                    finalQuality = Cake.calculateQuality(recipe, recipeKey, avgIngQuality) || 'normal';
                }
                state.foods[recipeKey][finalQuality] = (state.foods[recipeKey][finalQuality] || 0) + yieldAmount;
                counts[finalQuality] += yieldAmount;
            } else {
                state.foods[recipeKey].failed = (state.foods[recipeKey].failed || 0) + yieldAmount;
                counts.failed += yieldAmount;
            }

            if (!state.skills[recipe.skill]) state.skills[recipe.skill] = { lv: 1, exp: 0 };
            if (!state.recipeProf[recipeKey]) state.recipeProf[recipeKey] = { lv: 1, exp: 0 };

            Cake.addProficiencyExp(state.skills[recipe.skill], 'skill', 2);
            Cake.addProficiencyExp(state.recipeProf[recipeKey], 'recipe', 5);

            batchesDone++;
        }

        if (batchesDone === 0) return Cake.fail('❌ 资源或精力不足，无法制作');

        Cake.advanceTime(totalTimeCost);

        let logMsg = `🍳 制作了 ${batchesDone} 批次 ${recipe.name}：`;
        if (counts.perfect > 0) logMsg += ` ✨完美 ${counts.perfect}个`;
        if (counts.good > 0) logMsg += ` 👍优良 ${counts.good}个`;
        if (counts.normal > 0) logMsg += ` 普通 ${counts.normal}个`;
        if (counts.failed > 0) logMsg += ` 💀失败 ${counts.failed}个`;
        logMsg += `。耗时 ${totalTimeCost} 分钟。`;

        Cake.addLog(logMsg, 'success');
        if (Cake.emit) Cake.emit('refresh_ui');

        return { success: true, batches: batchesDone };
    };
})();
