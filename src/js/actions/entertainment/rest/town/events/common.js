// js/actions/entertainment/rest/town/events/common.js
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
    if (Cake.__restEventCommonLoaded) return;
    Cake.__restEventCommonLoaded = true;

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    Cake.REST_EVENTS = Cake.REST_EVENTS || {};

    // concat 合并而非覆盖，避免与其他模块注册的同名 key 冲突
    const register = (key, events) => {
        const frozen = events.map(deepFreeze);
        const existing = Cake.REST_EVENTS[key];
        Cake.REST_EVENTS[key] = Object.freeze(
            Array.isArray(existing) ? existing.concat(frozen) : frozen
        );
    };

    register('town_common', [
        {
            id: 'fly',
            action: 'nap',
            chance: 0.15,
            text: '🪰 一只苍蝇在耳边嗡嗡作响，没怎么睡好。',
            energyBonus: -5,
        },
    ]);
})();
