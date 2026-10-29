// js/actions/craft/buy.js
(function () {
    'use strict';
    const Cake = window.Cake;

    // 👈 订购动作
    Cake.orderItem = function (itemId, quantity = 1) {
        const state = Cake.store.state;
        const item = Cake.INGREDIENTS[itemId] || Cake.TOOLS[itemId];
        
        if (!item) return Cake.fail('❌ 供应商没有这件物品');

        quantity = Math.max(1, Math.floor(quantity));
        const isTool = !!Cake.TOOLS[itemId];
        const totalPrice = item.price * quantity;
        
        if (state.money < totalPrice) return Cake.fail('💸 钱不够啦！');

        // 扣款
        state.money -= totalPrice;

        // 计算送达时间：当前总分钟数 + 120 分钟配送时间
        // 假设 state.time.totalMinutes 记录的是游戏开始以来的总分钟
        const arriveTime = (state.time.totalMinutes || 0) + 120;

        // 生成订单
        state.orders.push({
            itemId: itemId,
            quantity: quantity,
            isTool: isTool,
            arriveTime: arriveTime
        });

        Cake.addLog(`📞 成功向供应商订购了 ${item.name} ×${quantity}，预计 2 小时内送达。`);
        if (Cake.refreshPage) Cake.refreshPage();
    };
})();
