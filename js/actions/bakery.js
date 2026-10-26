window.Cake = window.Cake || {};
(function () {
    function bakeCake(name, times) {
        var state = window.Cake.store.state;
        times = Math.max(1, Math.floor(Number(times)) || 1);
        var r = window.Cake.RECIPES[name];
        if (!r) { window.Cake.addLog('❌ 未知配方'); window.Cake.refreshPage(); return; }
        if (!state.recipes[name]) { window.Cake.addLog('🔒 尚未解锁该配方'); window.Cake.refreshPage(); return; }

        var done = 0;
        for (var i = 0; i < times; i++) {
            if (state.energy < 20) break;
            if (!window.Cake.hasIngredients(r.ing)) break;
            window.Cake.consumeIngredients(r.ing);
            state.cakes[name] = (state.cakes[name] || 0) + 1;
            state.energy -= 20;
            done++;
        }
        if (done === 0) {
            window.Cake.addLog(state.energy < 20 ? '😵 精力不足，无法烘焙！' : '❌ 食材不足，无法烘焙！');
        } else {
            window.Cake.addLog('🎂 你烘焙了 ' + done + ' 个' + r.emoji + name);
        }
        window.Cake.checkAchievements();
        window.Cake.refreshPage();
    }

    function buyIngredient(type) {
        var state = window.Cake.store.state;
        var v = window.Cake.INGREDIENTS[type];
        if (!v) { window.Cake.addLog('❌ 未知食材'); window.Cake.refreshPage(); return; }
        if (state.money < v.price) { window.Cake.addLog('💸 钱不够啦！'); window.Cake.refreshPage(); return; }
        if (state.energy < 3) { window.Cake.addLog('😵 精力不足！'); window.Cake.refreshPage(); return; }
        state.money -= v.price;
        state.ingredients[type] = (state.ingredients[type] || 0) + 1;
        state.energy -= 3;
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
        if (!b) { window.Cake.addLog('❌ 未知材料包'); window.Cake.refreshPage(); return; }
        if (state.money < b.cost) { window.Cake.addLog('💸 钱不够啦！'); window.Cake.refreshPage(); return; }
        if (state.energy < 5) { window.Cake.addLog('😵 精力不足！'); window.Cake.refreshPage(); return; }
        state.money -= b.cost;
        state.energy -= 5;
        for (var k in b.contents) {
            if (!Object.prototype.hasOwnProperty.call(b.contents, k)) continue;
            state.ingredients[k] = (state.ingredients[k] || 0) + b.contents[k];
        }
        window.Cake.addLog('🛒 购买了' + b.emoji + b.name);
        window.Cake.refreshPage();
    }

    function researchRecipe(name) {
        var state = window.Cake.store.state;
        var r = window.Cake.RECIPES[name];
        if (!r || !r.unlock) { window.Cake.addLog('❌ 该配方无法研发'); window.Cake.refreshPage(); return; }
        if (state.recipes[name]) { window.Cake.addLog('✅ 已拥有此配方'); window.Cake.refreshPage(); return; }
        if (state.energy < 15) { window.Cake.addLog('😵 精力不足！'); window.Cake.refreshPage(); return; }
        if (state.money < r.unlock.money) { window.Cake.addLog('💸 研发需要' + r.unlock.money + '元！'); window.Cake.refreshPage(); return; }
        if (state.reputation < r.unlock.rep) { window.Cake.addLog('⭐ 声望不足（需要' + r.unlock.rep + '）！'); window.Cake.refreshPage(); return; }
        if (state.shopLevel < (r.unlock.shop || 1)) { window.Cake.addLog('🏪 店铺等级不足（需要Lv.' + (r.unlock.shop || 1) + '）！'); window.Cake.refreshPage(); return; }
        state.money -= r.unlock.money;
        state.energy -= 15;
        state.recipes[name] = true;
        window.Cake.addLog('📖 成功研发出新配方：' + r.emoji + name + '！');
        window.Cake.checkAchievements();
        window.Cake.refreshPage();
    }

    window.Cake.bakeCake = bakeCake;
    window.Cake.buyIngredient = buyIngredient;
    window.Cake.buyBundle = buyBundle;
    window.Cake.researchRecipe = researchRecipe;
})();