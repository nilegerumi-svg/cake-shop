// js/data/characters/npcs/商店街·家具店.js（地点：商店街·家具店，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["chen_yongfu"] = {
        "id": "chen_yongfu",
        "name": "陈永福",
        "emoji": "🪚",
        "title": "家具店 · 老木匠",
        "likes": "apple_pie",
        "place": "商店街·家具店",
        "intro": "家具店的木屑堆边，戴着手套的老师傅正刨一块木板，抬头朝你点头：「我是陈永福，叙白他爸，在这条街上做了一辈子木匠活。那孩子跟他妈学了一手好面点，随我的是手稳——有空来店里，我给你打个小木架放蛋糕用！」",
        "chats": [
            "做木匠和揉面一个道理，手要稳心要细。",
            "叙白那孩子手巧，就是不爱说话。",
            "丽华做的苹果派，我吃了几十年都不腻。"
        ],
        "work": {
            "place": "furniture",
            "activity": "在家具店打家具",
            "emoji": "🪚"
        },
        "homeDetail": "苏记老宅",
        "birthday": {
            "month": 5,
            "day": 8
        },
        "rels": [
            "陈叙白的父亲",
            "家具店·老木匠"
        ]
    };
})();
