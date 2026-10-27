// js/actions/entertainment/map/town/street/index.js
(() => {
    'use strict';
    
    // 获取全局 Cake 对象
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 🌟 正确的挂载方式：_MAP_DATA_STREET
    Cake._MAP_DATA_STREET = {
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
