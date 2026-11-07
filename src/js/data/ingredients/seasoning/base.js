// js/data/ingredients/seasoning/base.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.SEASONING_BASE = {
        'salt': { name: '食盐', emoji: '🧂', price: 2, tags: ['salty'], attrs: { flavor: { salty: 100 } } },
        'sugar': { name: '白砂糖', emoji: '🍬', price: 3, tags: ['sweet'], attrs: { flavor: { sweet: 100 } } },
        'msg': { name: '味精', emoji: '✨', price: 2, tags: ['umami'], attrs: { flavor: { umami: 100 } } },
        'oil': { name: '食用油', emoji: '🧴', price: 5, tags: ['fat'], attrs: { texture: { fatty: 50 } } }
    };
})();
