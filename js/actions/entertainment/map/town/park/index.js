// js/actions/entertainment/map/town/park/index.js
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
    if (Cake.__mapDataParkLoaded) return;
    Cake.__mapDataParkLoaded = true;

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    Cake._MAP_DATA_PARK = deepFreeze({
        id: 'park',
        name: '街心公园',
        emoji: '🌳',
        cost: 8,
        time: 45,   // ⭐ 散步耗时（分钟）
        desc: '绿树成荫，适合放松心情。',
        events: [
            { text: '你在长椅上休息了一会儿，看着喷泉发呆。', energy: 5 },
            { text: '帮一位老奶奶找回了跑丢的小狗，她连连道谢。', rep: 3 },
            { text: '你在公园的角落里，遇到了一位正在画画的人。', linmo: 2 },
        ],
    });
})();
