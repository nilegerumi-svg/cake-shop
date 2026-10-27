// js/actions/entertainment/rest/town/events/place/park.js
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
            energyBonus: 10 
        }
    ];
})();
