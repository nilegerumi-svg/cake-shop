// js/actions/entertainment/rest/town/events/place/street.js
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
    if (Cake.__restEventStreetLoaded) return;
    Cake.__restEventStreetLoaded = true;

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

    // 商业街小憩事件
    register('town_street_nap', [
        {
            id: 'street_music',
            chance: 0.3,
            text: '🎵 你在街边的长椅上坐下，听着街头艺人拉的小提琴，感觉疲惫一扫而空。',
            energyBonus: 8,
        },
        {
            id: 'street_coffee',
            chance: 0.4,
            text: '☕ 旁边咖啡店飘来的香气让你精神一振，虽然没睡着，但也算休息过了。',
            energyBonus: 4,
        },
        {
            id: 'street_noisy',
            chance: 0.2,
            text: '🚗 商业街太嘈杂了，汽车的鸣笛声吵得你根本没法闭眼。',
            energyBonus: -3,
        }
    ]);
})();
