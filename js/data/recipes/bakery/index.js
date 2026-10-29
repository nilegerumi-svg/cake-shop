// js/data/recipes/bakery/index.js
import './small/index.js';
import './medium/index.js';
import './large/index.js';

window.Cake = window.Cake || {};
window.Cake.RECIPES_BAKERY = Object.assign(
    {},
    window.Cake.RECIPES_SMALL,
    window.Cake.RECIPES_MEDIUM,
    window.Cake.RECIPES_LARGE
);
console.log('🍰 [Recipes/Bakery] 所有尺寸烘焙配方合并完毕');
