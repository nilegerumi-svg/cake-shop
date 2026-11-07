// js/data/characters/npcs/商店街·菜市场.js（地点：商店街·菜市场，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["tian_guanglin"] = {
        "id": "tian_guanglin",
        "name": "田广林",
        "emoji": "🥬",
        "title": "菜市场 · 摊主",
        "likes": "green_curry",
        "place": "商店街·菜市场",
        "intro": "菜市场的摊位前，嗓门洪亮的大叔正给顾客装青菜，看见你咧嘴一笑：「哟，蛋糕店老板！我是田广林，田甜她爸，在这菜市场摆了十几年摊。那丫头手艺好，随她妈——她妈在快餐店掌勺，我负责供应食材，一家子都是干吃的！」",
        "chats": [
            "田甜那丫头，做菜比我还讲究。",
            "今天的青菜是清早现摘的，水灵！",
            "她妈做的卤肉饭，排队都买不着。"
        ],
        "work": {
            "place": "veg",
            "activity": "在菜市场出摊",
            "emoji": "🥬"
        },
        "homeDetail": "梧桐里小区",
        "birthday": {
            "month": 1,
            "day": 25
        },
        "rels": [
            "田甜的父亲",
            "菜市场摊主"
        ]
    };
})();
