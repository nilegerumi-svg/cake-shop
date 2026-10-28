// js/data/ingredients/vegetable/monitor.js
(function () {
    window.Cake = window.Cake || {};
    setTimeout(() => {
        const allVeg = window.Cake.INGREDIENTS_VEGETABLE || {};
        const count = Object.keys(allVeg).length;
        console.log(`📊 [Monitor] 当前蔬菜共录入 ${count} 种。`);
    }, 0);
})();
