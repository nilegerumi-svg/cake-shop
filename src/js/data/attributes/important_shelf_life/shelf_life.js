// js/data/attributes/important_shelf_life/shelf_life.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    // 传统保质期规则（单位：天），带随机浮动
    // key 与食材的 shelfCategory 对应（见 js/data/ingredients/index.js 的分类打标）
    window.Cake.SHELF_LIFE_RULES = {
        meat:      { base: 3,   rand: 2 },     // 肉类：3~5天
        egg:       { base: 7,   rand: 3 },     // 蛋类：7~10天
        dairy:     { base: 5,   rand: 3 },     // 奶制品：5~8天
        fruit:     { base: 5,   rand: 3 },     // 水果：5~8天
        vegetable: { base: 4,   rand: 3 },     // 蔬菜：4~7天
        grain:     { base: 180, rand: 30 },    // 谷物：半年左右
        seasoning: { base: 365, rand: 50 },    // 调料：一年以上
        additive:  { base: 180, rand: 30 },    // 辅料/添加剂：半年左右
        material:  { base: 3650, rand: 0 },    // 建材：不会腐坏
        default:   { base: 7,   rand: 3 }      // 兜底
    };

    window.Cake.getRandomShelfLife = function (category) {
        const rule = window.Cake.SHELF_LIFE_RULES[category] || window.Cake.SHELF_LIFE_RULES.default;
        const extraDays = Math.floor(Math.random() * (rule.rand + 1));
        return rule.base + extraDays;
    };
})();
