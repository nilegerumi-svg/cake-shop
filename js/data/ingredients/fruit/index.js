// js/data/ingredients/fruit/index.js
import './common.js';
import './imported.js';
window.Cake = window.Cake || {};
window.Cake.INGREDIENTS_FRUIT_ALL = Object.assign({}, window.Cake.INGREDIENTS_FRUIT, window.Cake.INGREDIENTS_FRUIT_IMPORTED);
console.log('🍎 [Ingredients/Fruit] 水果类装载完毕');
