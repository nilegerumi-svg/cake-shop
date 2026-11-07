// js/data/ingredients/meat/index.js

// 1. 引入所有具体分类的 js 文件
import './flying.js';
import './ground_common.js';
import './ground_premium.js';
import './water_common.js';
import './water_shallow.js';
import './water_bay.js';
import './water_deep.js';

// 2. 合并成统一的肉类库 INGREDIENTS_MEAT
window.Cake = window.Cake || {};
window.Cake.INGREDIENTS_MEAT = Object.assign(
    {},
    window.Cake.MEAT_FLYING,
    window.Cake.MEAT_GROUND_COMMON,
    window.Cake.MEAT_GROUND_PREMIUM,
    window.Cake.MEAT_WATER_COMMON,
    window.Cake.MEAT_WATER_SHALLOW,
    window.Cake.MEAT_WATER_BAY,
    window.Cake.MEAT_WATER_DEEP
);

// 3. 最后引入 monitor 检查工作
import './monitor.js';

console.log('🍖 [Meat] 所有肉类分类合并完毕');
