// js/actions/entertainment/map/town/monitor.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 🌟 城镇区域专属事件池
    Cake.TOWN_EVENTS = [
        { 
            text: '🏘️ 城镇的街道今天格外热闹，路边的小贩在叫卖。', 
            rep: 1 
        },
        { 
            text: '📰 你在街角的公告栏看到了最新的甜品大赛海报，灵感涌现。', 
            rep: 2 
        },
        {
            text: '🚂 一辆送货车飞驰而过，溅了你一身泥水……',
            energy: -2,
            condition: (state) => state.hour > 6 && state.hour < 9 // 只有早高峰才会触发
        }
    ];
})();
