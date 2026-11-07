// festivals/new_year_solar.js（元旦烟花晚会，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["new_year_solar"] = {
        "festivalId": "new_year_solar",
        "name": "元旦烟花晚会",
        "emoji": "🎆",
        "desc": "广场上拉起彩带，倒计时一过，烟花准时在夜空炸开。",
        "hostPlace": "plaza",
        "activities": [
            {
                "id": "nye_firework",
                "name": "看跨年烟花",
                "emoji": "🎇",
                "desc": "和全镇人一起倒计时，看烟花点亮夜空。",
                "energy": 6,
                "minutes": 60,
                "mood": 9,
                "health": 0,
                "line": "烟花在倒计时声里炸开，你和新的一年撞了个满怀"
            },
            {
                "id": "nye_market",
                "name": "逛新年集市",
                "emoji": "🛍️",
                "desc": "小吃、手作、灯笼摊排成长龙，烟火气十足。",
                "energy": 5,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "集市上的小吃摊冒着热气，你边走边吃，心情也跟着热乎起来"
            },
            {
                "id": "nye_card",
                "name": "写新年心愿卡",
                "emoji": "✍️",
                "desc": "把新年愿望写在卡片上，挂上许愿墙。",
                "energy": 3,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你把心愿写在卡片上挂上许愿墙，感觉新的一年有盼头了"
            }
        ]
    };
})();
