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
            money: 200,          
            energy: 100,         
            maxEnergy: 100,      
            currentLocation: 'home', // 👈 修复：这里必须加逗号！

            // ================= 时间系统 =================
            time: {
                day: 1,              
                hour: 8,             
                minute: 0,           
                totalMinutes: 0      
            },

            // ================= 店铺经营系统 =================
            shop: {
                name: '街角烘焙坊',
                isOpen: false,       
                openTime: 8 * 60,    
                closeTime: 22 * 60,  
                priceRate: 1.0, 
                stats: {
                    cleanliness: 100, 
                    reputation: 0     
                }
            },

            // ================= 熟练度容器 =================
            skills: {
                bakery: { lv: 1, exp: 0 }, 
                cook:   { lv: 1, exp: 0 }  
            },

            recipeProf: {}, 

            // 3. 工具状态
            tools: {
                'oven_basic': { owned: true, lv: 1, exp: 0 },
                'wok': { owned: true, lv: 1, exp: 0 } 
            },

            // ================= 资产与背包 =================
            // shelfLife = 该食材的总保质期（天），分级变质按「剩余天数 / shelfLife」判定
            // 面粉与糖可久存；蛋奶刻意设为开局第 3、4 天到期，用于引导玩家体会保质期机制
            inventory: [
                { id: 'flour_low', quality: 50, shelfLife: 180, expireDay: 181, isRotten: false },
                { id: 'sugar', quality: 50, shelfLife: 365, expireDay: 366, isRotten: false },
                { id: 'chicken_egg', quality: 50, shelfLife: 7, expireDay: 4, isRotten: false },
                { id: 'milk', quality: 50, shelfLife: 7, expireDay: 5, isRotten: false }
            ],

            orders: [],

            foods: {},

            characters: {},

            unlockedRecipes: {
                'cake:muffin': true 
            }
        };
    };

    console.log('🧱 [Schema] 玩家初始存档结构定义完毕（含新手礼包）');
})();
