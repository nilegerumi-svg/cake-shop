// js/actions/entertainment/rest/town/events/place/home.js
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
    if (Cake.__restEventHomeLoaded) return;
    Cake.__restEventHomeLoaded = true;

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    Cake.REST_EVENTS = Cake.REST_EVENTS || {};

    const register = (key, events) => {
        const frozen = events.map(deepFreeze);
        const existing = Cake.REST_EVENTS[key];
        Cake.REST_EVENTS[key] = Object.freeze(
            Array.isArray(existing) ? existing.concat(frozen) : frozen
        );
    };

    register('town_home_nap', [
        {
            id: 'sweet_dream',
            chance: 0.3,
            text: '✨ 你做了一个关于草莓蛋糕的甜梦，醒来觉得精神焕发！',
            energyBonus: 15,
        },
    ]);

    register('town_home_sleep', [
        {
            id: 'good_morning',
            chance: 0.5,
            text: '🍳 醒来时，你闻到了邻居飘来的早餐香气，心情很好。',
        },
    ]);
})();
