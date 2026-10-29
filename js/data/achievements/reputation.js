// js/data/achievements/reputation.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    const getState = () => window.Cake.store?.state;

    window.Cake.ACH_REP = [
        {
            id: 'star', name: '甜点新星', desc: '声望达到50', icon: '⭐',
            cond: () => Number(getState()?.shop?.stats?.reputation) >= 50,
        },
        {
            id: 'fame', name: '名扬全城', desc: '声望达到150', icon: '🌟',
            cond: () => Number(getState()?.shop?.stats?.reputation) >= 150,
        },
        {
            id: 'legend', name: '甜点传奇', desc: '声望达到350', icon: '👑',
            cond: () => Number(getState()?.shop?.stats?.reputation) >= 350,
        }
    ];
})();
