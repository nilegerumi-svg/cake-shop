// js/data/shop/levels.js（店铺等级：升级费用 / 家具容量）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    const levels = [];
    for (let lv = 1; lv <= 10; lv++) {
        levels.push({
            level: lv,
            upgradeCost: lv >= 10 ? null : 300 * lv,   // 升到下一级的花费；满级为 null
            furnitureCapacity: lv + 1,                  // 店内可摆放大家具上限
            label: lv >= 10 ? 'Lv.10（满级）' : `Lv.${lv}`
        });
    }
    window.Cake.SHOP_LEVELS = levels;
    window.Cake.getShopLevel = function (state) {
        const n = state && typeof state.shopUpgradeLevel === 'number' ? Math.floor(state.shopUpgradeLevel) : 1;
        const lv = Math.min(10, Math.max(1, n));
        return levels[lv - 1];
    };
})();
