// js/actions/entertainment/map/town/street/index.js
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
    if (Cake.__mapDataStreetLoaded) return;
    Cake.__mapDataStreetLoaded = true;

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    Cake._MAP_DATA_STREET = deepFreeze({
        id: 'street',
        name: '商业街',
        emoji: '🛍️',
        cost: 8,
        desc: '人来人往，充满商机与偶遇。',
        events: [
            { text: '你在街边买了一杯饮品，感觉精神好多了。', energy: 3 },
            { text: '一家新开的甜品店在发试吃，你学到了新的灵感。', rep: 2 },
            { text: '你遇到顾言正在挑选咖啡豆，他跟你点了点头。', guyan: 2 },
        ],
    });
})();
