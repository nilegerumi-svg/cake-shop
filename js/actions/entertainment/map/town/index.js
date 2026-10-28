// js/actions/entertainment/map/town/home/index.js
(() => {
    'use strict';

    const getCake = () => {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) {
                return window.parent.Cake;
            }
        } catch (_) { /* 跨域忽略 */ }
        return window.Cake || null;
    };

    const Cake = getCake();
    if (!Cake) return;

    // 防重复挂载
    if (Cake.__mapDataHomeLoaded) return;
    Cake.__mapDataHomeLoaded = true;

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    Cake._MAP_DATA_HOME = deepFreeze({
        id: 'home',
        name: '家园周围',
        emoji: '🏡',
        cost: 8,
        time: 30,   // ⭐ 散步耗时（分钟）
        desc: '熟悉的小路，宁静又安心。',
        events: [
            { text: '你在屋后的草丛里发现了一枚遗落的硬币。', money: 5 },
            { text: '邻居家的小猫跑过来蹭了蹭你。', energy: 2 },
        ],
    });
})();
