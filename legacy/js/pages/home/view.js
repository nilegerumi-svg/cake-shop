// js/pages/home/view.js
export const renderHome = () => {
    const G = window.parent.Game || window.Game;
    const contentEl = document.getElementById('content');

    if (!contentEl) {
        console.error('❌ [Home] 未找�� #content');
        return;
    }
    if (!G || !G.state) {
        contentEl.innerHTML = '<h2 style="color:red; text-align:center; margin-top:50px;">❌ 致命错误：找不到游戏数据</h2>';
        return;
    }

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
        const recipesObj = G.RECIPES ?? {};
        const foodsObj = s.foods ?? {};
        const currentLocation = s.currentLocation || 'home';
        const isTown = currentLocation === 'town';

        let cakesHtml = '<p class="muted">货架上还没有成品，快去「烘焙」做几个吧！</p>';
        let hasFoods = false;
        let foodHtmlList = '';

        for (const [recipeKey, data] of Object.entries(foodsObj)) {
            const recipe = recipesObj[recipeKey];
            if (!recipe) continue;

            const totalCount = (data.perfect || 0) + (data.good || 0) + (data.normal || 0);
            if (totalCount <= 0) continue;
            hasFoods = true;

            const BASE_PRICE = { small: 15, medium: 50, large: 200 };
            const basePrice = BASE_PRICE[recipe.size] || 15;

            foodHtmlList += `<div class="item-card">
                <span class="item-emoji">${recipe.emoji ?? '🍰'}</span>
                <span class="item-name">${escape(recipe.name)} <span class="muted">×${totalCount}</span></span>
                <span class="item-meta">基础售价 <span class="price-tag">${basePrice}元</span></span>
            </div>`;
        }

        if (hasFoods) {
            cakesHtml = '<div class="grid-2">' + foodHtmlList + '</div>';
        }

        const money = num(s.money, 200);
        const day = num(s.time?.day, 1);
        const reputation = num(s.shop?.stats?.reputation, 0);
        const cleanliness = num(s.shop?.stats?.cleanliness, 100);
        const energy = num(s.energy, 100);
        const maxEnergy = num(s.maxEnergy, 100);
        const shopName = s.shop?.name || '甜蜜小屋';

        if (isTown) {
            contentEl.innerHTML = `
                <div class="card">
                    <h2>🏘️ 你已来到小镇</h2>
                    <p class="muted">这里有热闹的集市、食材摊位和熟悉的街巷，适合采购和闲逛。</p>
                    <div class="grid-2" style="margin-top:12px;">
                        <div class="item-card"><span class="item-emoji">🛒</span><span class="item-name">集市</span><span class="item-desc">采购食材</span></div>
                        <div class="item-card"><span class="item-emoji">💬</span><span class="item-name">街坊</span><span class="item-desc">偶遇新客人</span></div>
                    </div>
                    <h3>⚡ 现在可以做的事</h3>
                    <div class="char-actions">
                        <button type="button" class="small" data-action="go-home">🏠 回家</button>
                        <button type="button" class="small secondary" data-action="go-park">🌳 去公园散步</button>
                    </div>
                </div>`;
            return;
        }

        contentEl.innerHTML = `
            <div class="card">
                <h2>🏠 欢迎回来，${escape(s.playerName ?? '店长')}！</h2>
                <p class="muted">今天是经营的第 <b>${day}</b> 天，你的「${escape(shopName)}」正散发着甜蜜香气～</p>
                <div class="grid-2" style="margin-top:12px;">
                    <div class="item-card"><span class="item-emoji">💰</span><span class="item-name">${money} 元</span><span class="item-desc">当前余额</span></div>
                    <div class="item-card"><span class="item-emoji">⭐</span><span class="item-name">${reputation} 声望</span><span class="item-desc">店铺名气</span></div>
                    <div class="item-card"><span class="item-emoji">🧹</span><span class="item-name">${cleanliness}%</span><span class="item-desc">店铺卫生度</span></div>
                    <div class="item-card"><span class="item-emoji">⚡</span><span class="item-name">${energy}/${maxEnergy}</span><span class="item-desc">今日剩余精力</span></div>
                </div>
                <h3>⚡ 快速行动</h3>
                <div class="char-actions">
                    <button type="button" class="small" data-action="nap" ${energy >= maxEnergy ? 'disabled' : ''}>😴 家里小憩</button>
                    <button type="button" class="small" data-action="sleep">🛌 睡觉</button>
                    <button type="button" class="small secondary" data-action="go-town">🚶 去小镇</button>
                </div>
                <h3>🧁 成品库存</h3>
                ${cakesHtml}
            </div>`;
    } catch (err) {
        contentEl.innerHTML = `<div class="render-error">❌ 渲染发生异常：${escape(err.message)}</div>`;
    }
};
