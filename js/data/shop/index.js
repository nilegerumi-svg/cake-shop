// js/data/shop/index.js
import './config/index.js';
import './items/index.js';
import './levels.js';

window.Cake = window.Cake || {};
window.Cake.SHOP = {
    config: window.Cake.SHOP_CONFIG,
    items: window.Cake.SHOP_ITEMS,
    levels: window.Cake.SHOP_LEVELS
};

console.log('🏪 [Data/Shop] 商店数据模块装载完毕');
