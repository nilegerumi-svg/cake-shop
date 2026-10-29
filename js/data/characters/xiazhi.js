// js/data/characters/xiazhi.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.CHARACTERS_DATA = window.Cake.CHARACTERS_DATA || {};

    window.Cake.CHARACTERS_DATA.xiazhi = {
        info: {
            name: '夏栀', emoji: '📚', color: '#a5d6a7',
            desc: '常驻角落写作的神秘女生，安静内敛，却总能写出动人的故事。',
            likes: ['抹茶千层', '星空蛋糕'],
            metText: '一位抱着笔记本电脑的女生在角落坐了一下午，临走时递给你一张纸条：\n「你的蛋糕让我写出了搁置已久的故事。我叫夏栀，是个写作者。」'
        },
        affEvents: {
            20:  { text: '夏栀把新书的手稿送给你：「主角开蛋糕店，原型是你。」', rep: 10 },
            40:  { text: '夏栀陪你熬夜想新品创意，你想出了限定款蛋糕。', rep: 15, ing: { chocolate: 1, cream: 1 } },
            60:  { text: '夏栀的新书火了，书里写满了你们的小店。', rep: 22, money: 200 },
            80:  { text: '夏栀在书签上写下：「和你的相遇，是我最满意的一章。」', rep: 25, money: 300 },
            100: { text: '夏栀合上电脑，认真地看着你：「我想和你一起，把以后的故事写下去。」💍', rep: 40, money: 500 }
        },
        chat: ['「在这里写稿效率特别高……大概是因为蛋糕太好吃了吧。」', '「我新写了一个角色，你猜是谁？」', '「能把爱好做成事业，你很了不起。」', '「下次能让我尝尝你研发的新品吗？」'],
        date: ['你们去了图书馆，她在你旁边安静地看了一下午书。', '她带你去看了新书签售会，把你介绍给所有人。', '你们在咖啡店一起写作，她把你的名字写进了后记。']
    };
})();
