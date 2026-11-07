// js/data/characters/npcs/商店街·修车行.js（地点：商店街·修车行，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["zheng_haibo"] = {
        "id": "zheng_haibo",
        "name": "郑海波",
        "emoji": "🔧",
        "title": "修车行 · 师傅",
        "likes": "pho",
        "place": "商店街·修车行",
        "intro": "修车行的地沟边，满手油污的中年师傅正在拧螺丝，抬头冲你一笑：「嘿，新店主！我是郑海波，子轩他爸，这条街上的修车行是我开的。那小子整天骑着车满镇跑——随我，手停不下来。他骑的车，都是我亲手调的！」",
        "chats": [
            "子轩那辆山地车，是我一辆一辆零件攒的。",
            "修车和做人一样，螺丝要拧到位。",
            "他妈的超市里，什么稀奇货都有。"
        ],
        "work": {
            "place": "street",
            "activity": "在修车行修车",
            "emoji": "🔧"
        },
        "homeDetail": "文苑小区",
        "birthday": {
            "month": 9,
            "day": 5
        },
        "rels": [
            "郑子轩的父亲",
            "修车行师傅"
        ]
    };
})();
