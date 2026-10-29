// js/data/recipes/index.js
import './bakery/index.js';
import './China_reciped/index.js'; // 👈 引入中国菜

window.Cake = window.Cake || {};
window.Cake.RECIPES = Object.assign(
    {},
    window.Cake.RECIPES_BAKERY,
    window.Cake.RECIPES_CHINA // 👈 合并到全局菜谱
);
