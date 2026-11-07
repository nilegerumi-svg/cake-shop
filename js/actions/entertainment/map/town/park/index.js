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
        cost: 6,
        time: 20,
        desc: '散步放松，也许会触发随机事件。',
        events: [
            { text: '你坐在长椅上，看到一只小松鼠掉下了一颗苹果。', ing: { apple: 1 } },
            { text: '微风吹过，听着鸟鸣，你觉得十分惬意。', energy: 5 },
            { text: '你在草丛里走，不小心被蚊子咬了几个包。', energy: -2 },
            { text: '你帮一位迷路的老奶奶指了路，她夸你真懂事。', rep: 2 }
        ]
    });
})();
