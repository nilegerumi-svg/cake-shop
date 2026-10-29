// js/data/bundles/choc.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    window.Cake.BUNDLE_CHOC = [
        {
            id: 'choc', 
            name: '巧克力辅料包', 
            emoji: '🍫',
            desc: '黑巧克力×2 · 酵母×2',
            cost: 100,
            contents: { chocolate: 2, yeast: 2 },
        }
    ];
})();
