// js/data/achievements/social.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    const anyAffectionAtLeast = (threshold) => {
        const s = window.Cake.store?.state;
        if (!s || !s.characters) return false;
        return Object.values(s.characters).some(c => Number(c?.affection) >= threshold);
    };

    window.Cake.ACH_SOCIAL = [
        {
            id: 'heart', name: '心动时刻', desc: '某位角色好感达到50', icon: '💓',
            cond: () => anyAffectionAtLeast(50),
        },
        {
            id: 'lover', name: '甜蜜恋人', desc: '某位角色好感达到100', icon: '💍',
            cond: () => anyAffectionAtLeast(100),
        }
    ];
})();
