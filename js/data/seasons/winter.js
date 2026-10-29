// js/data/seasons/winter.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    window.Cake.SEASON_WINTER = {
        id: 'winter',
        name: '冬', emoji: '❄️', desc: '寒冬腊月，热乎乎的甜点最治愈。',
        whitelist: [
            'flour_low', 'sugar', 'chicken_egg', 'milk', 'butter', 'cream',
            'cherry', 'chocolate',
            'basic', 'pro', 'choc',
            'red_bean', 'glutinous_rice' // 冬天吃红豆汤圆
        ]
    };
})();
