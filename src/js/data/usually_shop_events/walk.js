// js/data/usually_shop_events/walk.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    window.Cake.WALK_EVENTS = deepFreeze([
        { text: '你在公园散步，捡到50元！', money: 50 },
        // 👈 修复：好感度和食材 ID
        { text: '你在路上遇到林墨，他送你一块巧克力。', aff: { linmo: 3 }, ing: { chocolate: 1 } },
        { text: '你在花店旁遇到苏沐，他送你一束干花。', aff: { sumu: 3 }, rep: 3 },
        { text: '你在咖啡店遇到顾言，他请你喝咖啡。', aff: { guyan: 3 }, energy: 15 },
        { text: '你在书店遇到夏栀，她给你讲了新故事。', aff: { xiazhi: 3 }, rep: 3 },
        { text: '你观察路边的花朵，获得了新的蛋糕装饰灵感！', rep: 8 },
        { text: '你走得太远，有点累了。', energy: -15 },
        { text: '你发现了一家便宜又新鲜的食材小店！', ing: { flour_low: 2, chicken_egg: 2 } },
    ]);
})();
