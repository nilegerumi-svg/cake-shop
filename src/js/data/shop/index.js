// js/data/shop/index.js
import './config/index.js';
import './items/index.js';

window.Cake = window.Cake || {};
window.Cake.SHOP = {
    config: window.Cake.SHOP_CONFIG,
    items: window.Cake.SHOP_ITEMS
};

console.log('🏪 [Data/Shop] 商店数据模块装载完毕');
