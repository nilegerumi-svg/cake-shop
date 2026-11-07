// js/data/systems.js（夜市餐车 / 美食街 / 投资等系统的配置常量）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.SYSTEMS = {
        // 夜市餐车（广场·休息日晚上）
        nightMarket: {
            name: '夜市餐车',
            truckPrice: 2000,       // 购车价格
            maintenanceFee: 80,     // 每月维护费
            utilityFee: 40,         // 每月水电费
            monthlyFee: 120,        // 合计（80 + 40），跨月第一天自动扣缴
            permitPrice: 200,       // 夜市许可
            desc: '买下餐车后，休息日晚上可去广场摆夜市；每月维护费 ¥80 + 水电 ¥40。'
        },
        // 美食街投资（市政府）
        foodStreet: {
            name: '美食街',
            investCost: 2000,       // 每期投资
            investStep: 10,         // 每期进度 +10%
            target: 100,            // 建成进度
            desc: '向市政府投资美食街建设，每期 ¥2000、进度 +10%，满 100% 后美食街正式开放。'
        }
    };
})();
