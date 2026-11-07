// js/data/ingredients/grain/monitor.js
(function () {
    window.Cake = window.Cake || {};
    setTimeout(() => {
        const allGrains = window.Cake.INGREDIENTS_GRAIN || {};
        const count = Object.keys(allGrains).length;
        console.log(`📊 [Monitor] 当前谷物主食共录入 ${count} 种。`);
    }, 0);
})();
