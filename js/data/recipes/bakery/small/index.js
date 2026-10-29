// js/data/recipes/bakery/small/index.js
import './cakes.js';
// 以后有小面包：import './breads.js';

window.Cake = window.Cake || {};
window.Cake.RECIPES_SMALL = Object.assign(
    {},
    window.Cake.RECIPES_SMALL_CAKES
    // , window.Cake.RECIPES_SMALL_BREADS
);
console.log('📖 [Bakery/Small] 小尺寸配方合并完毕');
