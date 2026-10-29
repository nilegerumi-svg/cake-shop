// js/actions/craft/craft.js
(function () {
    'use strict';
    const Cake = window.Cake;

    // 👈 新增：定义技能对应的制作地点限制
    const SKILL_LOCATION_RULES = {
        'bakery': 'home', // 烘焙必须在家里
        'cook': 'home'    // 料理必须在家里
        // 以后如果加了打铁技能，可以设为 'forge' 等
    };

    Cake.craft = function (recipeKey, times = 1) {
        const state = Cake.store.state;
        const recipe = Cake.RECIPES[recipeKey];

        if (!recipe) return Cake.fail('❌ 未知配方');
        if (!state.unlockedRecipes[recipeKey]) return Cake.fail('🔒 尚未解锁该配方');

        // 👈 核心新增：检查玩家当前是否在允许制作的地点
        const requiredLoc = SKILL_LOCATION_RULES[recipe.skill];
        if (requiredLoc && state.currentLocation !== requiredLoc) {
            const locName = requiredLoc === 'home' ? '家园' : requiredLoc;
            return Cake.fail(`📍 必须回到【${locName}】才能进行${recipe.skill === 'bakery' ? '烘焙' : '烹饪'}哦！`);
        }

        times = Math.max(1, Math.floor(times));

        // 1. 检查工具
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

        // 2. 检查食材
        for (const [ingId, reqQty] of Object.entries(recipe.ing)) {
            const owned = state.inventory.filter(i => i.id === ingId && !i.isRotten).length;
            if (owned < reqQty * times) return Cake.fail(`❌ 食材不足：${Cake.INGREDIENTS[ingId]?.name || ingId} 需要 ${reqQty * times} 份`);
        }

        // 3. 获取该尺寸的通用规则
        const sizeRules = (Cake.BAKERY_SIZE_CONFIG && Cake.BAKERY_SIZE_CONFIG[recipe.size]) 
                          || { timeBase: 15, timeRand: 5, yield: 1, successModifier: 0 };

        // 4. 计算基础成功率
        const skill = state.skills[recipe.skill] || { lv: 1 };
        const rProf = state.recipeProf[recipeKey] || { lv: 1 };
        
        let successRate = 0.5 + (skill.lv * 0.05) + (rProf.lv * 0.1) + sizeRules.successModifier;
        successRate = Math.max(0.1, Math.min(0.98, successRate));

        let totalTimeCost = 0;
        let successCount = 0;
        let failCount = 0;
        let batchesDone = 0;

        // 5. 开始批次制作
        for (let i = 0; i < times; i++) {
            if (state.energy < recipe.energy) break;

            // 扣除食材
            for (const [ingId, reqQty] of Object.entries(recipe.ing)) {
                let needToRemove = reqQty;
                // 从后往前遍历，优先扣除快过期的（或者你以后可以写排序逻辑）
                for (let j = state.inventory.length - 1; j >= 0 && needToRemove > 0; j--) {
                    if (state.inventory[j].id === ingId && !state.inventory[j].isRotten) {
                        state.inventory.splice(j, 1);
                        needToRemove--;
                    }
                }
            }

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
                state.foods[recipeKey].normal += yieldAmount;
                successCount += yieldAmount;
            } else {
                state.foods[recipeKey].failed += yieldAmount;
                failCount += yieldAmount;
            }

            // 加熟练度
            Cake.addProficiencyExp(state.skills[recipe.skill], 'skill', 2);
            if (!state.recipeProf[recipeKey]) state.recipeProf[recipeKey] = { lv: 1, exp: 0 };
            Cake.addProficiencyExp(state.recipeProf[recipeKey], 'recipe', 5);

            batchesDone++;
        }

        if (batchesDone === 0) return Cake.fail('❌ 资源或精力不足，无法制作');

        // 6. 推进时间
        Cake.advanceTime(totalTimeCost);

        // 7. 记录日志并刷新
        Cake.addLog(`🍳 制作了 ${batchesDone} 批次 ${recipe.name}：成功 ${successCount} 个，失败 ${failCount} 个。耗时 ${totalTimeCost} 分钟。`);
        if (Cake.emit) Cake.emit('refresh_ui'); // 统一用 emit 通知刷新
    };
})();
