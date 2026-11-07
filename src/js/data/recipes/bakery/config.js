// js/data/recipes/bakery/config.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.BAKERY_SIZE_CONFIG = {
        // 小尺寸（单人/点心）
        small: {
            timeBase: 15,       // 基础耗时 15 分钟
            timeRand: 5,        // 随机浮动 0~5 分钟
            yield: 4,           // 一炉出 4 个
            successModifier: 0  // 成功率修正（小蛋糕好做，不扣成功率）
        },
        
        // 中尺寸（6寸/8寸）
        medium: {
            timeBase: 45,       
            timeRand: 10,       
            yield: 1,           // 一炉出 1 个
            successModifier: -0.1 // 稍微有点难度，成功率减 10%
        },

        // 大尺寸（多层婚礼蛋糕）
        large: {
            timeBase: 120,      
            timeRand: 30,       
            yield: 1,           
            successModifier: -0.25 // 极难，成功率减 25%
        }
    };

    console.log('⚙️ [Recipes/Bakery] 尺寸规则配置装载完毕');
})();
