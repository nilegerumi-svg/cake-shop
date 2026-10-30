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

    // 店铺售卖白名单：这是蛋糕店，只允许售卖糕点类（skill === 'bakery'），
    // 额外最多放行牛奶（milk）作为官方认可的杯装饮品原料；其余食材一律禁止售出。
    // 传 null/undefined 表示所有烘焙糕点；传具体 id 则仅放行该 id。
    Cake.SHOP_SELL_EXTRA_ALLOW = ['milk'];
    Cake.canSellItem = function (itemId) {
        if (itemId == null) return true; // 糕点类调用方自行校验 skill 字段
        if (Cake.SHOP_SELL_EXTRA_ALLOW && Cake.SHOP_SELL_EXTRA_ALLOW.includes(itemId)) return true;
        const item = Cake.INGREDIENTS?.[itemId];
        if (!item) return false;
        // 只允许卖牛奶这一种食材；其余食材（面粉/蛋/调料等）不能直接售卖
        return itemId === 'milk';
    };

    // ==================== 4. 卖出成品糕点（货架新入口） ====================
    // 店铺页按 `data-sell-qty` 调用：只有烘焙糕点（skill === 'bakery'）可上架售卖
    Cake.sellFood = function (recipeKey, quality, qty = 1) {
        const state = Cake.store?.state;
        if (!state) return Cake.fail('❌ 游戏状态未就绪');

        const foods = state.foods || {};
        const data = foods[recipeKey];
        if (!data) return Cake.fail('这个糕点不在货架上。');

        const recipe = Cake.RECIPES?.[recipeKey];
        // 白名单：店铺是蛋糕店，只允许售卖烘焙糕点；料理类（cook）即使做出来了也不在店铺卖
        if (!recipe || recipe.skill !== 'bakery') {
            return Cake.fail('🧁 本店只售卖烘焙糕点，该商品不能上架出售。');
        }

        quality = quality === 'perfect' ? 'perfect' : quality === 'good' ? 'good' : 'normal';
        const available = data[quality] || 0;
        if (available <= 0) return Cake.fail('该品质的糕点没有库存。');

        qty = Math.max(1, Math.floor(qty));
        qty = Math.min(qty, available);

        // 定价：基础价 × 品质倍率 × 声誉加成 × 定价策略
        const BASE_PRICE = [undefined, { small: 15 }, { medium: 50 }, { large: 200 }];
        const basePriceBySize = { small: 15, medium: 50, large: 200 };
        const base = basePriceBySize[recipe.size] || 15;
        const QUALITY_MULT = { perfect: 2.5, good: 1.5, normal: 1.0 };
        const mult = QUALITY_MULT[quality] || 1.0;
        const repBonus = 1 + (state.shop?.stats?.reputation || 0) / 100;
        const priceRate = state.shop?.priceRate || 1.0;
        const finalPrice = Math.max(1, Math.floor(base * mult * repBonus * priceRate));

        data[quality] -= qty;
        state.money += finalPrice * qty;
        if (state.shop && state.shop.stats) state.shop.stats.reputation = (state.shop.stats.reputation || 0) + qty * 0;

        const qText = quality === 'perfect' ? '完美✨' : quality === 'good' ? '优良👍' : '普通';
        Cake.addLog?.(`💰 卖出了 ${qty} 份【${qText}】的 ${recipe.name}，收入 ${finalPrice * qty} 元。`, 'success');
        if (Cake.emit) Cake.emit('refresh_ui');
        return { success: true, price: finalPrice * qty };
    };

    // ==================== 5. 清理烤焦的失败品 ====================
    // （clearFailedFoods 逻辑保留在下方，此处仅作编号占位）
    // ==================== 3. 手动卖出库存（受白名单约束） ====================
    // 🔒 白名单：店铺只能售卖糕点类；此接口只兼容卖出"牛奶"这一种官方允许的食材，
    //    其余原材料一律拒绝，防止玩家把"未知商品/原料"卖掉。
    Cake.sellItem = function (index) {
        const state = Cake.store.state;
        const inventory = state.inventory || [];
        const item = inventory[index];
        if (!item) return Cake.fail('这个商品不在货架上。');

        // 白名单校验
        if (typeof Cake.canSellItem === 'function') {
            if (!Cake.canSellItem(item.id)) {
                return Cake.fail('🧁 本店只售卖烘焙糕点，该食材不能直接出售。');
            }
        } else if (item.id !== 'milk') {
            return Cake.fail('🧁 本店只售卖烘焙糕点，该食材不能直接出售。');
        }

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
