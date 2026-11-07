// js/data/bundles/fruit.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    window.Cake.BUNDLE_FRUIT = [
        {
            id: 'fruit', 
            name: '鲜果奶油包', 
            emoji: '🍓',
            desc: '草莓×3 · 淡奶油×1',
            cost: 110,
            contents: { strawberry: 3, cream: 1 },
        }
    ];
})();
