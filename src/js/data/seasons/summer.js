// js/data/seasons/summer.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    window.Cake.SEASON_SUMMER = {
        id: 'summer',
        name: '夏', emoji: '🌊', desc: '炎炎夏日，适合清凉的冰品和水果。',
        whitelist: [
            'flour_low', 'sugar', 'chicken_egg', 'milk', 'butter', 'cream',
            'apple', 'pineapple', 'lemon',
            'basic', 'pro', 'fruit',
            'ice' // 假如你有冰块
        ]
    };
})();
