// js/core/render/footer.js
window.Cake = window.Cake || {};
(() => {
    const Cake = window.Cake;

    Cake.renderFooter = () => {
        // 只更新提示条（#footerHint），不再重写整个底栏，避免清空功能按钮
        const hint = document.getElementById('footerHint');
        if (hint) {
            hint.textContent = '💡 前往【🏪 店铺】页面即可开店营业，接待顾客！';
        }
    };
})();
