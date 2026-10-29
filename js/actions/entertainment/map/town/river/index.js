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

    if (Cake.__mapDataRiverLoaded) return;
    Cake.__mapDataRiverLoaded = true;

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    Cake._MAP_DATA_RIVER = deepFreeze({
        id: 'river',
        name: '河畔',
        emoji: '🌊',
        cost: 10,
        time: 40,
        desc: '宁静的河边，有一家老五金店。',
        events: [
            // 掉落的材料
            { text: '你在河滩上捡到了一些废弃但还能用的金属零件。', ing: { parts: 1 } },
            { text: '你看到河边有几根冲上岸的木材。', ing: { wood: 1 } },
            // 钓到鱼（你食材库里的 ID）
            { text: '你用树枝和藤蔓做了个简易鱼竿，居然钓上来一条草鱼！', ing: { carp: 1 } },
            // 休息与减益
            { text: '你吹着河风，感觉疲惫一扫而空。', energy: 10 },
            { text: '你在湿滑的岸边摔了一跤，弄得满身是泥。', energy: -3 }
        ]
    });
})();
