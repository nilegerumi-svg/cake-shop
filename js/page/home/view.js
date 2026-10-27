// js/pages/home/view.js
const G = window.parent.Game || window.Game;

// 库存蛋糕渲染（内部工具）
const renderCakes = (cakes, priceRate) => {
    if (cakes.length === 0) {
        return '<p class="muted">还没有蛋糕库存，快去「烘焙」页面做几个吧！</p>';
    }

    const items = cakes.map(([name, count]) => {
        const recipe = G.RECIPES[name];
        const price = Math.round(recipe.price * priceRate);
        return `<div class="item-card">
            <span class="item-emoji">${recipe.emoji}</span>
            <span class="item-name">${name} <span class="muted">×${count}</span></span>
            <span class="item-meta">售价 <span class="price-tag">${price}元</span></span>
        </div>`;
    }).join('');

    return `<div class="grid-2">${items}</div>`;
};

// 🌟 导出主页渲染函数
export const renderHome = () => {
    const contentEl = document.getElementById('content');
    const s = G.state;
    const cakes = Object.entries(s.cakes)
        .filter(([name, count]) => count > 0 && G.RECIPES[name]);

    contentEl.innerHTML = `
        <div class="card">
            <h2>🏠 欢迎回来，${G.escapeHtml(s.playerName)}！</h2>
            <p class="muted">今天是经营的第 <b>${s.day}</b> 天，你的「${G.escapeHtml(s.shopName)}」正散发着甜蜜香气～</p>
            <div class="grid-2" style="margin-top:12px;">
                <div class="item-card"><span class="item-emoji">💰</span><span class="item-name">${s.money} 元</span><span class="item-desc">当前余额</span></div>
                <div class="item-card"><span class="item-emoji">⭐</span><span class="item-name">${s.reputation} 声望</span><span class="item-desc">店铺名气</span></div>
                <div class="item-card"><span class="item-emoji">🏪</span><span class="item-name">Lv.${s.shopLevel} · 装饰${s.decoration}</span><span class="item-desc">店铺等级与装饰度</span></div>
                <div class="item-card"><span class="item-emoji">⚡</span><span class="item-name">${s.energy}/100</span><span class="item-desc">今日剩余精力</span></div>
            </div>
            <h3>⚡ 快速行动</h3>
            <div class="char-actions">
               <button type="button" class="small" data-action="nap" ${s.energy >= 100 ? 'disabled' : ''}>😴 家里小憩</button>
               <button type="button" class="small" data-action="sleep">🛌 睡觉</button>
               <a href="pages/entertainment/map.html" class="small secondary" style="text-decoration:none; text-align:center;">🚶‍♀️ 散步</a>
            </div>
            <h3>🧁 库存蛋糕</h3>
            ${renderCakes(cakes, s.priceRate)}
        </div>`;
};
