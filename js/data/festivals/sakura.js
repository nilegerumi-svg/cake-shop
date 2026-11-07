// festivals/sakura.js（樱花野餐会，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["sakura"] = {
        "festivalId": "sakura",
        "name": "樱花野餐会",
        "emoji": "🌸",
        "desc": "公园的樱花全开了，树下一块块野餐垫，花瓣落进便当盒里。",
        "hostPlace": "park",
        "activities": [
            {
                "id": "sk_picnic",
                "name": "樱花树下野餐",
                "emoji": "🍱",
                "desc": "铺开垫子，边吃点心边看花瓣飘落。",
                "energy": 6,
                "minutes": 60,
                "mood": 9,
                "health": 0,
                "line": "花瓣一片片落进便当盒，你坐在樱花树下把春天吃进了肚子里"
            },
            {
                "id": "sk_photo",
                "name": "拍樱花照片",
                "emoji": "📷",
                "desc": "挑个好角度，把满树粉白装进相册。",
                "energy": 4,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你挑了个好角度按了好几下快门，满树粉白都装进了相册"
            },
            {
                "id": "sk_craft",
                "name": "逛手作小摊",
                "emoji": "🎐",
                "desc": "樱花书签、花瓣皂，都是春天的味道。",
                "energy": 5,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你在手作摊前挑了一枚樱花书签，春天的味道算是留住了"
            }
        ]
    };
})();
