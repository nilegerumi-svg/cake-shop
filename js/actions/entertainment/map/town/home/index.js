(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;
    // 把数据挂载到统一的 Cake 命名空间，等待注册表来取
    Cake._MAP_DATA_HOME = {
        id: 'home',
        name: '家园周围', emoji: '🏡', cost: 8,
        desc: '熟悉的小路，宁静又安心。',
        events: [
            { text: '你在屋后的草丛里发现了一枚遗落的硬币。', money: 5 },
            { text: '邻居家的小猫跑过来蹭了蹭你。', energy: 2 }
        ]
    };
})();
