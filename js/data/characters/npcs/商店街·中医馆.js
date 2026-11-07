// js/data/characters/npcs/商店街·中医馆.js（地点：商店街·中医馆，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["wen_shouren"] = {
        "id": "wen_shouren",
        "name": "温守仁",
        "emoji": "🌿",
        "title": "中医馆 · 老中医",
        "likes": "paella",
        "place": "商店街·中医馆",
        "intro": "中医馆里飘着药香，正在抓药的老先生抬头看你一眼，捋了捋胡子：「年轻人，气色不错。我是温守仁，言舟他爸，这家中医馆传了三代。那孩子学了西医，我倒也不拦着——中西合璧，治病救人，路子都是好的。」",
        "chats": [
            "言舟从小记性好，药方过目不忘。",
            "西医有西医的长处，中医有中医的门道。",
            "孩子他妈在药店，我们爷俩算是同行。"
        ],
        "work": {
            "place": "street",
            "activity": "在中医馆坐诊抓药",
            "emoji": "🌿"
        },
        "homeDetail": "安康苑小区",
        "birthday": {
            "month": 3,
            "day": 30
        },
        "rels": [
            "温言舟的父亲",
            "中医馆老中医"
        ]
    };
})();
