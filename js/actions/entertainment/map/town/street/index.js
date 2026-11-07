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
        cost: 5,
        time: 15,
        desc: '这里有街角超市，可以买到基础食材。',
        events: [
            { text: '你在路边捡到了别人掉落的十块钱。', money: 10 },
            { text: '你看到一家新开的甜品店在发传单，试吃了一口，得到了灵感。', rep: 1 },
            { text: '街上人太多，你被路人不小心踩了一脚。', energy: -1 },
            { text: '你闻到了一家高级面包店飘来的香气，忍不住驻足。', rep: 1 }
        ]
    });
})();
