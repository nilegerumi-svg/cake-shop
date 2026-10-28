// js/data/ingredients/index.js
import './grain/index.js';
import './meat/index.js';
import './seasoning/index.js';
import './vegetable/index.js';
import './important_shelf_life.js'; // 引入保质期规则

window.Cake = window.Cake || {};

// 把四大类合并成最终的总食材库
window.Cake.INGREDIENTS = Object.assign(
    {},
    window.Cake.INGREDIENTS_MEAT,
    window.Cake.INGREDIENTS_GRAIN,
    window.Cake.INGREDIENTS_SEASONING,
    window.Cake.INGREDIENTS_VEGETABLE
);

console.log('🛒 [Ingredients] 所有食材总库及保质期系统合并完毕！');
