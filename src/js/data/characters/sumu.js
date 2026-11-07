// js/data/characters/sumu.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.CHARACTERS_DATA = window.Cake.CHARACTERS_DATA || {};

    window.Cake.CHARACTERS_DATA.sumu = {
        info: {
            name: '苏沐', emoji: '🌻', color: '#ffb74d',
            desc: '隔壁花店的阳光花艺师，像向日葵一样温暖，总能带来好心情。',
            likes: ['草莓奶油蛋糕', '马卡龙'],
            metText: '隔壁花店的苏沐抱着向日葵来串门：\n「新邻居你好呀！这束花送给你，你的蛋糕店让整条街都变甜了～」'
        },
        affEvents: {
            20:  { text: '苏沐每天清晨都往你门口放一束小花。', rep: 10 },
            40:  { text: '苏沐帮你重新布置了店里的花艺，客人纷纷夸赞。', rep: 15, money: 80 },
            60:  { text: '苏沐带你去了他的花田，你采了满满一篮新鲜水果。', ing: { fruit: 3, nuts: 1 }, rep: 10 },
            80:  { text: '苏沐在花田里单膝跪下，送你一枚草编戒指：「这是我的心意，先收下好不好？」', rep: 25, money: 300 },
            100: { text: '苏沐笑得像阳光：「以后你的蛋糕配我的花，我们就是这条街最甜的组合。」💍', rep: 40, money: 500 }
        },
        chat: ['「我给你带了今天新开的花！配你的蛋糕正好～」', '「哇，你又变漂亮了！不对，你一直很漂亮！」', '「要不要来我店里看看？送你一盆薄荷～」', '「客人开心的样子，就是最好的回报吧！」'],
        date: ['你们在花田里野餐，他给你编了花环。', '他带你去逛了夜市，两个人分吃同一块蛋糕。', '你们一起种下了一株玫瑰，约定等它开花。']
    };
})();
