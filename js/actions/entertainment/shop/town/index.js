// js/actions/entertainment/shop/town/index.js
import './park/index.js';
import './river/index.js';
import './street/index.js';

window.Cake = window.Cake || {};
window.Cake.TOWN_SHOPS = {
    'street': window.Cake.SHOP_STREET,
    'park': window.Cake.SHOP_PARK,
    'river': window.Cake.SHOP_RIVER
};

console.log('🏘️ [Shop/Town] 城镇商店节点装载完毕');
