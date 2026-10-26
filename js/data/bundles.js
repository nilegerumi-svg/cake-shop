// js/data/bundles.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    // 递归冻结：contents 是嵌套对象，深冻结才能挡住内层误写
    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    window.Cake.BUNDLES = deepFreeze([
        {
            id: 'basic', name: '基础烘焙包', emoji: '🎁',
            desc: '面粉×3 · 鸡蛋×3 · 糖×3',
            cost: 50,
            contents: { flour: 3, egg: 3, sugar: 3 },
        },
        {
            id: 'pro', name: '达人烘焙包', emoji: '🧈',
            desc: '面粉×2 · 鸡蛋×2 · 黄油×2 · 奶油×2',
            cost: 120,
            contents: { flour: 2, egg: 2, butter: 2, cream: 2 },
        },
        {
            id: 'fruit', name: '鲜果奶油包', emoji: '🍓',
            desc: '水果×3 · 奶油×1',
            cost: 110,
            contents: { fruit: 3, cream: 1 },
        },
        {
            id: 'choc', name: '巧克力坚果包', emoji: '🍫',
            desc: '巧克力×2 · 坚果×2',
            cost: 100,
            contents: { chocolate: 2, nuts: 2 },
        },
    ]);
})();
