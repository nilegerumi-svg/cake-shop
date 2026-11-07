// js/data/ingredients/meat/monitor.js
(function () {
    window.Cake = window.Cake || {};
    // 等 index.js 汇总完之后，算一下总数
    setTimeout(() => {
        const allMeat = window.Cake.INGREDIENTS_MEAT || {};
        const count = Object.keys(allMeat).length;
        console.log(`📊 [Monitor] 当前肉类食材共录入 ${count} 种。`);
    }, 0);
})();
