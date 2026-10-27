(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    Cake.TownRestConfig = {
        home: {
            nap:   { name: '家里小憩', energy: 40, time: 60 },
            sleep: { name: '睡觉', time: 'next_day' }
        },
        park: {
            nap:   { name: '公园小憩', energy: 20, time: 30 }
        }
    };
})();
