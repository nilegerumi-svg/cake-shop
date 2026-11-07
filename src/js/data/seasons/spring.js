// js/data/seasons/spring.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    window.Cake.SEASON_SPRING = {
        id: 'spring',
        name: '春', emoji: '🌸', desc: '万物复苏，草莓与樱花的季节。',
        // 👈 白名单：春天允许出现的商品或食材 ID
        whitelist: [
            'flour_low', 'sugar', 'chicken_egg', 'milk', 'butter', 'cream',
            'strawberry', 'cherry', 'lemon',
            'basic', 'pro', 'fruit' // 材料包也包含在内
        ]
    };
})();
