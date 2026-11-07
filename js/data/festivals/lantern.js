// festivals/lantern.js（元宵灯会，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["lantern"] = {
        "festivalId": "lantern",
        "name": "元宵灯会",
        "emoji": "🏮",
        "desc": "广场挂满花灯，灯谜纸条在风里哗哗响，孩子们提着兔子灯满场跑。",
        "hostPlace": "plaza",
        "activities": [
            {
                "id": "lan_riddle",
                "name": "猜灯谜",
                "emoji": "🧩",
                "desc": "花灯下挂着一排排灯谜，答对了有彩头。",
                "energy": 5,
                "minutes": 30,
                "mood": 7,
                "health": 0,
                "line": "你连猜中三盏花灯的谜面，摊主笑着塞给你一个小彩头"
            },
            {
                "id": "lan_parade",
                "name": "赏花灯巡游",
                "emoji": "✨",
                "desc": "跟着提灯的人群绕广场走一圈，满眼流光。",
                "energy": 6,
                "minutes": 60,
                "mood": 9,
                "health": 0,
                "line": "提灯的人群绕着广场缓缓流动，你在流光里走了很久很久"
            },
            {
                "id": "lan_tangyuan",
                "name": "吃热汤圆",
                "emoji": "🥣",
                "desc": "黑芝麻馅的汤圆刚出锅，甜到心里。",
                "energy": 3,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "黑芝麻馅的汤圆又烫又甜，一口下去整个人都暖了"
            }
        ]
    };
})();
