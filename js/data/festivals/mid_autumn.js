// festivals/mid_autumn.js（中秋赏月会，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["mid_autumn"] = {
        "festivalId": "mid_autumn",
        "name": "中秋赏月会",
        "emoji": "🌕",
        "desc": "广场摆起长桌，月饼和柚子堆成小山，月亮又圆又亮。",
        "hostPlace": "plaza",
        "activities": [
            {
                "id": "ma_moon",
                "name": "赏月吃月饼",
                "emoji": "🥮",
                "desc": "就着月光咬一口月饼，甜丝丝的。",
                "energy": 3,
                "minutes": 30,
                "mood": 8,
                "health": 0,
                "line": "月亮又圆又亮，你咬了一口莲蓉月饼，甜丝丝的"
            },
            {
                "id": "ma_riddle",
                "name": "猜灯谜",
                "emoji": "🧩",
                "desc": "灯谜挂了一长廊，答对能换柚子。",
                "energy": 5,
                "minutes": 30,
                "mood": 7,
                "health": 0,
                "line": "你猜对两道灯谜，抱着赢来的柚子心满意足"
            },
            {
                "id": "ma_story",
                "name": "听中秋故事",
                "emoji": "📖",
                "desc": "老人们围坐讲嫦娥奔月，孩子们听得入神。",
                "energy": 4,
                "minutes": 60,
                "mood": 7,
                "health": 0,
                "line": "嫦娥奔月的故事讲完，你发现月亮好像真的更圆了"
            }
        ]
    };
})();
