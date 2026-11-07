// js/data/characters/npcs/商店街·邮局.js（地点：商店街·邮局，共 1 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["du_guodong"] = {
        "id": "du_guodong",
        "name": "杜国栋",
        "emoji": "✉️",
        "title": "邮局 · 邮递员",
        "likes": "peach_tart",
        "place": "商店街·邮局",
        "intro": "邮局门口，骑着绿色邮车的邮递员大叔正往车筐里塞信件，看见你咧嘴一笑：「嘿！我是杜国栋，若溪她爸，这条街的邮递员跑了十几年。那丫头在幼儿园当老师，天天跟孩子打交道——她妈在小学教音乐，一家子都是围着孩子转的！」",
        "chats": [
            "送信送了十几年，镇上的狗都认识我。",
            "若溪小时候最爱拆我车筐里的信。",
            "她妈教音乐，家里的歌就没断过。"
        ],
        "work": {
            "place": "street",
            "activity": "在邮局分拣信件",
            "emoji": "✉️"
        },
        "homeDetail": "文苑小区",
        "birthday": {
            "month": 7,
            "day": 3
        },
        "rels": [
            "杜若溪的父亲",
            "邮局邮递员"
        ]
    };
})();
