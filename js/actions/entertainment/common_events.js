// js/entertainment/common_events.js
(() => {
    'use strict';
    window.Cake = window.Cake || {};

    // 所有地点都会混入这些事件
    window.Cake.COMMON_WALK_EVENTS = [
        { text: '你走得太远，有点累了。', energy: -5 },
        { text: '你在路上捡到了一片漂亮的落叶，心情变好了。', rep: 1 },
        { text: '你发现一家便宜又新鲜的食材小店，买了一袋面粉。', ing: { flour: 1 } },
        { text: '你四处闲逛，享受了片刻的宁静，什么也没有发生。' }
    ];
})();
