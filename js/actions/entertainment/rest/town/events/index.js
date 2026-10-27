// js/entertainment/rest/town/index.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 纯数据配置
    Cake.TownRestConfig = {
        home: {
            nap:   { name: '家里小憩', energy: 40, time: 60 },
            sleep: { name: '睡觉', time: 'next_day' }
        },
        park: {
            nap:   { name: '公园小憩', energy: 20, time: 30 }
            // park 没有配置 sleep，所以不能睡觉
        }
    };
})();
