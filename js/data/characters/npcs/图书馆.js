// js/data/characters/npcs/图书馆.js（地点：图书馆，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["gu_zhengping"] = {
        "id": "gu_zhengping",
        "name": "顾正平",
        "emoji": "📚",
        "title": "图书馆 · 管理员",
        "likes": "pork_knuckle",
        "place": "图书馆",
        "intro": "图书馆的借阅台前，戴眼镜的中年男人正给书贴标签，看见你轻声笑了笑：「你是蛋糕店的店主吧？我是顾正平，一帆他爸，在这家图书馆上班。那孩子去德国留学，回来说要当志愿者——随我，坐得住，也爱往外跑。」",
        "chats": [
            "一帆从小爱看书，也爱往外跑。",
            "图书馆的书，每一本我都记得位置。",
            "孩子他妈在医院忙，我负责看家。"
        ],
        "work": {
            "place": "library",
            "activity": "在图书馆整理图书",
            "emoji": "📚"
        },
        "homeDetail": "文苑小区",
        "birthday": {
            "month": 7,
            "day": 19
        },
        "rels": [
            "顾一帆的父亲",
            "图书馆管理员"
        ]
    };
})();
