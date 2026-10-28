// js/data/ingredients/grain/index.js

import './rice.js';
import './wheat.js';
import './coarse_grains.js';
import './beans.js';

window.Cake = window.Cake || {};
window.Cake.INGREDIENTS_GRAIN = Object.assign(
    {},
    window.Cake.GRAIN_RICE,
    window.Cake.GRAIN_WHEAT,
    window.Cake.GRAIN_COARSE,
    window.Cake.GRAIN_BEANS
);

import './monitor.js';

console.log('🌾 [Grain] 谷物主食类合并完毕');
