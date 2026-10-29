// js/data/shop/config/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    window.Cake.SHOP_CONFIG = {
        name: '烘焙街角商店',
        // 每天刷新几次库存
        dailyRefreshCount: 1,
        // 默认价格倍率（以后可以搞通货膨胀或打折活动）
        priceMultiplier: 1.0,
        // 限购规则（比如高级工具每天只能买1个）
        defaultToolStock: 1,
        defaultIngredientStock: 99
    };
})();
