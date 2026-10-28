// js/data/ingredients/seasoning/spices.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.SEASONING_SPICES = {
        'ginger': { name: '生姜', emoji: '🫚', price: 3, tags: ['aromatic'], attrs: { flavor: { spicy: 20 } } },
        'garlic': { name: '大蒜', emoji: '🧄', price: 3, tags: ['aromatic'], attrs: { flavor: { spicy: 15 } } },
        'scallion': { name: '大葱', emoji: '🧅', price: 2, tags: ['aromatic'] },
        'sichuan_pepper': { name: '花椒', emoji: '🌿', price: 15, tags: ['numbing'], attrs: { flavor: { numbing: 100 } } },
        'star_anise': { name: '八角', emoji: '⭐', price: 8, tags: ['aromatic'], attrs: { flavor: { sweet: 10 } } }
    };
})();
