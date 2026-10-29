// js/data/ingredients/additives/index.js
import './powder.js';
import './setting.js';
window.Cake = window.Cake || {};
window.Cake.INGREDIENTS_ADDITIVES = Object.assign(
    {},
    window.Cake.INGREDIENTS_ADD_POWDER,
    window.Cake.INGREDIENTS_ADD_SETTING
);
console.log('🧪 [Ingredients/Additives] 辅料类装载完毕');
