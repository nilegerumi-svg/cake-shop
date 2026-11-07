// js/data/characters/linmo.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.CHARACTERS_DATA = window.Cake.CHARACTERS_DATA || {};

    window.Cake.CHARACTERS_DATA.linmo = {
        info: {
            name: '林墨', emoji: '👨‍🍳', color: '#8bc6ec',
            desc: '街角甜品教室的温柔甜点师，总是微笑着，对甜点有独特的执着。',
            likes: ['巧克力慕斯', '提拉米苏'],
            metText: '一位温柔的男性甜点师走进店里，尝了尝你的蛋糕，眼睛亮了起来：\n「我是林墨，在街角开甜品教室。你的蛋糕，有幸福的味道。」'
        },
        affEvents: {
            20:  { text: '林墨教了你一个打发奶油的小技巧，你受益匪浅。', rep: 10 },
            40:  { text: '林墨送来一盒他亲手做的巧克力：「交换，下次教我做你的招牌吧。」', ing: { chocolate: 2, cream: 1 } },
            60:  { text: '你们一起研发了一款联名蛋糕，大受好评！', rep: 22, money: 200 },
            80:  { text: '林墨在店门口放了一束玫瑰花，卡片上写着：「和你在一起，空气都是甜的。」', rep: 25, money: 300 },
            100: { text: '林墨握着你的手，轻声说：「以后的人生，我想每天都吃到你做的蛋糕……更想每天见到你。」💍', rep: 40, money: 500 }
        },
        chat: ['「今天的蛋糕闻起来真香呢……需要帮忙吗？」', '「你搅拌面糊的手法越来越熟练了。」', '「甜点能让人幸福，你做到了。」', '「要不要一起试试新口味？」'],
        date: ['你们一起逛了甜品展，他全程紧紧护着你。', '你们在甜品教室度过了一个下午，他手把手教你裱花。', '你们去看了午夜场的甜点电影，他偷偷牵了你的手。']
    };
})();
