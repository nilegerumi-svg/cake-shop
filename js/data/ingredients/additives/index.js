// js/data/ingredients/additives/index.js
import './powder.js';
import './setting.js';
import './imported.js';
window.Cake = window.Cake || {};
window.Cake.INGREDIENTS_ADDITIVES = Object.assign(
    {},
    window.Cake.INGREDIENTS_ADD_POWDER,
    window.Cake.INGREDIENTS_ADD_SETTING,
    window.Cake.INGREDIENTS_ADDITIVES_IMPORTED
);
console.log('🧪 [Ingredients/Additives] 辅料类装载完毕');
