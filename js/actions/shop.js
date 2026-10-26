// js/actions/shop.js
window.Cake = window.Cake || {};

(function () {
    var DECORATE_COST = 100;
    var UPGRADE_ENERGY = 5;
    var DECORATE_ENERGY = 5;

    function upgradeShop() {
        var state = window.Cake.store.state;
        var costs = window.Cake.SHOP_UPGRADE_COSTS;
        var MAX_LEVEL = costs.length; // 等级上限由费用表长度决定

        if (state.shopLevel >= MAX_LEVEL) {
            return window.Cake.fail('🏪 店铺已是最高等级！');
        }

        var cost = costs[state.shopLevel];

        if (!cost) {
            return window.Cake.fail('❌ 升级费用数据异常（等级 ' + state.shopLevel + '）');
        }
        if (state.money < cost) {
            return window.Cake.fail('💸 升级需要 ' + cost + ' 元！');
        }
        if (state.energy < UPGRADE_ENERGY) {
            return window.Cake.fail('⚡ 精力不足！');
        }

        state.money -= cost;
        state.energy -= UPGRADE_ENERGY;
        state.shopLevel++;

        window.Cake.addLog('🏪 店铺升级至 Lv.' + state.shopLevel + '！客流量提升～');
        if (typeof window.Cake.checkAchievements === 'function') window.Cake.checkAchievements();
        window.Cake.refreshPage();
    }

    function decorateShop() {
        var state = window.Cake.store.state;

        if (state.money < DECORATE_COST) {
            return window.Cake.fail('💸 装饰需要 ' + DECORATE_COST + ' 元！');
        }
        if (state.energy < DECORATE_ENERGY) {
            return window.Cake.fail('⚡ 精力不足！');
        }

        state.money -= DECORATE_COST;
        state.energy -= DECORATE_ENERGY;
        state.decoration++;

        window.Cake.addLog('🎀 装饰度 +1（当前' + state.decoration + '），小店更温馨了！');
        if (typeof window.Cake.checkAchievements === 'function') window.Cake.checkAchievements();
        window.Cake.refreshPage();
    }

    function setPriceRate(rate) {
        var state = window.Cake.store.state;
        state.priceRate = rate;
        window.Cake.addLog('💰 定价调整为 ' + rate.toFixed(1) + 'x');
        window.Cake.refreshPage();
    }

    function openShop() {
        var state = window.Cake.store.state;
        var RECIPES = window.Cake.RECIPES;
        var cakeNames = [];

        for (var n in state.cakes) {
            if (!Object.prototype.hasOwnProperty.call(state.cakes, n)) continue;
            if ((state.cakes[n] || 0) > 0 && RECIPES[n]) cakeNames.push(n);
        }

        var lines = [];

        function pushLine(html, text) {
            lines.push({
                html: html,
                text: text == null ? html : text,
                day: state.day
            });
        }

        var earned = 0, sold = 0, lost = 0;

        if (cakeNames.length === 0) {
            state.reputation = Math.max(0, state.reputation - 3);
            pushLine('😢 今天没有蛋糕可以卖，顾客们都失望地离开了……（声望 -3）');
            window.Cake.addLog('😢 今天没有蛋糕可以卖，顾客们都失望地离开了……（声望 -3）');
        } else {
            var count = Math.floor(
                2 + Math.random() * 3 + state.shopLevel +
                Math.floor(state.reputation / 25)
            );
            if (state.priceRate > 1.1) count = Math.floor(count * 0.8);
            if (state.priceRate < 0.9) count = Math.floor(count * 1.2);
            count = Math.min(Math.max(count, 1), 14);

            for (var i = 0; i < count; i++) {
                var budget = 50 + state.shopLevel * 40 +
                    Math.random() * state.reputation * 2 +
                    Math.random() * 150;
                var available = [];

                for (var j = 0; j < cakeNames.length; j++) {
                    var cn = cakeNames[j];
                    if ((state.cakes[cn] || 0) > 0 &&
                        RECIPES[cn].price * state.priceRate <= budget) {
                        available.push(cn);
                    }
                }

                if (available.length === 0) { 
                    lost++; 
                    continue; 
                }

                // 🔥 补全的核心结算逻辑：
                var pick = window.Cake.randomPick(available);
                var price = Math.round(RECIPES[pick].price * state.priceRate);
                
                // 扣除库存，增加金钱和声望
                state.cakes[pick]--;
                state.money += price;
                state.reputation += 1;
                
                // 记录本次收益
                earned += price;
                sold++;
                pushLine('🎂 卖出 ' + RECIPES[pick].emoji + pick + '，收入 ' + price + ' 元');
            }
            
            // 最终汇总一句日志
            if (sold > 0) {
                window.Cake.addLog('🛍️ 今天卖出了 ' + sold + ' 个蛋糕，赚了 ' + earned + ' 元！' + (lost > 0 ? '（有 ' + lost + ' 位顾客没买到想要的）' : ''));
            } else {
                window.Cake.addLog('😅 今天顾客嫌价格太高，什么都没卖出去！');
            }
        }

        if (typeof window.Cake.checkAchievements === 'function') {
            try { window.Cake.checkAchievements(); } catch (_) {}
        }
        window.Cake.refreshPage();
    }

    window.Cake.upgradeShop = upgradeShop;
    window.Cake.decorateShop = decorateShop;
    window.Cake.setPriceRate = setPriceRate;
    window.Cake.openShop = openShop;
})();
