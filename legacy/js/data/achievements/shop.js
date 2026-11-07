// js/data/achievements/shop.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    const getState = () => window.Cake.store?.state;

    window.Cake.ACH_SHOP = [
        {
            id: 'decor', name: '装修达人', desc: '装饰度达到30', icon: '🛋️',
            cond: () => Number(getState()?.decoration) >= 30,
        },
        {
            id: 'shop5', name: '五星店铺', desc: '店铺升到5级', icon: '🏪',
            cond: () => Number(getState()?.shopLevel) >= 5,
        },
        {
            id: 'day30', name: '百日纪念', desc: '经营满30天', icon: '📅',
            cond: () => Number(getState()?.time?.day) >= 30,
        }
    ];
})();
