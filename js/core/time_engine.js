// js/core/time_engine.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    // js/core/time_engine.js (节选更新)

    Cake.advanceTime = function (minutes) {
        if (!minutes || minutes <= 0) return;
        const state = Cake.store.state;

        state.time.totalMinutes += minutes;
        let currentMins = state.time.hour * 60 + state.time.minute;
        currentMins += minutes;

        // 处理跨天
        while (currentMins >= 1440) {
            currentMins -= 1440;
            state.time.day += 1;
            
            // 新的一天：精力回满，卫生度下降
            state.energy = state.maxEnergy;
            state.shop.stats.cleanliness = Math.max(0, state.shop.stats.cleanliness - 10);
            
            Cake.addLog(`☀️ 第 ${state.time.day} 天开始了，精力已恢复。`);
        }

        // 更新当前时间
        state.time.hour = Math.floor(currentMins / 60);
        state.time.minute = currentMins % 60;

        // 检查是否到了打烊时间
        if (state.shop.isOpen && currentMins >= state.shop.closeTime) {
            state.shop.isOpen = false;
            Cake.addLog(`🌙 晚上 ${state.time.hour}:00 了，店铺自动打烊。`);
        }

        // 👈 新增：检查订单是否送达
        if (state.orders && state.orders.length > 0) {
            const arrivedOrders = [];
            state.orders = state.orders.filter(order => {
                if (state.time.totalMinutes >= order.arriveTime) {
                    arrivedOrders.push(order);
                    return false; // 从订单列表中移除
                }
                return true;
            });

            // 处理送达的物资
            arrivedOrders.forEach(order => {
                if (order.isTool) {
                    if (!state.tools[order.itemId]) {
                        state.tools[order.itemId] = { owned: true, lv: 1, exp: 0 };
                    }
                } else {
                    const item = Cake.INGREDIENTS[order.itemId];
                    const shelfLife = Cake.getRandomShelfLife((item.tags && item.tags[0]) || 'default');
                    
                    // 放入背包
                    for (let i = 0; i < order.quantity; i++) {
                        state.inventory.push({
                            id: order.itemId,
                            quality: 50, 
                            expireDay: state.time.day + shelfLife
                        });
                    }
                }
                Cake.addLog(`🚚 供应商已送达：${Cake.INGREDIENTS[order.itemId]?.name || Cake.TOOLS[order.itemId]?.name} ×${order.quantity}`);
            });
        }
    };
})();
