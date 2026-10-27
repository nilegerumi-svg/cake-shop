(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;
    Cake._MAP_DATA_RIVER = {
        id: 'river',
        name: '河边', emoji: '🌊', cost: 8,
        desc: '水波荡漾，适合一个人静一静。',
        events: [
            { text: '你看着河水发呆，紧绷的神经放松了下来。', energy: 6 },
            { text: '你在河滩上捡到了一块漂亮的小石头。', money: 2 },
            { text: '你遇到夏栀正坐在河边看书，你们聊了几句。', xiazhi: 2 }
        ]
    };
})();
