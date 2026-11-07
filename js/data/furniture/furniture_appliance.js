// furniture_appliance.js（分类：appliance，共 4 项）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    var NS = 'FURNITURE';
    window.Cake[NS] = window.Cake[NS] || {};

    window.Cake[NS]["f_juicer"] = {
        "id": "f_juicer",
        "name": "榨汁机",
        "emoji": "🍹",
        "desc": "互动「榨果汁」：消耗 1 份水果得果汁，心情 +4、精力 +4",
        "category": "appliance",
        "buyPrice": 240,
        "level": 2,
        "materials": {
            "wood": 2,
            "glass": 2,
            "glue": 1
        },
        "decor": 6
    };

    window.Cake[NS]["f_coffee"] = {
        "id": "f_coffee",
        "name": "咖啡机",
        "emoji": "☕",
        "desc": "互动「煮咖啡」：每天一次，精力 +8、心情 +4",
        "category": "appliance",
        "buyPrice": 300,
        "level": 2,
        "materials": {
            "wood": 2,
            "nail": 1,
            "glass": 1
        },
        "decor": 7
    };

    window.Cake[NS]["f_fridge"] = {
        "id": "f_fridge",
        "name": "冰箱",
        "emoji": "🧊",
        "desc": "摆进店铺：全部食材新鲜度下降减半（保鲜效果，全店生效）",
        "category": "appliance",
        "buyPrice": 350,
        "level": 2,
        "materials": {
            "wood": 2,
            "nail": 2,
            "glue": 1
        },
        "decor": 7
    };

    window.Cake[NS]["f_ac"] = {
        "id": "f_ac",
        "name": "空调",
        "emoji": "❄️",
        "desc": "摆进店铺：店内舒适度提升，客人成交率 +2%、睡觉回复心情 +2",
        "category": "appliance",
        "buyPrice": 400,
        "level": 3,
        "materials": {
            "wood": 2,
            "nail": 3,
            "glass": 1
        },
        "decor": 8
    };
})();
