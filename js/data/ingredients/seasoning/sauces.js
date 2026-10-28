// js/data/ingredients/seasoning/sauces.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.SEASONING_SAUCES = {
        'soy_sauce_light': { name: '生抽', emoji: '🧴', price: 6, tags: ['salty', 'umami'], attrs: { flavor: { salty: 80, umami: 60 } } },
        'soy_sauce_dark':  { name: '老抽', emoji: '🧴', price: 6, tags: ['salty', 'color'], attrs: { flavor: { salty: 60 } } },
        'vinegar':         { name: '陈醋', emoji: '🍶', price: 5, tags: ['sour'], attrs: { flavor: { sour: 90 } } },
        'oyster_sauce':    { name: '蚝油', emoji: '🦪', price: 10, tags: ['umami'], attrs: { flavor: { umami: 90, salty: 40 } } },
        'doubanjiang':     { name: '郫县豆瓣酱', emoji: '🌶️', price: 12, tags: ['spicy', 'fermented'], attrs: { flavor: { spicy: 80, salty: 70, umami: 60 } } }
    };
})();
