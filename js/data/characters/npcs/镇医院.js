// js/data/characters/npcs/镇医院.js（地点：镇医院，共 2 人）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    window.Cake.NPCS["xu_deming"] = {
        "id": "xu_deming",
        "name": "许德明",
        "emoji": "💊",
        "title": "镇医院 · 药剂师",
        "likes": "katsu",
        "place": "镇医院",
        "intro": "医院药房的窗口里，戴着眼镜的中年药剂师正核对药瓶，抬头推了推眼镜：「你就是蛋糕店的小店主？我是许德明，小满他爸，在这家医院的药房干了二十年。那孩子随他妈妈，耐心好——当兽医和配药一样，都马虎不得。」",
        "chats": [
            "小满从小喜欢小动物，比喜欢药瓶多。",
            "配药要再三核对，一个数都不能错。",
            "孩子他妈在幼儿园做饭，手艺一绝。"
        ],
        "work": {
            "place": "hospital",
            "activity": "在医院药房配药",
            "emoji": "💊"
        },
        "homeDetail": "安康苑小区",
        "birthday": {
            "month": 4,
            "day": 15
        },
        "rels": [
            "许小满的父亲",
            "镇医院药剂师"
        ]
    };

    window.Cake.NPCS["chen_hulan"] = {
        "id": "chen_hulan",
        "name": "陈慧兰",
        "emoji": "💉",
        "title": "镇医院 · 护士",
        "likes": "scone",
        "place": "镇医院",
        "intro": "医院的护士站里，正在整理输液单的中年护士抬头朝你一笑：「你好，我是陈慧兰，一帆他妈，在这家医院当护士。那孩子在德国学了满肚子菜谱回来，天天念叨猪肘子——你要是有兴趣，让他露两手给你看看！」",
        "chats": [
            "一帆从小就懂事，没让我操过心。",
            "医院的夜班，和图书馆一样安静。",
            "正平总说，孩子像我又像他，两样都占。"
        ],
        "work": {
            "place": "hospital",
            "activity": "在病房护理",
            "emoji": "💉"
        },
        "homeDetail": "文苑小区",
        "birthday": {
            "month": 11,
            "day": 2
        },
        "rels": [
            "顾一帆的母亲",
            "镇医院护士"
        ]
    };
})();
