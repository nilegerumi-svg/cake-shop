// festivals/harvest.js（丰收节庆祝会，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["harvest"] = {
        "festivalId": "harvest",
        "name": "丰收节庆祝会",
        "emoji": "🌾",
        "desc": "农贸市场堆满新摘的瓜果，金黄的麦穗扎成拱门，全镇都来庆祝丰收。",
        "hostPlace": "market",
        "activities": [
            {
                "id": "hv_fruit",
                "name": "尝新摘瓜果",
                "emoji": "🍎",
                "desc": "刚从地里摘的果子，咬一口都是阳光味。",
                "energy": 4,
                "minutes": 30,
                "mood": 7,
                "health": 1,
                "line": "新摘的苹果又脆又甜，你一口气尝了三种"
            },
            {
                "id": "hv_parade",
                "name": "参加丰收巡游",
                "emoji": "🚜",
                "desc": "跟着花车和锣鼓队绕市场走一圈。",
                "energy": 6,
                "minutes": 60,
                "mood": 9,
                "health": 0,
                "line": "你跟着花车队伍走了一整圈，锣鼓声把耳朵都震麻了"
            },
            {
                "id": "hv_gift",
                "name": "买时令特产",
                "emoji": "🎁",
                "desc": "南瓜干、山楂条、新米，装了一兜子。",
                "energy": 3,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你装了一兜子南瓜干和新米，感觉把整个秋天都带回了家"
            }
        ]
    };
})();
