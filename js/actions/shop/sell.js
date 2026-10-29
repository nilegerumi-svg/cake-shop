// js/actions/shop/sell.js
(function () {
    'use strict';
    const Cake = window.Cake;

    // 价格表
    const BASE_PRICE = { small: 15, medium: 50, large: 200 };
    const QUALITY_MULT = { perfect: 2.5, good: 1.5, normal: 1.0 };

    Cake.spawnCustomer = function () {
        const state = Cake.store.state;

        // 1. 如果没开门，直接结束
        if (!state.shop.isOpen) return;

        // 2. 顾客进店概率（基于卫生度和声望，基础 30%）
        const chance = 0.3 + (state.shop.stats.cleanliness / 200);
        if (Math.random() > chance) return;

        // 3. 找货架上有什么能卖的
        const available = [];
        for (const [key, data] of Object.entries(state.foods)) {
            if (data.perfect > 0) available.push({ key, quality: 'perfect' });
            if (data.good > 0) available.push({ key, quality: 'good' });
            if (data.normal > 0) available.push({ key, quality: 'normal' });
        }

        // 没货，顾客走了
        if (available.length === 0) return;

        // 4. 随机挑一个买
        const target = Cake.randomPick(available);
        const recipe = Cake.RECIPES[target.key];
        if (!recipe) return;

        // 5. 算钱
        const base = BASE_PRICE[recipe.size] || 10;
        const mult = QUALITY_MULT[target.quality] || 1;
        const repBonus = 1 + (state.shop.stats.reputation / 100); // 声望加价
        const finalPrice = Math.floor(base * mult * repBonus);

        // 6. 结算：扣库存、加钱、扣卫生度
        state.foods[target.key][target.quality]--;
        state.money += finalPrice;
        state.shop.stats.reputation += 1;
        state.shop.stats.cleanliness = Math.max(0, state.shop.stats.cleanliness - 2);

        // 7. 记账
        const qText = target.quality === 'perfect' ? '完美✨' : target.quality === 'good' ? '优良👍' : '普通';
        Cake.addLog(`🔔 顾客买走了一份【${qText}】的 ${recipe.name}，支付了 ${finalPrice} 元！`, 'success');
    };
})();
