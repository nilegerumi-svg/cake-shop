// js/actions/entertainment/rest/town/events/place/park.js
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
    if (Cake.__restEventParkLoaded) return;
    Cake.__restEventParkLoaded = true;

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

    register('town_park_nap', [
        {
            id: 'cat_visit',
            chance: 0.4,
            text: '🐈 一只橘猫跳到了长椅上，靠着你打呼噜，你感到无比治愈。',
            energyBonus: 10,
        },
    ]);
})();
