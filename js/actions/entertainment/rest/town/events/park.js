// js/entertainment/rest/town/events/park.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    Cake.REST_EVENTS = Cake.REST_EVENTS || {};

    Cake.REST_EVENTS['town_park_nap'] = [
        {
            id: 'cat_visit',
            chance: 0.4, 
            text: '🐈 一只橘猫跳到了长椅上，靠着你打呼噜，你感到无比治愈。',
            energyBonus: 5 
        },
        {
            id: 'bird_poop',
            chance: 0.1, 
            condition: (state) => state.day > 3, // 只有第 3 天后才会触发这个倒霉事件
            text: '💩 一只小鸟飞过……你无奈地擦了擦衣服，心情有点糟。',
            energyBonus: -5 // 触发扣体力
        }
    ];
})();
