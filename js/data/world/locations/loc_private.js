// loc_private.js（区域：private，共 3 项）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    var NS = 'WORLD_LOCATIONS';
    window.Cake[NS] = window.Cake[NS] || {};

    window.Cake[NS]["home"] = {
        "id": "home",
        "name": "我家",
        "emoji": "🏠",
        "tag": "睡觉·看书·梳妆",
        "desc": "回家睡觉、看书、镜前梳妆，还能在家做家常菜、摆家具。",
        "x": "3%",
        "y": "6%",
        "zone": "private"
    };

    window.Cake[NS]["villa"] = {
        "id": "villa",
        "name": "别墅区",
        "emoji": "🏰",
        "tag": "私人别墅",
        "desc": "镇郊的独栋别墅，门禁森严。想认识住在这里的伙伴，去收容所、图书馆或公园找找吧。",
        "x": "89%",
        "y": "6%",
        "zone": "private"
    };

    window.Cake[NS]["school"] = {
        "id": "school",
        "name": "学校",
        "emoji": "🏫",
        "tag": "幼儿园·小学",
        "desc": "幼儿园·小学合并校：孩子们在这里上学，老师们在这里任教，还有学生住校。非师生进不去，放学时在校门口能看到学生们的日常。",
        "x": "4%",
        "y": "68%",
        "zone": "private"
    };
})();
