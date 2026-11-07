// js/data/ui/game_menu.js（离线包表 g5）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.UI_GAME_MENU = [
    {
        "title": "游戏进度",
        "items": [
            {
                "key": "next-day",
                "emoji": "😴",
                "label": "休息一天",
                "desc": "结束今天，进入新的一天",
                "cmd": {
                    "type": "nextDay"
                }
            },
            {
                "key": "save",
                "emoji": "💾",
                "label": "保存存档",
                "desc": "保存当前进度",
                "cmd": {
                    "type": "save"
                }
            },
            {
                "key": "load",
                "emoji": "📂",
                "label": "读取存档",
                "desc": "读取最近的存档",
                "cmd": {
                    "type": "load"
                }
            }
        ]
    },
    {
        "title": "页面跳转",
        "items": [
            {
                "key": "nav-bake",
                "emoji": "🍰",
                "label": "打开小楼厨房",
                "desc": "小楼一楼厨房：吃饭、烘焙、研发配方",
                "cmd": {
                    "type": "nav",
                    "tab": "home",
                    "module": "kitchen"
                }
            },
            {
                "key": "nav-shop",
                "emoji": "🏪",
                "label": "打开小楼店面",
                "desc": "小楼一楼店面：开店营业、装修、员工、货架",
                "cmd": {
                    "type": "nav",
                    "tab": "home",
                    "module": "store"
                }
            },
            {
                "key": "nav-town",
                "emoji": "🏘️",
                "label": "去小镇",
                "desc": "从小楼一楼店面「出门去小镇」，或直接语音前往",
                "cmd": {
                    "type": "nav",
                    "tab": "town"
                }
            },
            {
                "key": "nav-fate",
                "emoji": "📱",
                "label": "打开通讯录",
                "cmd": {
                    "type": "nav",
                    "tab": "fate"
                }
            },
            {
                "key": "nav-profile",
                "emoji": "📋",
                "label": "查看档案",
                "cmd": {
                    "type": "nav",
                    "tab": "profile"
                }
            }
        ]
    },
    {
        "title": "社交",
        "items": [
            {
                "key": "chat-closest",
                "emoji": "💬",
                "label": "和最亲近的伙伴聊天",
                "desc": "和好感度最高的伙伴聊聊天",
                "cmd": {
                    "type": "special",
                    "special": "chatClosest"
                }
            },
            {
                "key": "festival",
                "emoji": "🎂",
                "label": "查看今日生日与节日",
                "cmd": {
                    "type": "queryFestival"
                }
            },
            {
                "key": "combo",
                "emoji": "⏰",
                "label": "当前时间金钱心情",
                "cmd": {
                    "type": "queryCombo"
                }
            }
        ]
    },
    {
        "title": "信息重读",
        "items": [
            {
                "key": "page",
                "emoji": "📄",
                "label": "重读当前页面",
                "cmd": {
                    "type": "queryPage"
                }
            },
            {
                "key": "modal",
                "emoji": "🪟",
                "label": "重读最新弹窗",
                "cmd": {
                    "type": "special",
                    "special": "readLatestModal"
                }
            }
        ]
    }
];
})();
