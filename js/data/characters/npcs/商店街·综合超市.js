// js/data/characters/npcs/商店街·综合超市.js（地点：商店街·综合超市，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["wu_lijuan"] = {
        "id": "wu_lijuan",
        "name": "吴丽娟",
        "emoji": "🛒",
        "title": "综合超市 · 店员",
        "likes": "pho",
        "place": "商店街·综合超市",
        "intro": "综合超市的货架前，正在补货的阿姨看见你，笑着直起腰：「你是蛋糕店的老板吧？我是吴丽娟，子轩他妈，在这家超市上班。那孩子整天风里来雨里去地骑车，回来就喊饿——你要是有好吃的点心，可别忘了他！」",
        "chats": [
            "子轩骑车回来，第一件事就是找吃的。",
            "超市里的调料，我闭着眼都知道在哪。",
            "他爸修车，我补货，都讲究个井井有条。"
        ],
        "work": {
            "place": "supermarket",
            "activity": "在超市理货",
            "emoji": "🛒"
        },
        "homeDetail": "文苑小区",
        "birthday": {
            "month": 12,
            "day": 21
        },
        "rels": [
            "郑子轩的母亲",
            "综合超市店员"
        ]
    };
})();
