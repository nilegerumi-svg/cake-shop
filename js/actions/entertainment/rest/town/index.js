// js/actions/entertainment/rest/town/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    // 👈 核心修复：在文件内部定义 deepFreeze，自己动手丰衣足食！
    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    window.Cake.TownRestConfig = deepFreeze({
        home: {
            nap:   { name: '家里小憩', energy: 40, time: 60 },
            sleep: { name: '睡觉', time: 'next_day' },
        },
        park: {
            nap:   { name: '公园小憩', energy: 20, time: 30 },
        },
        // 👇 新增商业街和河边的小憩配置
        street: {
            nap:   { name: '街边小憩', energy: 15, time: 30 },
        },
        river: {
            nap:   { name: '河边小憩', energy: 25, time: 40 },
        },
    });

    console.log('🏘️ [Town] 城镇休息配置装载完毕');
})();
