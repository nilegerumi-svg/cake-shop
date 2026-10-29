// js/data/usually_shop_events/random.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    // 递归冻结
    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    window.Cake.RANDOM_EVENTS = deepFreeze([
        { text: '📱 一位美食博主悄悄探店，发了一篇爆款笔记！', rep: 15, money: 200 },
        { text: '🌧 今天下起了小雨，店内温馨的氛围吸引了不少躲雨的路人。', rep: 8, money: 80 },
        { text: '🐱 一只流浪猫趴在店门口，顾客们都被它治愈了～', rep: 10 },
        // 👈 修复：好感度字段统一用 aff 包裹
        { text: '💐 苏沐送来一束新开的花，店里更漂亮了！', rep: 5, aff: { sumu: 3 } },
        { text: '🎉 附近举办庆典，蛋糕大卖！', money: 300, rep: 5 },
        { text: '😔 对面新开了一家蛋糕店，抢走了一些客人。', rep: -8 },
        { text: '📝 老顾客寄来感谢信，还介绍了新客人！', rep: 10, money: 100 },
        // 👈 修复：食材 ID 统一对齐最新食材库
        { text: '🍀 你在散步时捡到一袋高级食材！', ing: { butter: 1, chocolate: 1 } },
    ]);
})();
