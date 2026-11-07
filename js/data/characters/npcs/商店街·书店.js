// js/data/characters/npcs/商店街·书店.js（地点：商店街·书店，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["bai_shijie"] = {
        "id": "bai_shijie",
        "name": "白世杰",
        "emoji": "📖",
        "title": "书店 · 店主",
        "likes": "strawberry_cake",
        "place": "商店街·书店",
        "intro": "书店的柜台前，戴着眼镜的中年男人正在翻一本新到的绘本，抬头温和地笑了笑：「你是蛋糕店的老板吧？我是白世杰，秋秋她爸，这家书店开了不少年。那丫头在幼儿园带小班，自己还像个孩子——她妈开理发店，天天琢磨怎么给人剪好看。」",
        "chats": [
            "秋秋小时候，最爱坐在书店地上看书。",
            "绘本进货，我都挑最有趣的。",
            "她妈总说，我们爷俩一个看书一个睡觉。"
        ],
        "work": {
            "place": "bookstore",
            "activity": "在书店看店",
            "emoji": "📖"
        },
        "homeDetail": "文苑小区",
        "birthday": {
            "month": 2,
            "day": 16
        },
        "rels": [
            "白秋秋的父亲",
            "书店店主"
        ]
    };
})();
