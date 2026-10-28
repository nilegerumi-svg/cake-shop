// js/data/ingredients/important_shelf_life.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    // 1. 定义不同大类的保质期规则（单位：天）
    // base: 基础保质期
    // rand: 随机浮动天数（系统会随机加 0 到 rand 天）
    window.Cake.SHELF_LIFE_RULES = {
        meat:      { base: 3,   rand: 2 },     // 肉类（冷藏）：3 ~ 5 天
        vegetable: { base: 4,   rand: 3 },     // 蔬菜：4 ~ 7 天
        grain:     { base: 180, rand: 30 },    // 谷物主食：180 ~ 210 天
        seasoning: { base: 365, rand: 50 },    // 调料：365 ~ 415 天（差不多一年多）
        default:   { base: 7,   rand: 3 }      // 兜底：其他未分类食材
    };

    // 2. 提供一个全局方法：传入类别，返回该批次食材的具体保质期天数
    window.Cake.getRandomShelfLife = function (category) {
        const rule = window.Cake.SHELF_LIFE_RULES[category] || window.Cake.SHELF_LIFE_RULES.default;
        // 生成 0 到 rand 之间的随机整数
        const extraDays = Math.floor(Math.random() * (rule.rand + 1));
        return rule.base + extraDays;
    };

    console.log('⏳ [Shelf Life] 保质期规则加载完毕');
})();
