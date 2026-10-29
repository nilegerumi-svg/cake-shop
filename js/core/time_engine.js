// js/core/time_engine.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    Cake.advanceTime = function (minutes) {
        if (!minutes || minutes <= 0) return;
        const state = Cake.store.state;

        // 1. 累加总分钟数并计算当前这一天过了多少分钟
        state.time.totalMinutes += minutes;
        let currentMins = state.time.hour * 60 + state.time.minute;
        currentMins += minutes;

        // 2. 处理跨天事件
        while (currentMins >= 1440) {
            currentMins -= 1440;
            state.time.day += 1;
            
            // 触发跨天结算：精力回满、卫生度下降、食材腐烂
            Cake.triggerNewDayEvents(state);
        }

        // 3. 更新当前时间
        state.time.hour = Math.floor(currentMins / 60);
        state.time.minute = currentMins % 60;

        // 4. 检查是否到了打烊时间
        if (state.shop.isOpen && currentMins >= state.shop.closeTime) {
            state.shop.isOpen = false;
            Cake.addLog(`🌙 晚上 ${Cake.getTimeString()} 了，店铺自动打烊。`);
        }

        // 5. 检查订单送达
        Cake.processOrders(state);

        // 6. 触发顾客进店（如果在营业中，按时间比例生成）
        if (state.shop.isOpen && typeof Cake.spawnCustomer === 'function') {
            const customerChecks = Math.floor(minutes / 10); // 每 10 分钟尝试来一个
            for (let i = 0; i < customerChecks; i++) {
                Cake.spawnCustomer();
            }
        }

        // 7. 保存并广播 UI 刷新
        if (typeof Cake.saveState === 'function') Cake.saveState();
        if (typeof Cake.emit === 'function') Cake.emit('refresh_ui');
    };

    /* ==================== 内部辅助函数 ==================== */

    // 跨天结算逻辑
    Cake.triggerNewDayEvents = function (state) {
        // 精力回满
        state.energy = state.maxEnergy;
        
        // 卫生度自然下降
        state.shop.stats.cleanliness = Math.max(0, state.shop.stats.cleanliness - 10);

        // 👈 检查食材腐烂
        let rottenCount = 0;
        if (state.inventory && state.inventory.length > 0) {
            state.inventory.forEach(item => {
                if (state.time.day > item.expireDay && !item.isRotten) {
                    item.isRotten = true;
                    rottenCount++;
                }
            });
        }

        Cake.addLog(`☀️ 第 ${state.time.day} 天开始了，精力已恢复。`);
        if (rottenCount > 0) {
            Cake.addLog(`🤢 有 ${rottenCount} 份食材因为过期而腐烂了，记得清理！`, 'error');
        }

        // 👈 调用社交引擎检查是否有新角色登场
        if (Cake.Social && typeof Cake.Social.checkDailyMeet === 'function') {
            Cake.Social.checkDailyMeet(state);
        }

        // 👈 新增：跨天季节检测
        const newSeasonId = Cake.getSeasonByDay(state.time.day);
        if (!state.time.season || state.time.season !== newSeasonId) {
            state.time.season = newSeasonId;
            const seasonData = Cake.SEASONS[newSeasonId];
            if (Cake.addLog) {
                Cake.addLog(`✨ 季节更替！现在是【${seasonData.name}季】 ${seasonData.emoji} —— ${seasonData.desc}`, 'success');
            }
        }
    };

    // 处理订单送达逻辑
    Cake.processOrders = function (state) {
        if (!state.orders || state.orders.length === 0) return;

        const arrivedOrders = [];
        state.orders = state.orders.filter(order => {
            if (state.time.totalMinutes >= order.arriveTime) {
                arrivedOrders.push(order);
                return false; // 从待送达列表移除
            }
            return true;
        });

        arrivedOrders.forEach(order => {
            let itemName = '';
            if (order.isTool) {
                if (!state.tools[order.itemId]) {
                    state.tools[order.itemId] = { owned: true, lv: 1, exp: 0 };
                }
                itemName = Cake.TOOLS[order.itemId]?.name || '未知工具';
            } else {
                const item = Cake.INGREDIENTS[order.itemId];
                const shelfLife = Cake.getRandomShelfLife((item && item.tags && item.tags[0]) || 'default');
                
                // 放入背包
                for (let i = 0; i < order.quantity; i++) {
                    state.inventory.push({
                        id: order.itemId,
                        quality: 50, 
                        expireDay: state.time.day + shelfLife
                    });
                }
                itemName = item?.name || '未知食材';
            }
            Cake.addLog(`🚚 供应商已送达：${itemName} ×${order.quantity}`, 'success');
        });
    };
})();
