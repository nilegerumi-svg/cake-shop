// js/data/ingredients/vegetable/index.js

import './leafy.js';
import './roots.js';
import './gourds.js';
import './mushrooms.js';

window.Cake = window.Cake || {};
window.Cake.INGREDIENTS_VEGETABLE = Object.assign(
    {},
    window.Cake.VEG_LEAFY,
    window.Cake.VEG_ROOTS,
    window.Cake.VEG_GOURDS,
    window.Cake.VEG_MUSHROOMS
);

import './monitor.js';

console.log('🥬 [Vegetable] 蔬菜类合并完毕');
