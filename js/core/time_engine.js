// js/core/time_engine.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    Cake.advanceTime = function (minutes) {
        if (!minutes || minutes <= 0) return;
        const state = Cake.store.state;

        try {
            // 1. 累加总分钟数
            state.time.totalMinutes += minutes;
            let currentMins = state.time.hour * 60 + state.time.minute;
            currentMins += minutes;

            // 2. 处理跨天事件
            while (currentMins >= 1440) {
                currentMins -= 1440;
                state.time.day += 1;
                Cake.triggerNewDayEvents(state);
            }

            // 3. 更新当前时间
            state.time.hour = Math.floor(currentMins / 60);
            state.time.minute = currentMins % 60;

            // 4. 检查是否到了打烊时间
            if (state.shop.isOpen && currentMins >= state.shop.closeTime) {
                state.shop.isOpen = false;
                Cake.addLog(`🌙 晚上 ${Cake.getTimeString ? Cake.getTimeString() : '22:00'} 了，店铺自动打烊。`);
            }

            // 5. 检查订单送达
            Cake.processOrders(state);

            // 6. 触发顾客进店
            if (state.shop.isOpen && typeof Cake.spawnCustomer === 'function') {
                const customerChecks = Math.floor(minutes / 10);
                for (let i = 0; i < customerChecks; i++) {
                    Cake.spawnCustomer();
                }
            }

            // 7. 保存并广播 UI 刷新
            if (typeof Cake.saveState === 'function') Cake.saveState();
            if (typeof Cake.emit === 'function') Cake.emit('refresh_ui');

        } catch (err) {
            // 👈 终极防崩溃：如果时间引擎出错，把错误打死在这里，绝不让主游戏卡死！
            console.error('❌ [TimeEngine] 时间推进时发生致命异常:', err);
            console.trace('出错的调用堆栈:'); 
        }
    };

    /* ==================== 内部辅助函数 ==================== */

    Cake.triggerNewDayEvents = function (state) {
        state.energy = state.maxEnergy;
        state.shop.stats.cleanliness = Math.max(0, state.shop.stats.cleanliness - 10);

        // 检查食材腐烂
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

        // 检查社交相遇
        if (Cake.Social && typeof Cake.Social.checkDailyMeet === 'function') {
            Cake.Social.checkDailyMeet(state);
        }

        // 👈 防御性检查：防止 seasons 模块还没加载完毕就调用
        if (typeof Cake.getSeasonByDay === 'function' && Cake.SEASONS) {
            const newSeasonId = Cake.getSeasonByDay(state.time.day);
            if (!state.time.season || state.time.season !== newSeasonId) {
                state.time.season = newSeasonId;
                const seasonData = Cake.SEASONS[newSeasonId];
                if (seasonData && Cake.addLog) {
                    Cake.addLog(`✨ 季节更替！现在是【${seasonData.name}季】 ${seasonData.emoji} —— ${seasonData.desc}`, 'success');
                }
            }
        } else {
            // 如果模块没加载完，强行兜底为 spring
            state.time.season = state.time.season || 'spring';
        }
    };

    // 处理订单送达逻辑
    Cake.processOrders = function (state) {
        if (!state.orders || state.orders.length === 0) return;

        const arrivedOrders = [];
        state.orders = state.orders.filter(order => {
            if (state.time.totalMinutes >= order.arriveTime) {
                arrivedOrders.push(order);
                return false; 
            }
            return true;
        });

        arrivedOrders.forEach(order => {
            let itemName = '';
            if (order.isTool) {
                if (!state.tools[order.itemId]) {
                    state.tools[order.itemId] = { owned: true, lv: 1, exp: 0 };
                }
                itemName = Cake.TOOLS?.[order.itemId]?.name || '未知工具';
            } else {
                const item = Cake.INGREDIENTS?.[order.itemId];
                // 👈 防御：防止 getRandomShelfLife 没加载
                const shelfLife = typeof Cake.getRandomShelfLife === 'function' 
                    ? Cake.getRandomShelfLife((item && item.tags && item.tags[0]) || 'default') 
                    : 7;
                
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
