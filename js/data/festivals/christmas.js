// festivals/christmas.js（平安夜彩灯市集，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["christmas"] = {
        "festivalId": "christmas",
        "name": "平安夜彩灯市集",
        "emoji": "🎄",
        "desc": "商店街的彩灯全亮了，圣诞树闪着光，铃铛声和颂歌飘满整条街。",
        "hostPlace": "street",
        "activities": [
            {
                "id": "cm_lights",
                "name": "逛彩灯夜市",
                "emoji": "✨",
                "desc": "彩灯拱门下人来人往，到处亮晶晶的。",
                "energy": 6,
                "minutes": 60,
                "mood": 9,
                "health": 0,
                "line": "你在彩灯拱门下走了个来回，感觉整条街都在发光"
            },
            {
                "id": "cm_gift",
                "name": "挑圣诞礼物",
                "emoji": "🎁",
                "desc": "给朋友们挑几份礼物，包装纸沙沙响。",
                "energy": 4,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你挑了包装纸和缎带，把礼物包得漂漂亮亮"
            },
            {
                "id": "cm_carol",
                "name": "听圣诞颂歌",
                "emoji": "🎵",
                "desc": "合唱团在树下唱起颂歌，路人都放慢了脚步。",
                "energy": 3,
                "minutes": 30,
                "mood": 7,
                "health": 0,
                "line": "颂歌响起来的时候，你也跟着轻轻哼了两句"
            }
        ]
    };
})();
