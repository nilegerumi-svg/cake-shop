// js/data/ingredients/dairy/index.js
import './milk.js';
import './imported.js';
window.Cake = window.Cake || {};
window.Cake.INGREDIENTS_DAIRY_ALL = Object.assign({}, window.Cake.INGREDIENTS_DAIRY, window.Cake.INGREDIENTS_DAIRY_IMPORTED);
console.log('🥛 [Ingredients/Dairy] 奶制品装载完毕');
