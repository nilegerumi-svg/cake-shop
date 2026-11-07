// js/data/shelter/index.js（动物收容所：事件/友好度档位/捐赠规则）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.SHELTER = {
    "name": "动物收容所",
    "events": [
        {
            "id": "se_ball",
            "tier": 1,
            "text": "小狗旺财叼着球围着你转圈，陪你玩了会儿抛球（心情 +6）",
            "mood": 6
        },
        {
            "id": "se_cat",
            "tier": 1,
            "text": "猫妈妈带着小奶猫晒太阳，你帮忙梳了梳毛，它舒服地打起呼噜（友好度 +3）",
            "friendly": 3
        },
        {
            "id": "se_gate",
            "tier": 1,
            "text": "收容所的铁门吱呀作响，你动手把它修好了（工具熟练度 +3）",
            "tool": 3
        },
        {
            "id": "se_feast",
            "tier": 1,
            "text": "给动物们做了一顿加餐，大家吃得超香（料理技能 +2）",
            "cook": 2
        },
        {
            "id": "se_adopt",
            "tier": 2,
            "text": "收养日大忙！你帮忙招呼领养家庭，镇长特地送来 100 金币当谢礼",
            "coins": 100
        },
        {
            "id": "se_walk",
            "tier": 2,
            "text": "和收容所的大金毛沿河边散步，身心舒畅（健康 +5，心情 +5）",
            "health": 5,
            "mood": 5
        },
        {
            "id": "se_party",
            "tier": 2,
            "text": "动物派对之夜！小动物们收到一份神秘食材包裹（随机食材 +3）",
            "ingredient": 3
        }
    ],
    "tiers": [
        {
            "min": 0,
            "label": "初来乍到",
            "emoji": "🐾"
        },
        {
            "min": 20,
            "label": "热心投喂",
            "emoji": "🐕"
        },
        {
            "min": 60,
            "label": "志愿者",
            "emoji": "🦺"
        },
        {
            "min": 140,
            "label": "荣誉志愿者",
            "emoji": "🏅"
        }
    ],
    "dailyEventLimit": 2,
    "volunteerAt": 60,
    "honorAt": 140,
    "donate": {
        "timeMinutes": 20,
        "friendliness": "按点心品质 +1~3",
        "note": "捐赠不涨声望"
    },
    "event": {
        "timeMinutes": 60,
        "energy": 8,
        "mood": -8
    }
};
})();
