// js/data/achievements/sales.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    const getState = () => window.Cake.store?.state;

    window.Cake.ACH_SALES = [
        {
            id: 'firstSell', name: '第一桶金', desc: '卖出第一个蛋糕', icon: '💰',
            cond: () => Number(getState()?.totalCakes) >= 1,
        },
        {
            id: 'rich', name: '富甲一方', desc: '资产达到10000', icon: '💎',
            cond: () => Number(getState()?.money) >= 10000,
        }
    ];
})();
