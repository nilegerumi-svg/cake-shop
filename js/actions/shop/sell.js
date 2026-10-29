// js/actions/shop/sell.js
(function () {
    'use strict';
    const Cake = window.Cake;

    // 基础售价（根据尺寸）
    const BASE_PRICE = {
        small: 15,
        medium: 50,
        large: 200
    };

    // 品质倍率
    const QUALITY_MULTIPLIER = {
        perfect: 2.5,
        good: 1.5,
        normal: 1.0
    };

    // 尝试生成并接待一位顾客（由时间引擎或点击触发）
    Cake.spawnCustomer = function () {
        const state = Cake.store.state;

        // 1. 检查是否营业
        if (!state.shop.isOpen) return false;

        // 2. 顾客光顾概率（受卫生度和声望影响）
        const chance = 0.3 + (state.shop.stats.cleanliness / 200) + (state.shop.stats.reputation / 1000);
        if (Math.random() > chance) {
            // 顾客没来，或者路过没进来
            return false; 
        }

        // 3. 找出玩家库存里能卖的蛋糕
        const availableFoods = [];
        for (const [recipeKey, foodData] of Object.entries(state.foods)) {
            if (foodData.perfect > 0) availableFoods.push({ key: recipeKey, quality: 'perfect' });
            if (foodData.good > 0) availableFoods.push({ key: recipeKey, quality: 'good' });
            if (foodData.normal > 0) availableFoods.push({ key: recipeKey, quality: 'normal' });
        }

        if (availableFoods.length === 0) {
            // 玩家店里没货了，顾客走了
            return false; 
        }

        // 4. 顾客随机挑一个买
        const target = Cake.randomPick(availableFoods);
        const recipe = Cake.RECIPES[target.key];
        if (!recipe) return false;

        // 5. 计算价格
        const basePrice = BASE_PRICE[recipe.size] || 10;
        const qMult = QUALITY_MULTIPLIER[target.quality] || 1.0;
        // 声望加成：每点声望增加 1% 售价
        const repBonus = 1 + (state.shop.stats.reputation / 100);
        const finalPrice = Math.floor(basePrice * qMult * repBonus);

        // 6. 结算
        state.foods[target.key][target.quality]--; // 扣库存
        state.money += finalPrice;                 // 加钱
        state.shop.stats.reputation += 1;          // 加声望
        state.shop.stats.cleanliness = Math.max(0, state.shop.stats.cleanliness - 2); // 卖东西会弄脏店铺

        // 7. 生成日志
        const qualityText = target.quality === 'perfect' ? '完美✨' : target.quality === 'good' ? '优良👍' : '普通';
        Cake.addLog(`🔔 顾客进店，买走了一份【${qualityText}】的 ${recipe.name}，支付了 ${finalPrice} 元！`, 'success');

        return true;
    };
})();
