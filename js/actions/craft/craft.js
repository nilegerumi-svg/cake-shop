// js/actions/craft/craft.js
(function () {
    'use strict';
    const Cake = window.Cake;

    // 技能对应的制作地点限制
    const SKILL_LOCATION_RULES = {
        'bakery': 'home',
        'cook': 'home'
    };

    Cake.craft = function (recipeKey, times = 1) {
        const state = Cake.store.state;
        const recipe = Cake.RECIPES[recipeKey];

        if (!recipe) return Cake.fail('❌ 未知配方');
        if (!state.unlockedRecipes[recipeKey]) return Cake.fail('🔒 尚未解锁该配方');

        // 1. 地点限制检查
        const requiredLoc = SKILL_LOCATION_RULES[recipe.skill];
        if (requiredLoc && state.currentLocation !== requiredLoc) {
            const locName = requiredLoc === 'home' ? '家园' : requiredLoc;
            return Cake.fail(`📍 必须回到【${locName}】才能进行${recipe.skill === 'bakery' ? '烘焙' : '烹饪'}哦！`);
        }

        times = Math.max(1, Math.floor(times));

        // 2. 检查工具
        let hasAllRequired = true;
        if (recipe.tools) {
            recipe.tools.forEach(t => {
                const toolOwned = Object.keys(state.tools).some(toolId => {
                    if (!state.tools[toolId].owned) return false;
                    return t.id ? toolId === t.id : Cake.TOOLS[toolId]?.tech === t.tech;
                });
                if (t.role === 'required' && !toolOwned) hasAllRequired = false;
            });
        }
        if (!hasAllRequired) return Cake.fail('🛠️ 缺少必需工具，做不了！');

        // 3. 检查食材
        for (const [ingId, reqQty] of Object.entries(recipe.ing)) {
            const owned = state.inventory.filter(i => i.id === ingId && !i.isRotten).length;
            if (owned < reqQty * times) return Cake.fail(`❌ 食材不足：${Cake.INGREDIENTS[ingId]?.name || ingId} 需要 ${reqQty * times} 份`);
        }

        // 4. 获取尺寸规则
        const sizeRules = (Cake.BAKERY_SIZE_CONFIG && Cake.BAKERY_SIZE_CONFIG[recipe.size]) 
                          || { timeBase: 15, timeRand: 5, yield: 1, successModifier: 0 };

        // 5. 计算基础成功率
        const skill = state.skills[recipe.skill] || { lv: 1 };
        const rProf = state.recipeProf[recipeKey] || { lv: 1 };
        let successRate = 0.5 + (skill.lv * 0.05) + (rProf.lv * 0.1) + sizeRules.successModifier;
        successRate = Math.max(0.1, Math.min(0.98, successRate));

        let totalTimeCost = 0;
        let counts = { perfect: 0, good: 0, normal: 0, failed: 0 }; // 统计各品质产出
        let batchesDone = 0;

        // 6. 开始批次制作
        for (let i = 0; i < times; i++) {
            if (state.energy < recipe.energy) break;

            // 👈 核心接入：扣除食材，并计算本次消耗食材的平均品质
            let qualitySum = 0, qualityCount = 0;
            for (const [ingId, reqQty] of Object.entries(recipe.ing)) {
                let needToRemove = reqQty;
                for (let j = state.inventory.length - 1; j >= 0 && needToRemove > 0; j--) {
                    if (state.inventory[j].id === ingId && !state.inventory[j].isRotten) {
                        qualitySum += (state.inventory[j].quality || 50);
                        qualityCount++;
                        state.inventory.splice(j, 1);
                        needToRemove--;
                    }
                }
            }
            const avgIngQuality = qualityCount > 0 ? (qualitySum / qualityCount) : 50;

            state.energy -= recipe.energy;

            // 计算这一批次的时间
            totalTimeCost += sizeRules.timeBase + Math.floor(Math.random() * (sizeRules.timeRand + 1));

            // 产出判定
            const yieldAmount = sizeRules.yield;
            const isSuccess = Math.random() <= successRate;

            if (!state.foods[recipeKey]) {
                state.foods[recipeKey] = { perfect: 0, good: 0, normal: 0, failed: 0 };
            }

            if (isSuccess) {
                // 👈 核心接入：调用四维品质引擎
                let finalQuality = 'normal';
                if (typeof Cake.calculateQuality === 'function') {
                    finalQuality = Cake.calculateQuality(recipe, recipeKey, avgIngQuality) || 'normal';
                }
                
                // 防御性累加
                state.foods[recipeKey][finalQuality] = (state.foods[recipeKey][finalQuality] || 0) + yieldAmount;
                counts[finalQuality] += yieldAmount;
            } else {
                state.foods[recipeKey].failed = (state.foods[recipeKey].failed || 0) + yieldAmount;
                counts.failed += yieldAmount;
            }

            // 加熟练度
            Cake.addProficiencyExp(state.skills[recipe.skill], 'skill', 2);
            if (!state.recipeProf[recipeKey]) state.recipeProf[recipeKey] = { lv: 1, exp: 0 };
            Cake.addProficiencyExp(state.recipeProf[recipeKey], 'recipe', 5);

            batchesDone++;
        }

        if (batchesDone === 0) return Cake.fail('❌ 资源或精力不足，无法制作');

        // 7. 推进时间
        Cake.advanceTime(totalTimeCost);

        // 8. 记录日志并刷新
        let logMsg = `🍳 制作了 ${batchesDone} 批次 ${recipe.name}：`;
        if (counts.perfect > 0) logMsg += ` ✨完美 ${counts.perfect}个`;
        if (counts.good > 0) logMsg += ` 👍优良 ${counts.good}个`;
        if (counts.normal > 0) logMsg += ` 普通 ${counts.normal}个`;
        if (counts.failed > 0) logMsg += ` 💀失败 ${counts.failed}个`;
        logMsg += `。耗时 ${totalTimeCost} 分钟。`;

        Cake.addLog(logMsg, 'success');
        if (Cake.emit) Cake.emit('refresh_ui');
    };
})();
