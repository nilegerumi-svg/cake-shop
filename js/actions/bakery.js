// js/actions/bakery.js
window.Cake = window.Cake || {};

(function () {
    var BAKE_ENERGY = 20;
    var BUY_INGREDIENT_ENERGY = 3;
    var BUY_BUNDLE_ENERGY = 5;
    var RESEARCH_ENERGY = 15;

    function bakeCake(name, times) {
        var state = window.Cake.store.state;
        times = Math.max(1, Math.floor(Number(times)) || 1);
        var r = window.Cake.RECIPES[name];

        if (!r) return window.Cake.fail('❌ 未知配方');
        if (!state.recipes[name]) return window.Cake.fail('🔒 尚未解锁该配方');

        var done = 0;
        for (var i = 0; i < times; i++) {
            if (state.energy < BAKE_ENERGY) break;
            if (!window.Cake.hasIngredients(r.ing)) break;

            window.Cake.consumeIngredients(r.ing);
            state.cakes[name] = (state.cakes[name] || 0) + 1;
            state.energy -= BAKE_ENERGY;
            done++;
        }

        if (done === 0) {
            if (state.energy < BAKE_ENERGY) {
                return window.Cake.fail('⚡ 精力不足，无法烘焙！');
            }
            return window.Cake.fail('❌ 食材不足，无法烘焙！');
        }

        window.Cake.addLog('🍰 你烘焙了 ' + done + ' 个' + r.emoji + name);
        window.Cake.checkAchievements();
        window.Cake.refreshPage();
    }

    function buyIngredient(type) {
        var state = window.Cake.store.state;
        var v = window.Cake.INGREDIENTS[type];

        if (!v) return window.Cake.fail('❌ 未知食材');
        if (state.money < v.price) return window.Cake.fail('💸 钱不够啦！');
        if (state.energy < BUY_INGREDIENT_ENERGY) return window.Cake.fail('⚡ 精力不足！');

        state.money -= v.price;
        state.ingredients[type] = (state.ingredients[type] || 0) + 1;
        state.energy -= BUY_INGREDIENT_ENERGY;

        window.Cake.addLog('🛒 购买了' + v.emoji + v.name + ' ×1');
        window.Cake.refreshPage();
    }

    function buyBundle(id) {
        var state = window.Cake.store.state;
        var BUNDLES = window.Cake.BUNDLES;
        var b = null;

        for (var i = 0; i < BUNDLES.length; i++) {
            if (BUNDLES[i].id === id) { b = BUNDLES[i]; break; }
        }

        if (!b) return window.Cake.fail('❌ 未知材料包');
        if (state.money < b.cost) return window.Cake.fail('💸 钱不够啦！');
        if (state.energy < BUY_BUNDLE_ENERGY) return window.Cake.fail('⚡ 精力不足！');

        state.money -= b.cost;
        state.energy -= BUY_BUNDLE_ENERGY;

        for (var k in b.contents) {
            if (!Object.prototype.hasOwnProperty.call(b.contents, k)) continue;
            state.ingredients[k] = (state.ingredients[k] || 0) + b.contents[k];
        }

        window.Cake.addLog('📦 购买了' + b.emoji + b.name);
        window.Cake.refreshPage();
    }

    function researchRecipe(name) {
        var state = window.Cake.store.state;
        var r = window.Cake.RECIPES[name];

        if (!r || !r.unlock) return window.Cake.fail('❌ 该配方无法研发');
        if (state.recipes[name]) return window.Cake.fail('✅ 已拥有此配方');
        if (state.energy < RESEARCH_ENERGY) return window.Cake.fail('⚡ 精力不足！');

        // 以下为原有研发逻辑（保持原样）
        state.energy -= RESEARCH_ENERGY;
        state.money -= r.unlock.cost || 0;
        state.recipes[name] = true;
        window.Cake.addLog('🔬 研发成功：' + r.emoji + name);
        window.Cake.checkAchievements();
        window.Cake.refreshPage();
    }

    window.Cake.bakeCake = bakeCake;
    window.Cake.buyIngredient = buyIngredient;
    window.Cake.buyBundle = buyBundle;
    window.Cake.researchRecipe = researchRecipe;
})();
