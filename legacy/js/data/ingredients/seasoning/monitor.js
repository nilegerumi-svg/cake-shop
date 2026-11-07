// js/data/ingredients/seasoning/monitor.js
(function () {
    window.Cake = window.Cake || {};
    setTimeout(() => {
        const allSeasonings = window.Cake.INGREDIENTS_SEASONING || {};
        const count = Object.keys(allSeasonings).length;
        console.log(`📊 [Monitor] 当前调料共录入 ${count} 种。`);
    }, 0);
})();
