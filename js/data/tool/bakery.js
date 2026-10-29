// js/data/tool/bakery.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.TOOLS_BAKERY = {
        'oven_basic':   { id: 'oven_basic',   name: '基础烤箱',   emoji: '🔥', price: 100, cat: 'bakery', tech: 'bake',  tier: 1 },
        'oven_pro':     { id: 'oven_pro',     name: '风炉平炉一体机', emoji: '🔥', price: 800, cat: 'bakery', tech: 'bake',  tier: 3 },
        'mixer':        { id: 'mixer',        name: '手动打蛋器', emoji: '🥣', price: 30,  cat: 'bakery', tech: null,    tier: 1 },
        'mixer_stand':  { id: 'mixer_stand',  name: '厨师机',     emoji: '🤖', price: 500, cat: 'bakery', tech: null,    tier: 2 },
        'stencil':      { id: 'stencil',      name: '裱花嘴',     emoji: '🎂', price: 80,  cat: 'bakery', tech: null,    tier: 2 }
    };
})();
