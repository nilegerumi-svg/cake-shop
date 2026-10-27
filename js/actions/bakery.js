// js/actions/bakery.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    /* ==================== 常量 ==================== */

    const BAKE_ENERGY = 20;
    const BUY_INGREDIENT_ENERGY = 3;
    const BUY_BUNDLE_ENERGY = 5;
    const RESEARCH_ENERGY = 15;

    /* ==================== 烘焙蛋糕 ==================== */

    const bakeCake = (name, times) => {
        const state = Cake.store.state;
        // 保留原表达式：|| 1 同时处理 0 和 NaN，不能换成默认参数
        times = Math.max(1, Math.floor(Number(times)) || 1);

        const recipe = Cake.RECIPES[name];

        if (!recipe) return Cake.fail('❌ 未知配方');
        if (!state.recipes[name]) return Cake.fail('🔒 尚未解锁该配方');

        let done = 0;
        for (let i = 0; i < times; i++) {
            if (state.energy < BAKE_ENERGY) break;
            if (!Cake.hasIngredients(recipe.ing)) break;

            Cake.consumeIngredients(recipe.ing);
            state.cakes[name] = (state.cakes[name] || 0) + 1;
            state.energy -= BAKE_ENERGY;
            done++;
        }

        if (done === 0) {
            if (state.energy < BAKE_ENERGY) {
                return Cake.fail('⚡ 精力不足，无法烘焙！');
            }
            return Cake.fail('❌ 食材不足，无法烘焙！');
        }

        Cake.addLog(`🍰 你烘焙了 ${done} 个${recipe.emoji}${name}`);
        Cake.checkAchievements();
        Cake.refreshPage();
    };

    /* ==================== 购买单个食材 ==================== */

    const buyIngredient = (type) => {
        const state = Cake.store.state;
        const item = Cake.INGREDIENTS[type];

        if (!item) return Cake.fail('❌ 未知食材');
        if (state.money < item.price) return Cake.fail('💸 钱不够啦！');
        if (state.energy < BUY_INGREDIENT_ENERGY) return Cake.fail('⚡ 精力不足！');

        state.money -= item.price;
        state.ingredients[type] = (state.ingredients[type] || 0) + 1;
        state.energy -= BUY_INGREDIENT_ENERGY;

        Cake.addLog(`🛒 购买了${item.emoji}${item.name} ×1`);
        Cake.refreshPage();
    };

    /* ==================== 购买材料包 ==================== */

    const buyBundle = (id) => {
        const state = Cake.store.state;

        const bundle = (Cake.BUNDLES || []).find((b) => b.id === id);

        if (!bundle) return Cake.fail('❌ 未知材料包');
        if (state.money < bundle.cost) return Cake.fail('💸 钱不够啦！');
        if (state.energy < BUY_BUNDLE_ENERGY) return Cake.fail('⚡ 精力不足！');

        state.money -= bundle.cost;
        state.energy -= BUY_BUNDLE_ENERGY;

        for (const [k, v] of Object.entries(bundle.contents)) {
            state.ingredients[k] = (state.ingredients[k] || 0) + v;
        }

        Cake.addLog(`📦 购买了${bundle.emoji}${bundle.name}`);
        Cake.refreshPage();
    };

    /* ==================== 研发配方 ==================== */

    const researchRecipe = (name) => {
        const state = Cake.store.state;
        const recipe = Cake.RECIPES[name];

        if (!recipe || !recipe.unlock) return Cake.fail('❌ 该配方无法研发');
        if (state.recipes[name]) return Cake.fail('✅ 已拥有此配方');
        if (state.energy < RESEARCH_ENERGY) return Cake.fail('⚡ 精力不足！');

        // 🌟 修复：unlock 对象里是 money 字段，不是 cost
        const cost = recipe.unlock.money || 0;
        if (state.money < cost) return Cake.fail(`💸 研发需要 ${cost} 元！`);

        state.energy -= RESEARCH_ENERGY;
        state.money -= cost;
        state.recipes[name] = true;

        Cake.addLog(`🔬 研发成功：${recipe.emoji}${name}`);
        Cake.checkAchievements();
        Cake.refreshPage();
    };
    };

    /* ==================== 挂载 ==================== */

    Object.assign(Cake, { bakeCake, buyIngredient, buyBundle, researchRecipe });
})();
