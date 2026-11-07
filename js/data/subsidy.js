// js/data/subsidy.js（市政府「新人店主扶持计划」）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.SUBSIDY = {
        programName: '新人店主扶持计划',
        emoji: '💴',
        amount: 800,          // 每月补贴
        maxMonths: 12,        // 仅开店第一年
        claimKey: 'subsidyClaimed',
        desc: '开店第一年，每月可到「市政府」找书记员领取 ¥800 补贴；一年后扶持计划结束。',
        messages: {
            ended: '第一年的扶持计划已经结束啦，往后就得靠自己啦',
            claimed: '这个月的补贴已经领过了，下个月再来吧',
            success: (month, left) => `💴 领到本月扶持补贴 ¥800！这是开店第 ${month} 个月，扶持计划还剩 ${left} 个月`
        }
    };

    // 开店第几个月（1 起算）
    window.Cake.getShopMonth = function (state, start) {
        const y = state && state.time ? state.time.year : 1;
        const m = state && state.time ? state.time.month : 1;
        const sy = start && start.year ? start.year : 1;
        const sm = start && start.month ? start.month : 1;
        return Math.max(1, (y - sy) * 12 + (m - sm) + 1);
    };

    // 本月是否已领
    window.Cake.hasClaimedSubsidy = function (state) {
        if (!state || !state.time) return false;
        const key = state.time.year + '-' + state.time.month;
        return (state.subsidyClaimed || []).includes(key);
    };
})();
