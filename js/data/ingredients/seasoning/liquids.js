// js/data/ingredients/seasoning/liquids.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.SEASONING_LIQUIDS = {
        'cooking_wine': { name: '料酒', emoji: '🍶', price: 5, tags: ['alcohol'], attrs: { flavor: { bitter: 10 } } },
        'huangjiu':     { name: '绍兴黄酒', emoji: '🍾', price: 15, tags: ['alcohol', 'premium'] },
        'sesame_oil':   { name: '香油', emoji: '🧴', price: 12, tags: ['aromatic', 'fat'], attrs: { texture: { fatty: 80 } } }
    };
})();
