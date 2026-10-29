// js/actions/craft/research.js
(function () {
    'use strict';
    const Cake = window.Cake;

    Cake.researchRecipe = function (recipeKey) {
        const state = Cake.store.state;
        const recipe = Cake.RECIPES[recipeKey];

        if (!recipe) return Cake.fail('❌ 未知配方');
        if (state.unlockedRecipes[recipeKey]) return Cake.fail('✅ 已经解锁过了');

        // 默认研发消耗
        const costEnergy = 20;
        const costTime = 60;
        const costMoney = 50;

        if (state.energy < costEnergy) return Cake.fail('⚡ 精力不足，研究不动了');
        if (state.money < costMoney) return Cake.fail(`💸 研发需要 ${costMoney} 元`);

        state.energy -= costEnergy;
        state.money -= costMoney;
        state.unlockedRecipes[recipeKey] = true;

        Cake.advanceTime(costTime);
        Cake.addLog(`🔬 研发成功：${recipe.name} 解锁！耗时 ${costTime} 分钟。`);
        if (Cake.refreshPage) Cake.refreshPage();
    };
})();
