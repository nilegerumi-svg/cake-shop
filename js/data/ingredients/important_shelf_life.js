// js/data/ingredients/important_shelf_life.js
//
// ⚠️ 保质期规则的权威定义在 js/data/attributes/important_shelf_life/shelf_life.js
// （由 attributes/index.js 先于 ingredients 加载）。
// 本文件原先重复定义了同一份规则并把它覆盖掉，现改为兜底：
// 仅当权威来源加载失败时才在此补一份，保证 getRandomShelfLife 永远可用。
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    if (typeof window.Cake.getRandomShelfLife === 'function' && window.Cake.SHELF_LIFE_RULES) {
        return; // 权威来源已就位，不重复定义
    }

    // 兜底规则（与 attributes 版本保持一致）
    window.Cake.SHELF_LIFE_RULES = window.Cake.SHELF_LIFE_RULES || {
        meat:      { base: 3,   rand: 2 },     // 肉类（冷藏）：3 ~ 5 天
        vegetable: { base: 4,   rand: 3 },     // 蔬菜：4 ~ 7 天
        grain:     { base: 180, rand: 30 },    // 谷物主食：180 ~ 210 天
        seasoning: { base: 365, rand: 50 },    // 调料：365 ~ 415 天（差不多一年多）
        default:   { base: 7,   rand: 3 }      // 兜底：其他未分类食材
    };

    window.Cake.getRandomShelfLife = function (category) {
        const rule = window.Cake.SHELF_LIFE_RULES[category] || window.Cake.SHELF_LIFE_RULES.default;
        const extraDays = Math.floor(Math.random() * (rule.rand + 1));
        return rule.base + extraDays;
    };

    console.log('⏳ [Shelf Life] 使用食材层兜底保质期规则');
})();
