// festivals/winter_solstice.js（冬至暖冬集市，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["winter_solstice"] = {
        "festivalId": "winter_solstice",
        "name": "冬至暖冬集市",
        "emoji": "🥟",
        "desc": "商店街支起一口口大锅，饺子、汤圆、羊肉汤冒着白汽，冬至大如年。",
        "hostPlace": "street",
        "activities": [
            {
                "id": "ws_dumpling",
                "name": "吃热饺子",
                "emoji": "🥟",
                "desc": "刚出锅的饺子蘸醋，一口一个。",
                "energy": 3,
                "minutes": 30,
                "mood": 7,
                "health": 0,
                "line": "刚出锅的饺子烫得你直吹气，还是忍不住一口一个"
            },
            {
                "id": "ws_soup",
                "name": "喝羊肉汤暖身",
                "emoji": "🍲",
                "desc": "一碗下肚，从嗓子暖到脚底板。",
                "energy": 3,
                "minutes": 30,
                "mood": 6,
                "health": 1,
                "line": "一碗羊肉汤下肚，你感觉整个冬天都不怕了"
            },
            {
                "id": "ws_craft",
                "name": "逛暖冬手作摊",
                "emoji": "🧣",
                "desc": "围巾、手套、暖手宝，摊主们都很热情。",
                "energy": 4,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你在手作摊挑了一条围巾，摊主笑着说「冬至戴上正合适」"
            }
        ]
    };
})();
