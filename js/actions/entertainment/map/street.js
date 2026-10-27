// js/entertainment/map/street.js
(() => {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake._MAP_REGISTRY = window.Cake._MAP_REGISTRY || {};

    window.Cake._MAP_REGISTRY['street'] = {
        id: 'street',
        name: '商业街', emoji: '🛍️', cost: 8,
        desc: '人来人往，充满商机与偶遇。',
        events: [
            { text: '你在街边买了一杯饮品，感觉精神好多了。', energy: 3 },
            { text: '一家新开的甜品店在发试吃，你学到了新的灵感。', rep: 2 },
            { text: '你遇到顾言正在挑选咖啡豆，他跟你点了点头。', guyan: 2 }
        ]
    };
})();
