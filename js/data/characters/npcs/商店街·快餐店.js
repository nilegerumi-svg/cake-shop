// js/data/characters/npcs/商店街·快餐店.js（地点：商店街·快餐店，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["sun_yumei"] = {
        "id": "sun_yumei",
        "name": "孙玉梅",
        "emoji": "🍜",
        "title": "快餐店 · 老板娘",
        "likes": "green_curry",
        "place": "商店街·快餐店",
        "intro": "快餐店的灶台前，围着围裙的阿姨正颠勺炒菜，香味飘出老远，她抬头招呼你：「哟，是蛋糕店的小老板吧？我是孙玉梅，田甜她妈，这家快餐店是我开的。那丫头总说我做的菜咸，可她自己研究起泰餐来比谁都上瘾——随我，好这一口！」",
        "chats": [
            "快餐讲究快，但味道不能糊弄。",
            "田甜小时候就爱扒着灶台看我炒菜。",
            "她爸的菜摊子，菜都是最新鲜的。"
        ],
        "work": {
            "place": "fastfood",
            "activity": "在快餐店掌勺",
            "emoji": "🍜"
        },
        "homeDetail": "梧桐里小区",
        "birthday": {
            "month": 5,
            "day": 27
        },
        "rels": [
            "田甜的母亲",
            "快餐店老板娘"
        ]
    };
})();
