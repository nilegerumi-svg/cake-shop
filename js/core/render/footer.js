// js/core/render/footer.js
window.Cake = window.Cake || {};
(() => {
    const Cake = window.Cake;

    Cake.renderFooter = () => {
        const el = Cake.$('footer');
        // 👈 删掉了 window.self !== window.top
        if (!el) return; 
        
        el.innerHTML = `<span class="hint" style="padding-top: 5px; padding-bottom: 5px;">💡 前往【🏪 店铺】页面即可开店营业，接待顾客！</span>`;
    };
})();
