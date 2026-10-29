// js/actions/shop/sell.js
(function () {
    'use strict';
    // 兼容父页面引擎与 iframe 子页面两种加载环境
    const Cake = window.Cake || (window.parent && window.parent.Cake);

    // 价格表
    const BASE_PRICE = { small: 15, medium: 50, large: 200 };
    const QUALITY_MULT = { perfect: 2.5, good: 1.5, normal: 1.0 };

    // ==================== 1. 生成顾客并结账 ====================
    Cake.spawnCustomer = function () {
        const state = Cake.store.state;

        // 如果没开门，直接结束
        if (!state.shop.isOpen) return;

        // 顾客进店概率（基于卫生度和声望，基础 30%）
        const chance = 0.3 + (state.shop.stats.cleanliness / 200);
        if (Math.random() > chance) return;

        // 找货架上有什么能卖的
        const available = [];
        for (const [key, data] of Object.entries(state.foods || {})) {
            if (data.perfect > 0) available.push({ key, quality: 'perfect' });
            if (data.good > 0) available.push({ key, quality: 'good' });
            if (data.normal > 0) available.push({ key, quality: 'normal' });
        }

        // 没货，顾客走了
        if (available.length === 0) return;

        // 随机挑一个买
        const target = Cake.randomPick(available);
        const recipe = Cake.RECIPES[target.key];
        if (!recipe) return;

        // 算钱（对齐最新逻辑：基础价 × 品质倍率 × 声望加成 × 定价策略）
        const base = BASE_PRICE[recipe.size] || 10;
        const mult = QUALITY_MULT[target.quality] || 1;
        const repBonus = 1 + (state.shop.stats.reputation / 100); 
        const priceRate = state.shop.priceRate || 1.0;
        
        let finalPrice = Math.floor(base * mult * repBonus * priceRate);
        finalPrice = Math.max(1, finalPrice); // 保底 1 块钱

        // 结算：扣库存、加钱、加声望、扣卫生度
        state.foods[target.key][target.quality]--;
        state.money += finalPrice;
        state.shop.stats.reputation += 1;
        state.shop.stats.cleanliness = Math.max(0, state.shop.stats.cleanliness - 2);

        // 记账
        const qText = target.quality === 'perfect' ? '完美✨' : target.quality === 'good' ? '优良👍' : '普通';
        Cake.addLog(`🔔 顾客买走了一份【${qText}】的 ${recipe.name}，支付了 ${finalPrice} 元！`, 'success');
    };

    // ==================== 2. 清理烤焦的失败品 ====================
    Cake.clearFailedFoods = function () {
        const state = Cake.store.state;
        let count = 0;
        
        for (const key in state.foods) {
            if (state.foods[key].failed > 0) {
                count += state.foods[key].failed;
                state.foods[key].failed = 0;
            }
        }
        
        if (count === 0) return Cake.fail('✨ 没有需要清理的失败品。');
        
        // 扔垃圾耗时 10 分钟
        Cake.advanceTime(10);
        Cake.addLog(`🗑️ 你花时间把 ${count} 个烤焦的废品扔进了垃圾桶。`, 'success');
        
        if (Cake.emit) Cake.emit('refresh_ui');
    };

    // ==================== 3. 手动卖出库存 ====================
    // 对应店铺页货架的「卖出」按钮（shop/index.html 的 data-sell 下标）
    Cake.sellItem = function (index) {
        const state = Cake.store.state;
        const inventory = state.inventory || [];
        const item = inventory[index];
        if (!item) return Cake.fail('这个商品不在货架上。');

        const data = Cake.INGREDIENTS?.[item.id] || Cake.TOOLS?.[item.id];
        if (!data) return Cake.fail('未知的商品，无法定价。');

        // 手动清仓：按基础价 8 折，品质越高折价越高（0.8 ~ 1.2 系数）
        const base = Math.max(1, Number(data.price) || 5);
        const quality = Math.max(0, Math.min(100, Number(item.quality) || 50));
        const price = Math.max(1, Math.floor(base * 0.8 * (0.8 + quality / 250)));

        inventory.splice(index, 1);
        state.money += price;

        Cake.addLog(`💰 手动卖出 ${data.name}，收入 ${price} 元。`, 'success');
        if (Cake.emit) Cake.emit('refresh_ui');
        return { success: true, price: price };
    };
})();
