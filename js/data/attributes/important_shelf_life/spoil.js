// js/data/attributes/important_shelf_life/spoil.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    // 当食材剩余保质期低于 20% 时，开始变质
    window.Cake.SPOILAGE_THRESHOLD = 0.2; 

    // 变质状态字典
    window.Cake.SPOILAGE_STATES = {
        fresh:   { name: '新鲜',     emoji: '✨', penalty: 0 },
        warning: { name: '即将变质', emoji: '⚠️', penalty: 10 },  // 扣品质
        spoiled: { name: '发酸发臭', emoji: '🤢', penalty: 50 },  // 严重扣品质
        rotten:  { name: '彻底腐烂', emoji: '☠️', penalty: 100, edible: false } // 无法食用，强制丢弃
    };

    // 计算当前食材状态的函数
    window.Cake.getSpoilageState = function (totalDays, remainingDays) {
        if (remainingDays <= 0) return window.Cake.SPOILAGE_STATES.rotten;
        
        const ratio = remainingDays / totalDays;
        if (ratio <= 0.05) return window.Cake.SPOILAGE_STATES.rotten; 
        if (ratio <= window.Cake.SPOILAGE_THRESHOLD) return window.Cake.SPOILAGE_STATES.spoiled; 
        if (ratio <= 0.4) return window.Cake.SPOILAGE_STATES.warning; 
        return window.Cake.SPOILAGE_STATES.fresh;
    };
})();
