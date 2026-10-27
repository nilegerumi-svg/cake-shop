// js/actions/entertainment/rest/town/events/common.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;
    
    Cake.REST_EVENTS = Cake.REST_EVENTS || {};
    
    Cake.REST_EVENTS['town_common'] = [
        {
            id: 'fly',
            action: 'nap',
            chance: 0.15, 
            text: '🪰 一只苍蝇在耳边嗡嗡作响，没怎么睡好。',
            energyBonus: -5 
        }
    ];
})();
