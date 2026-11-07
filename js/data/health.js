// js/data/health.js（新版「疾病与心理」系统数据：状态上限 / 衰减 / 看病 / 诊断规则）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.HEALTH_SYSTEM = {
        // 状态上限（new version 常量 zt / Be / Wt / ct 均为 100）
        caps: { energy: 100, mood: 100, health: 100, satiety: 100 },

        // 每小时衰减（Fe）：饱食先掉；饱食归零后，精力/心情/健康才按比例掉
        decay: {
            satietyPerHour: 2,
            starving: { energyPerHour: 3, moodPerHour: 2, healthPerHour: 1 },
            // 心情随机衰减（tn / cA）：max(1, round(n/6 + rand*(n*7/9 - n/6)))
            moodRandom: { minFactor: 1 / 6, maxFactor: 7 / 9 }
        },

        // 看病（AI）：健康未满 100 才能看；挂号费 50；单次最多恢复 30 健康
        doctor: {
            fee: 50,
            maxRestore: 30,
            timeMinutes: 60,
            energyCost: 4,
            doctorNames: ["当日值班医生"],
            recordsCap: 0 // 0 表示不设上限（新版为无限累加 healthRecords）
        },

        // 诊断规则（SI）：按顺序匹配，第一条命中即返回
        diagnosisRules: [
            { when: "weather 为 rain / storm / snow", diagnosis: "淋雨受凉（天气湿冷，户外着了凉）", treatment: "输液驱寒 + 开感冒药，注意保暖" },
            { when: "高温晴天（sunny / cloudy 且当日为高温日）", diagnosis: "中暑（高温天体力透支，身体过热）", treatment: "输液降温 + 静养建议，多喝水" },
            { when: "satiety <= 0", diagnosis: "肠胃不适（饮食不规律，饿过头伤了胃）", treatment: "开胃药调理 + 清淡饮食建议" },
            { when: "今日未睡（sleptToday <= 0）", diagnosis: "疲劳过度（长时间熬夜未休息）", treatment: "输液补充 + 静养建议，保证睡眠" },
            { when: "stats.injuries > 0", diagnosis: "外伤（劳作或意外磕碰导致）", treatment: "清创包扎 + 消炎药，注意伤口卫生" },
            { when: "其他", diagnosis: "疲劳过度（身体状态欠佳，过度劳累）", treatment: "静养建议 + 开维生素补充" }
        ],

        // 健康档案记录字段
        healthRecordFields: ["id", "day", "hour", "weather", "doctor", "diagnosis", "treatment", "cost", "healthBefore", "healthAfter", "createdAt"]
    };
})();
