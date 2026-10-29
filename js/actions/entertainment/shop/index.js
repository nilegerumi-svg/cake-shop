// js/actions/entertainment/shop/index.js
import './monitor.js';
import './town/index.js';

(function () {
    'use strict';
    const Cake = window.Cake;

    // 获取某个地点的商品列表（供前端 UI 渲染调用）
    Cake.getShopItems = function (locationId) {
        const shop = Cake.TOWN_SHOPS[locationId];
        if (!shop) return [];
        
        return shop.items.map(itemId => {
            const itemData = Cake.INGREDIENTS[itemId] || Cake.TOOLS[itemId];
            return itemData ? { id: itemId, ...itemData } : null;
        }).filter(Boolean);
    };

    // 下订单（购买）逻辑
    Cake.orderItem = function (itemId, quantity = 1) {
        const state = Cake.store.state;
        const item = Cake.INGREDIENTS[itemId] || Cake.TOOLS[itemId];
        
        if (!item) return Cake.fail('❌ 找不到这件物品');
        
        quantity = Math.max(1, Math.floor(quantity));
        const isTool = !!Cake.TOOLS[itemId];
        const totalPrice = item.price * quantity;
        
        if (state.money < totalPrice) return Cake.fail('💸 钱不够啦！');

        // 扣钱
        state.money -= totalPrice;

        // 生成订单（2小时后送达）
        const arriveTime = (state.time.totalMinutes || 0) + 120;
        state.orders.push({
            itemId: itemId,
            quantity: quantity,
            isTool: isTool,
            arriveTime: arriveTime
        });

        Cake.addLog(`📞 订购了 ${item.name} ×${quantity}，将在 2 小时内送到店里。`, 'success');
        
        // 保存并通知父窗口刷新
        if (Cake.saveState) Cake.saveState();
        if (Cake.emit) Cake.emit('refresh_ui');
    };
})();

console.log('🛒 [Entertainment/Shop] 地图商店与订购系统装载完毕');
