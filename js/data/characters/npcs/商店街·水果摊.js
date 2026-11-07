// js/data/characters/npcs/商店街·水果摊.js（地点：商店街·水果摊，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["zhao_chunmei"] = {
        "id": "zhao_chunmei",
        "name": "赵春梅",
        "emoji": "🧺",
        "title": "水果摊 · 摊主",
        "likes": "mango_mousse",
        "place": "商店街·水果摊",
        "intro": "水果摊边，系着碎花头巾的阿姨正给客人称葡萄，看见你招呼道：「哎呀，你就是开蛋糕店的姑娘/小伙吧？我是赵春梅，知夏她妈。这孩子打小就嘴甜、会来事，摊子上的水果都是她挑的——以后你俩多走动，互相照应呀！」",
        "chats": [
            "知夏这孩子，做事比我利索多了。",
            "水果要卖相好，更要口感好，一个道理。",
            "大海那个闷葫芦，也就种果树的时候话多。"
        ],
        "work": {
            "place": "fruit",
            "activity": "在水果摊卖水果",
            "emoji": "🍉"
        },
        "homeDetail": "梧桐里小区",
        "birthday": {
            "month": 8,
            "day": 3
        },
        "rels": [
            "林知夏的母亲",
            "水果摊·摊主"
        ]
    };
})();
