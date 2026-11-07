// festivals/sweet_fest.js（甜蜜节甜品市集，活动 3 个）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS = window.Cake.FESTIVALS || {};
    window.Cake.FESTIVALS["sweet_fest"] = {
        "festivalId": "sweet_fest",
        "name": "甜蜜节甜品市集",
        "emoji": "🍬",
        "desc": "全镇的甜品店都摆出看家点心，评选「小镇第一甜」的投票箱前排着长队。",
        "hostPlace": "plaza",
        "activities": [
            {
                "id": "sf_taste",
                "name": "试吃全镇甜品",
                "emoji": "🍰",
                "desc": "从这头吃到那头，把每家招牌都尝一遍。",
                "energy": 5,
                "minutes": 60,
                "mood": 10,
                "health": 0,
                "line": "你从市集这头吃到那头，最后扶着腰宣布：今晚不吃了"
            },
            {
                "id": "sf_vote",
                "name": "投出「第一甜」",
                "emoji": "🗳️",
                "desc": "在投票箱前认真写下你心里的第一名。",
                "energy": 3,
                "minutes": 30,
                "mood": 6,
                "health": 0,
                "line": "你把票投给了自己最服气的那一家，期待开奖"
            },
            {
                "id": "sf_stall",
                "name": "帮忙摆试吃摊",
                "emoji": "🍡",
                "desc": "帮相熟的店家切点心、招呼客人。",
                "energy": 8,
                "minutes": 60,
                "mood": 8,
                "health": 0,
                "line": "你帮忙招呼了一下午客人，听了一下午「再来一块」"
            }
        ]
    };
})();
