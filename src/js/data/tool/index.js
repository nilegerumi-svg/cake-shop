// js/data/tool/index.js
import './bakery.js';
import './kitchen.js';
import './promo.js';
import './decor.js';
import './daily.js';
import './meta.js';

window.Cake = window.Cake || {};
// 把全宇宙的工具合并到统一的 Cake.TOOLS 中
window.Cake.TOOLS = Object.assign(
    {},
    window.Cake.TOOLS_BAKERY,
    window.Cake.TOOLS_KITCHEN,
    window.Cake.TOOLS_PROMO,
    window.Cake.TOOLS_DECOR,
    window.Cake.TOOLS_DAILY,
    window.Cake.TOOLS_META
);

console.log('🛠️ [Data/Tool] 所有工具分类合并完毕，当前总数:', Object.keys(window.Cake.TOOLS).length);
