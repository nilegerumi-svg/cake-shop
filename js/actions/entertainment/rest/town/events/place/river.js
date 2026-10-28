// js/actions/entertainment/rest/town/events/place/river.js
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
    if (Cake.__restEventRiverLoaded) return;
    Cake.__restEventRiverLoaded = true;

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

    // 河边小憩事件
    register('town_river_nap', [
        {
            id: 'river_wind',
            chance: 0.5,
            text: '🍃 听着潺潺的流水声，吹着微风，你做了一个清凉又安心的梦。',
            energyBonus: 12,
        },
        {
            id: 'river_bird',
            chance: 0.2,
            text: '🦆 醒来时，你发现一只水鸟正歪着头在不远处看着你，非常可爱。',
            energyBonus: 5,
        },
        {
            id: 'river_sun',
            chance: 0.1,
            text: '☀️ 阳光有点刺眼，你被晒得有点晕，没能好好休息。',
            energyBonus: -2,
        }
    ]);

    // 河边睡觉事件（虽然目前不能睡，但预留好，以后如果开放了会自动生效）
    register('town_river_sleep', [
        {
            id: 'river_dream',
            chance: 0.6,
            text: '🌌 伴着河水的声音，你沉沉睡去，做了一整晚关于星空的梦。',
        }
    ]);
})();
