// characters/npcs/schedule.js（NPC 日常行动模式：上班族 / 闲人 两套日程模板）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPC_SCHEDULES = {
        worker: [
                {
                        "start": 8,
                        "end": 12,
                        "place": "@work.place",
                        "activity": "@work.activity",
                        "emoji": "@work.emoji",
                        "access": "public"
                },
                {
                        "start": 12,
                        "end": 13,
                        "place": "plaza",
                        "activity": "在广场吃午饭",
                        "emoji": "🍱",
                        "access": "public"
                },
                {
                        "start": 13,
                        "end": 18,
                        "place": "@work.place",
                        "activity": "@work.activity",
                        "emoji": "@work.emoji",
                        "access": "public"
                },
                {
                        "start": 18,
                        "end": 22,
                        "place": "residential",
                        "activity": "回家休息",
                        "emoji": "🏘️",
                        "access": "private"
                }
        ],
        leisure: [
                {
                        "start": 8,
                        "end": 10,
                        "place": "residential",
                        "activity": "在家吃早餐",
                        "emoji": "🥣",
                        "access": "private"
                },
                {
                        "start": 10,
                        "end": 12,
                        "place": "street",
                        "activity": "买菜逛街",
                        "emoji": "🛒",
                        "access": "public"
                },
                {
                        "start": 12,
                        "end": 14,
                        "place": "plaza",
                        "activity": "在广场遛弯",
                        "emoji": "🚶",
                        "access": "public"
                },
                {
                        "start": 14,
                        "end": 17,
                        "place": "park",
                        "activity": "在公园散步",
                        "emoji": "🌳",
                        "access": "public"
                },
                {
                        "start": 17,
                        "end": 22,
                        "place": "residential",
                        "activity": "在家休息",
                        "emoji": "🏘️",
                        "access": "private"
                }
        ]
    };
    // 占位符 @work.place / @work.activity / @work.emoji 用 NPC 的 work 字段填充
    window.Cake.buildNpcSchedule = function (npc, kind) {
        var tpl = window.Cake.NPC_SCHEDULES[kind || 'worker'] || [];
        var w = (npc && npc.work) || {};
        return tpl.map(function (seg) {
            var out = { start: seg.start, end: seg.end, access: seg.access, emoji: seg.emoji };
            var rep = function (v) { return typeof v === 'string' ? v.replace('@work.place', w.place || '').replace('@work.activity', w.activity || '').replace('@work.emoji', w.emoji || '') : v; };
            out.place = rep(seg.place); out.activity = rep(seg.activity); out.emoji = rep(seg.emoji);
            return out;
        });
    };
    console.log('🗓️ [NPC] 日程模板:', Object.keys(window.Cake.NPC_SCHEDULES).join(' / '));
})();
