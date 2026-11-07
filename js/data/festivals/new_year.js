// festivals/new_year.js（春节庙会，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["new_year"] = {
        "festivalId": "new_year",
        "name": "春节庙会",
        "emoji": "🏮",
        "desc": "广场上搭起一排排红棚子：糖人、年画、舞狮、鞭炮摊前挤满了人，锣鼓声从早响到晚。",
        "hostPlace": "plaza",
        "activities": [
            {
                "id": "ny_market",
                "name": "逛年货市集",
                "emoji": "🧧",
                "desc": "挑春联、买福字、捏个糖人，把年味带回家。",
                "energy": 5,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你在庙会摊前挑了春联、福字和糖人，年味一下子就有了"
            },
            {
                "id": "ny_lion",
                "name": "看舞狮采青",
                "emoji": "🦁",
                "desc": "狮子踩着鼓点腾挪跳跃，采青的一瞬全场喝彩。",
                "energy": 8,
                "minutes": 60,
                "mood": 10,
                "health": 0,
                "line": "狮子踩着鼓点腾挪跳跃，采青的一瞬全场喝彩，你也跟着拍红了手掌"
            },
            {
                "id": "ny_firework",
                "name": "放烟花迎新春",
                "emoji": "🎆",
                "desc": "烟花在夜空炸开，许下新年第一个愿望。",
                "energy": 4,
                "minutes": 30,
                "mood": 8,
                "health": 0,
                "line": "烟花在夜空炸开，你仰头许下新年第一个愿望"
            }
        ]
    };
})();
