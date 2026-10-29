// js/data/ingredients/index.js
import './grain/index.js';
import './meat/index.js';
import './seasoning/index.js';
import './vegetable/index.js';
import './egg/index.js';         // 👈 新单开
import './fruit/index.js';       // 👈 新单开
import './dairy/index.js';       // 👈 新单开
import './additives/index.js';   // 👈 新单开
import './important_shelf_life.js';

window.Cake = window.Cake || {};
window.Cake.INGREDIENTS = Object.assign(
    {},
    window.Cake.INGREDIENTS_MEAT,
    window.Cake.INGREDIENTS_GRAIN,
    window.Cake.INGREDIENTS_SEASONING,
    window.Cake.INGREDIENTS_VEGETABLE,
    window.Cake.INGREDIENTS_EGG_ALL,
    window.Cake.INGREDIENTS_FRUIT_ALL,
    window.Cake.INGREDIENTS_DAIRY_ALL,
    window.Cake.INGREDIENTS_ADDITIVES
);

console.log('🛒 [Ingredients] 所有食材总库合并完毕，当前种类:', Object.keys(window.Cake.INGREDIENTS).length);
