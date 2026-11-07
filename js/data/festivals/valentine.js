// festivals/valentine.js（情人节花市，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["valentine"] = {
        "festivalId": "valentine",
        "name": "情人节花市",
        "emoji": "💐",
        "desc": "商店街变成一片花的海洋，玫瑰、巧克力、告白气球到处都是。",
        "hostPlace": "street",
        "activities": [
            {
                "id": "vd_rose",
                "name": "逛玫瑰摊位",
                "emoji": "🌹",
                "desc": "红玫瑰白玫瑰摆满摊位，香气扑鼻。",
                "energy": 4,
                "minutes": 30,
                "mood": 7,
                "health": 0,
                "line": "你在玫瑰花摊前站了很久，最后挑了一束最顺眼的"
            },
            {
                "id": "vd_sweet",
                "name": "买情侣点心",
                "emoji": "🍫",
                "desc": "巧克力、心形饼干，甜点铺子排着长队。",
                "energy": 3,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你挤进甜品铺子买了一份心形点心，甜度刚刚好"
            },
            {
                "id": "vd_wall",
                "name": "逛告白墙",
                "emoji": "💌",
                "desc": "墙上贴满了写给心上人的话，暖意十足。",
                "energy": 4,
                "minutes": 30,
                "mood": 7,
                "health": 0,
                "line": "你在告白墙上读到好多真心话，忍不住也跟着祝福起来"
            }
        ]
    };
})();
