// js/entertainment/map/home.js
(() => {
    'use strict';
    window.Cake = window.Cake || {};
    
    // 将地点注册到全局待合并对象中
    window.Cake._MAP_REGISTRY = window.Cake._MAP_REGISTRY || {};
    
    window.Cake._MAP_REGISTRY['home'] = {
        id: 'home',
        name: '家园周围', emoji: '🏡', cost: 8,
        desc: '熟悉的小路，宁静又安心。',
        events: [
            { text: '你在屋后的草丛里发现了一枚遗落的硬币。', money: 5 },
            { text: '邻居家的小猫跑过来蹭了蹭你。', energy: 2 }
        ]
    };
})();
