// js/data/ingredients/seasoning/index.js

import './base.js';
import './sauces.js';
import './spices.js';
import './liquids.js';

window.Cake = window.Cake || {};
window.Cake.INGREDIENTS_SEASONING = Object.assign(
    {},
    window.Cake.SEASONING_BASE,
    window.Cake.SEASONING_SAUCES,
    window.Cake.SEASONING_SPICES,
    window.Cake.SEASONING_LIQUIDS
);

import './monitor.js';

console.log('🧂 [Seasoning] 调料类合并完毕');
