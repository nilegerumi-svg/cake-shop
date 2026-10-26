window.Cake = window.Cake || {};
window.Cake.RANDOM_EVENTS = [
    { text: '📱 一位美食博主悄悄探店，发了一篇爆款笔记！', rep: 15, money: 200 },
    { text: '🌧 今天下起了小雨，店内温馨的氛围吸引了不少躲雨的路人。', rep: 8, money: 80 },
    { text: '🐱 一只流浪猫趴在店门口，顾客们都被它治愈了～', rep: 10 },
    { text: '💐 苏沐送来一束新开的花，店里更漂亮了！', rep: 5, sumu: 3 },
    { text: '🎉 附近举办庆典，蛋糕大卖！', money: 300, rep: 5 },
    { text: '😔 对面新开了一家蛋糕店，抢走了一些客人。', rep: -8 },
    { text: '📝 老顾客寄来感谢信，还介绍了新客人！', rep: 10, money: 100 },
    { text: '🍀 你在散步时捡到一袋高级食材！', ing: { butter: 1, chocolate: 1 } },
];

window.Cake.WALK_EVENTS = [
    { text: '你在公园散步，捡到50元！', money: 50 },
    { text: '你在路上遇到林墨，他送你一块巧克力。', linmo: 3, ing: { chocolate: 1 } },
    { text: '你在花店旁遇到苏沐，他送你一束干花。', sumu: 3, rep: 3 },
    { text: '你在咖啡店遇到顾言，他请你喝咖啡。', guyan: 3, energy: 15 },
    { text: '你在书店遇到夏栀，她给你讲了新故事。', xiazhi: 3, rep: 3 },
    { text: '你观察路边的花朵，获得了新的蛋糕装饰灵感！', rep: 8 },
    { text: '你走得太远，有点累了。', energy: -15 },
    { text: '你发现了一家便宜又新鲜的食材小店！', ing: { flour: 2, egg: 2 } },
];