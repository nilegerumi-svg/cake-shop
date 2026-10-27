(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    Cake.REST_EVENTS['town_common'] = [
        {
            id: 'fly',
            action: 'nap', // 只在小憩时触发
            chance: 0.15, 
            text: '🪰 一只苍蝇在耳边嗡嗡作响，没怎么睡好。',
            energyBonus: -5 
        }
    ];
})();
