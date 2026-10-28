// js/pages/home/view.js
export const renderHome = () => {
    const G = window.parent.Game || window.Game;
    const contentEl = document.getElementById('content');

    if (!contentEl) {
        console.error('❌ [Home] 未找到 #content');
        return;
    }

    // 🚨 强制排查输出，绝不静默退出！
    if (!G) {
        contentEl.innerHTML = '<h2 style="color:red; text-align:center; margin-top:50px;">❌ 致命错误：找不到父页面的 G 对象</h2>';
        return;
    }
    if (!G.state) {
        contentEl.innerHTML = '<h2 style="color:red; text-align:center; margin-top:50px;">❌ 致命错误：G 对象存在，但没有 state 数据</h2>';
        return;
    }

    // escapeHtml 守卫：Cake.escapeHtml 未定义时退化为 String()
    const escape = (typeof G.escapeHtml === 'function')
        ? G.escapeHtml
        : (v) => String(v ?? '');

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
                const price = Math.round(recipe.price * (s.priceRate || 1));
                return `<div class="item-card">
                    <span class="item-emoji">${recipe.emoji}</span>
                    <span class="item-name">${name} <span class="muted">×${count}</span></span>
                    <span class="item-meta">售价 <span class="price-tag">${price}元</span></span>
                </div>`;
            }).join('') + '</div>';
        }

        contentEl.innerHTML = `
            <div class="card">
                <h2>🏠 欢迎回来，${escape(s.playerName || '店长')}！</h2>
                <p class="muted">今天是经营的第 <b>${s.day || 1}</b> 天，你的「${escape(s.shopName || '甜蜜小屋')}」正散发着甜蜜香气～</p>
                <div class="grid-2" style="margin-top:12px;">
                    <div class="item-card"><span class="item-emoji">💰</span><span class="item-name">${s.money ?? 500} 元</span><span class="item-desc">当前余额</span></div>
                    <div class="item-card"><span class="item-emoji">⭐</span><span class="item-name">${s.reputation ?? 0} 声望</span><span class="item-desc">店铺名气</span></div>
                    <div class="item-card"><span class="item-emoji">🏪</span><span class="item-name">Lv.${s.shopLevel ?? 1} · 装饰${s.decoration || 0}</span><span class="item-desc">店铺等级与装饰度</span></div>
                    <div class="item-card"><span class="item-emoji">⚡</span><span class="item-name">${s.energy ?? 80}/100</span><span class="item-desc">今日剩余精力</span></div>
                </div>
                <h3>⚡ 快速行动</h3>
                <div class="char-actions">
                   <button type="button" class="small" data-action="nap" ${(s.energy ?? 0) >= 100 ? 'disabled' : ''}>😴 家里小憩</button>
                   <button type="button" class="small" data-action="sleep">🛌 睡觉</button>
                   <a href="pages/entertainment/map.html" class="small secondary" style="text-decoration:none; text-align:center;">🚶‍♀️ 散步</a>
                </div>
                <h3>🧁 库存蛋糕</h3>
                ${cakesHtml}
            </div>`;
    } catch (err) {
        contentEl.innerHTML = `<div style="color: red; padding: 20px; background: #fff;">❌ 渲染发生异常：${escape(err.message)}</div>`;
    }
};
