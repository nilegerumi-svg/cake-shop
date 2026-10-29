// js/core/schema.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    // 版本号：以后加新功能，旧存档不兼容时，这个数字会增加
    window.Cake.SCHEMA_VERSION = 1;

    // 生成一个玩家的初始存档
    window.Cake.createEmptyState = function () {
        return {
            version: window.Cake.SCHEMA_VERSION,
            
            // ================= 基础资源 =================
            money: 200,          // 👈 初始金币改为 200
            energy: 100,         // 初始精力
            maxEnergy: 100,      // 精力上限

            // ================= 时间系统 =================
            time: {
                day: 1,              // 游戏第几天
                hour: 8,             // 当前小时（8点）
                minute: 0,           // 当前分钟（0分）
                totalMinutes: 0      // 从开局到现在流逝的总分钟数
            },

            // ================= 店铺经营系统 =================
            shop: {
                name: '街角烘焙坊',
                isOpen: false,       // 是否营业
                openTime: 8 * 60,    // 营业时间 8:00 (用分钟表示)
                closeTime: 22 * 60,  // 打烊时间 22:00
                stats: {
                    cleanliness: 100, // 卫生度（影响客流）
                    reputation: 0     // 声望
                }
            },

            // ================= 熟练度容器 =================
            // 1. 厨艺大类（蛋糕和料理完全分开！）
            skills: {
                bakery: { lv: 1, exp: 0 }, // 烘焙技能
                cook:   { lv: 1, exp: 0 }  // 料理技能
            },

            // 2. 配方专属熟练度
            recipeProf: {}, 

            // 3. 工具状态（👈 新手礼包：送一台基础烤箱）
            tools: {
                'oven_basic': { owned: true, lv: 1, exp: 0 },
                'wok': { owned: true, lv: 1, exp: 0 } 
            },

            // ================= 资产与背包 =================
            // 背包数组（👈 新手礼包：送刚好够烤一炉麦芬的材料）
            inventory: [
                { id: 'flour_low', quality: 50, expireDay: 5 },
                { id: 'sugar', quality: 50, expireDay: 30 },
                { id: 'chicken_egg', quality: 50, expireDay: 3 },
                { id: 'milk', quality: 50, expireDay: 4 }
            ],

            // 未送达的订单
            orders: [],

            // 成品库存：存 { 'cake:muffin': { perfect: 0, good: 0, normal: 0, failed: 0 } }
            foods: {},

            // 已解锁的配方
            unlockedRecipes: {
                'cake:muffin': true // 开局送一个基础麦芬配方
            }
        };
    };

    console.log('🧱 [Schema] 玩家初始存档结构定义完毕（含新手礼包）');
})();
