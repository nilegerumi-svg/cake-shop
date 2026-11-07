// js/data/shop/items/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.SHOP_ITEMS = {
        // ================= 食材与材料类 =================
        ingredients: {
            // 基础粉面
            'flour_low':    { stock: 99, priceModifier: 1.0 },
            'flour_high':   { stock: 99, priceModifier: 1.0 },
            // 蛋奶
            'chicken_egg':  { stock: 50, priceModifier: 1.0 },
            'milk':         { stock: 50, priceModifier: 1.0 },
            'butter':       { stock: 20, priceModifier: 1.0 },
            // 辅料
            'sugar':        { stock: 99, priceModifier: 1.0 },
            'yeast':        { stock: 50, priceModifier: 1.0 },
            // 基建材料（造工具用的）
            'wood':         { stock: 99, priceModifier: 1.0 },
            'iron':         { stock: 50, priceModifier: 1.0 },
            'parts':        { stock: 20, priceModifier: 1.0 }
        },

        // ================= 工具类 =================
        tools: {
            // 基础起步工具
            'workbench':    { stock: 1, priceModifier: 1.0 }, // 造工具必须先买它
            'oven_basic':   { stock: 1, priceModifier: 1.0 },
            'mixer':        { stock: 2, priceModifier: 1.0 },
            'wok':          { stock: 1, priceModifier: 1.0 },
            // 中后期工具
            'stencil':      { stock: 1, priceModifier: 1.2 }  // 稍微涨点价
        }
    };

    console.log('🛒 [Data/Shop/Items] 商店商品清单装载完毕');
})();
