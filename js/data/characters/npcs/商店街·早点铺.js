// js/data/characters/npcs/商店街·早点铺.js（地点：商店街·早点铺，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["yang_zhiqiang"] = {
        "id": "yang_zhiqiang",
        "name": "杨志强",
        "emoji": "🥟",
        "title": "早点铺 · 老板",
        "likes": "scone",
        "place": "商店街·早点铺",
        "intro": "早点铺的蒸笼冒着白气，系着围裙的大叔正往笼屉里码包子，抬头招呼你：「哟，新店主！我是杨志强，依诺她爸，这家早点铺开了二十年。那丫头在医院当护士长，忙得脚不沾地——她要是念叨你家的点心，你可得给她留一份！」",
        "chats": [
            "依诺从小做事就认真，当护士正好。",
            "早起的鸟儿有虫吃，早起的客人有包子吃。",
            "她妈在布料行，裁缝手艺是一绝。"
        ],
        "work": {
            "place": "street",
            "activity": "在早点铺包包子",
            "emoji": "🥟"
        },
        "homeDetail": "安康苑小区",
        "birthday": {
            "month": 4,
            "day": 4
        },
        "rels": [
            "杨依诺的父亲",
            "早点铺老板"
        ]
    };
})();
