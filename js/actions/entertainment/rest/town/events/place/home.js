// js/entertainment/rest/town/events/home.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    Cake.REST_EVENTS = Cake.REST_EVENTS || {};

    // 绑定在 城镇-家园-小憩 的事件池
    Cake.REST_EVENTS['town_home_nap'] = [
        {
            id: 'sweet_dream',
            chance: 0.3, // 30% 概率
            text: '✨ 你做了一个关于草莓蛋糕的甜梦，醒来觉得精神焕发！',
            energyBonus: 15 // 额外体力奖励
        }
    ];

    // 绑定在 城镇-家园-睡觉 的事件池
    Cake.REST_EVENTS['town_home_sleep'] = [
        {
            id: 'good_morning',
            chance: 0.5, 
            text: '🍳 醒来时，你闻到了邻居飘来的早餐香气，心情很好。',
            // 这里可以预留加好感、加金币的逻辑，只需在 core 里扩展
        }
    ];
})();
