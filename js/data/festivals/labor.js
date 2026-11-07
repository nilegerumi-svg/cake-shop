// festivals/labor.js（劳动节游园会，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["labor"] = {
        "festivalId": "labor",
        "name": "劳动节游园会",
        "emoji": "🎡",
        "desc": "公园搭起舞台和游戏棚，套圈、投篮、飞镖，大人小孩都玩疯了。",
        "hostPlace": "park",
        "activities": [
            {
                "id": "lab_fair",
                "name": "逛游园集市",
                "emoji": "🎠",
                "desc": "游戏棚和零食摊一个挨一个，热闹非凡。",
                "energy": 6,
                "minutes": 60,
                "mood": 8,
                "health": 0,
                "line": "你从套圈摊逛到零食摊，手里的奖品越攒越多"
            },
            {
                "id": "lab_show",
                "name": "看民俗表演",
                "emoji": "🎭",
                "desc": "魔术、杂技、小丑，舞台前排满了人。",
                "energy": 4,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "杂技演员在高空荡来荡去，你看得手心直冒汗"
            },
            {
                "id": "lab_sport",
                "name": "参加趣味运动",
                "emoji": "🏃",
                "desc": "拔河、两人三足、袋鼠跳，出一身汗。",
                "energy": 10,
                "minutes": 60,
                "mood": 9,
                "health": 2,
                "line": "你在两人三足里摔了个跟头，爬起来接着跑，笑了一下午"
            }
        ]
    };
})();
