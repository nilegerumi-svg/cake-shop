// js/data/achievements/recipes.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    window.Cake.ACH_RECIPES = [
        {
            id: 'allRecipes', name: '图鉴全收集', desc: '解锁全部配方', icon: '📖',
            cond: () => {
                const s = window.Cake.store?.state;
                if (!s || !s.unlockedRecipes || !window.Cake.RECIPES) return false;
                return Object.keys(s.unlockedRecipes).filter(k => s.unlockedRecipes[k]).length >= Object.keys(window.Cake.RECIPES).length;
            },
        }
    ];
})();
