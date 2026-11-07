// festivals/qixi.js（七夕河灯会，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["qixi"] = {
        "festivalId": "qixi",
        "name": "七夕河灯会",
        "emoji": "🏮",
        "desc": "河边星星点点全是河灯，情侣们并肩坐在石阶上，牛郎织女的传说被讲了一遍又一遍。",
        "hostPlace": "river",
        "activities": [
            {
                "id": "qx_lantern",
                "name": "放河灯",
                "emoji": "🕯️",
                "desc": "在灯上写下心愿，轻轻推进河里。",
                "energy": 3,
                "minutes": 30,
                "mood": 8,
                "health": 0,
                "line": "河灯载着你的心愿顺流而下，你看了很久很久"
            },
            {
                "id": "qx_star",
                "name": "坐在河边看星星",
                "emoji": "✨",
                "desc": "夏夜的星星特别亮，传说牛郎织女今晚相会。",
                "energy": 4,
                "minutes": 60,
                "mood": 8,
                "health": 0,
                "line": "你仰头数着星星，想起牛郎织女的故事，心里也跟着亮堂起来"
            },
            {
                "id": "qx_market",
                "name": "逛鹊桥市集",
                "emoji": "🎐",
                "desc": "手作香囊、同心结、小灯笼，逛着逛着就挪不动脚。",
                "energy": 5,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你在鹊桥市集挑了一枚同心结，摊主笑着说「送人最合适」"
            }
        ]
    };
})();
