// js/data/bundles/basic.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    window.Cake.BUNDLE_BASIC = [
        {
            id: 'basic', 
            name: '基础烘焙包', 
            emoji: '🎁',
            desc: '低筋面粉×3 · 鸡蛋×3 · 糖×3',
            cost: 50,
            contents: { flour_low: 3, chicken_egg: 3, sugar: 3 },
        }
    ];
})();
