// festivals/national.js（国庆庆祝晚会，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["national"] = {
        "festivalId": "national",
        "name": "国庆庆祝晚会",
        "emoji": "🎇",
        "desc": "广场挂满国旗，舞台上演着庆祝演出，夜市摊位亮起一串串彩灯。",
        "hostPlace": "plaza",
        "activities": [
            {
                "id": "na_show",
                "name": "看庆祝演出",
                "emoji": "🎤",
                "desc": "歌舞、合唱、小品，舞台前围得水泄不通。",
                "energy": 5,
                "minutes": 60,
                "mood": 9,
                "health": 0,
                "line": "台上的合唱响起时，你也跟着轻轻哼了起来"
            },
            {
                "id": "na_night",
                "name": "逛夜市摊位",
                "emoji": "🍢",
                "desc": "烤串、糖水、套圈，夜市的热闹一点不少。",
                "energy": 5,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你在夜市吃了烤串喝了糖水，最后还套中了一个小玩偶"
            },
            {
                "id": "na_wish",
                "name": "写祝福放飞灯笼",
                "emoji": "🏮",
                "desc": "把祝福写在灯上，看着它慢慢升上夜空。",
                "energy": 3,
                "minutes": 30,
                "mood": 7,
                "health": 0,
                "line": "写着祝福的灯笼越飞越高，你也跟着仰头看了很久"
            }
        ]
    };
})();
