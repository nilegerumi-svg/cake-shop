// js/actions/entertainment/map/town/river/index.js
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
    if (Cake.__mapDataRiverLoaded) return;
    Cake.__mapDataRiverLoaded = true;

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    Cake._MAP_DATA_RIVER = deepFreeze({
        id: 'river',
        name: '河边',
        emoji: '🌊',
        cost: 8,
        desc: '水波荡漾，适合一个人静一静。',
        events: [
            { text: '你看着河水发呆，紧绷的神经放松了下来。', energy: 6 },
            { text: '你在河滩上捡到了一块漂亮的小石头。', money: 2 },
            { text: '你遇到夏栀正坐在河边看书，你们聊了几句。', xiazhi: 2 },
        ],
    });
})();
