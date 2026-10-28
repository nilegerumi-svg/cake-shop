// js/pages/home/view.js
export const renderHome = () => {
    const G = window.parent.Game || window.Game;
    const contentEl = document.getElementById('content');

    if (!contentEl) {
        console.error('❌ [Home] 未找到 #content');
        return;
    }

    // 🚨 强制排查输出，绝不静默退出
    if (!G) {
        contentEl.innerHTML = '<h2 style="color:red; text-align:center; margin-top:50px;">❌ 致命错误：找不到父页面的 G 对象</h2>';
        return;
    }
    if (!G.state) {
        contentEl.innerHTML = '<h2 style="color:red; text-align:center; margin-top:50px;">❌ 致命错误：G 对象存在，但没有 state 数据</h2>';
        return;
    }

    // escapeHtml 守卫
    const escape = (typeof G.escapeHtml === 'function')
        ? G.escapeHtml
        : (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
        }[c]));

    const num = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    try {
        const s = G.state;
        const cakesObj = s.cakes ?? {};
        const recipesObj = G.RECIPES ?? {};
        const cakes = Object.entries(cakesObj).filter(
            ([name, count]) => count > 0 && recipesObj[name]
        );

        let cakesHtml = '<p class="muted">还没有蛋糕库存，快去「烘焙」页面做几个吧！</p>';
        if (cakes.length > 0) {
            cakesHtml = '<div class="grid-2">' + cakes.map(([name, count]) => {
                const recipe = recipesObj[name] || { emoji: '🍰', price: 50 };
                const basePrice = Number(recipe.price);
                const priceRate = Number(s.priceRate ?? 1);
                const unitPrice = Number.isFinite(basePrice) ? basePrice : 50;
                const rate = Number.isFinite(priceRate) ? priceRate : 1;
                const price = Math.round(unitPrice * rate);

                return `<div class="item-card">
                    <span class="item-emoji">${recipe.emoji ?? '🍰'}</span>
                    <span class="item-name">${escape(name)} <span class="muted">×${count}</span></span>
                    <span class="item-meta">售价 <span class="price-tag">${price}元</span></span>
                </div>`;
            }).join('') + '</div>';
        }

        const money = num(s.money, 500);
        const reputation = num(s.reputation, 0);
        const shopLevel = num(s.shopLevel, 1);
        const decoration = num(s.decoration, 0);
        const energy = num(s.energy, 80);
        const day = num(s.day, 1);

        contentEl.innerHTML = `
            <div class="card">
                <h2>🏠 欢迎回来，${escape(s.playerName ?? '店长')}！</h2>
                <p class="muted">今天是经营的第 <b>${day}</b> 天，你的「${escape(s.shopName ?? '甜蜜小屋')}」正散发着甜蜜香气～</p>
                <div class="grid-2" style="margin-top:12px;">
                    <div class="item-card"><span class="item-emoji">💰</span><span class="item-name">${money} 元</span><span class="item-desc">当前余额</span></div>
                    <div class="item-card"><span class="item-emoji">⭐</span><span class="item-name">${reputation} 声望</span><span class="item-desc">店铺名气</span></div>
                    <div class="item-card"><span class="item-emoji">🏪</span><span class="item-name">Lv.${shopLevel} · 装饰${decoration}</span><span class="item-desc">店铺等级与装饰度</span></div>
                    <div class="item-card"><span class="item-emoji">⚡</span><span class="item-name">${energy}/100</span><span class="item-desc">今日剩余精力</span></div>
                </div>
                <h3>⚡ 快速行动</h3>
                <div class="char-actions">
                   <button type="button" class="small" data-action="nap" ${energy >= 100 ? 'disabled' : ''}>😴 家里小憩</button>
                   <button type="button" class="small" data-action="sleep">🛌 睡觉</button>
                   <a href="entertainment/map.html" class="small secondary" style="text-decoration:none; text-align:center;">🚶‍♀️ 散步</a>
                </div>
                <h3>🧁 库存蛋糕</h3>
                ${cakesHtml}
            </div>`;
    } catch (err) {
        contentEl.innerHTML = `<div class="render-error">❌ 渲染发生异常：${escape(err.message)}</div>`;
    }
};
