// js/core/render.js
window.Cake = window.Cake || {};

(() => {
    'use strict';
    const Cake = window.Cake;

    const NAV_ITEMS = [
        { key: 'home',    label: '🏠 主页', href: 'game.html' },
        { key: 'shop',    label: '🏪 店铺', href: 'shop.html' },
        { key: 'bake',    label: '🧂 烘焙', href: 'bake.html' },
        { key: 'buy',     label: '🛒 采购', href: 'buy.html' },
        { key: 'recipe',  label: '🍖 配方', href: 'recipe.html' },
        { key: 'love',    label: '💕 缘分', href: 'love.html' },
        { key: 'fun',     label: '🎮 娱乐', href: 'entertainment/index.html' },
        { key: 'profile', label: '⭐ 我的', href: 'profile.html' },
    ];

    const isInIframe = window.self !== window.top;
    let currentRender = null;
    let currentActiveTab = 'home';

    const num = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    const renderHeader = () => {
        const el = Cake.$('header');
        if (!el || isInIframe) return;

        const state = Cake.store && Cake.store.state;
        if (!state) return;

        const energy = Math.max(0, Math.min(100, num(state.energy, 80)));
        const pct = Math.round(energy);
        const esc = Cake.escapeHtml;
        const timeStr = Cake.getTimeString ? Cake.getTimeString() : '08:00';

        el.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div class="header-left" style="display: flex; align-items: center; gap: 6px; font-weight: bold; font-size: 15px; color: #d6336c;">
                    <span class="shop-emoji" style="font-size: 20px;">👩‍🍳</span>
                    <span>${esc(state.shop?.name ?? '甜蜜小屋')}</span>
                </div>
                <div class="header-stats" style="display: flex; gap: 8px; font-size: 13px; color: #555; font-weight: bold;">
                    <span>📅 ${num(state.time?.day, 1)}天 ${timeStr}</span>
                    <span>💰 ${num(state.money, 100)}</span>
                    <span>🧹 ${num(state.shop?.stats?.cleanliness, 100)}%</span>
                </div>
            </div>
            <div class="energy-wrap" style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                <span>⚡</span>
                <div class="energy-bar" style="flex: 1; height: 6px; background: #ffe4e1; border-radius: 4px; overflow: hidden;">
                    <div class="energy-bar-fill" style="height: 100%; width: ${pct}%; background: #ff8fa3;"></div>
                </div>
                <span style="color: #888; width: 45px; text-align: right;">${pct}/${state.maxEnergy || 100}</span>
            </div>`;
    };

    const renderNav = (active) => {
        const key = active ?? currentActiveTab;
        const el = Cake.$('navBar');
        if (!el || isInIframe) return;

        el.innerHTML = NAV_ITEMS.map((item) => {
            const isActive = item.key === key;
            const activeStyle = isActive
                ? 'background: #ff8fa3; color: #ffffff; box-shadow: 0 4px 10px rgba(255,143,163,0.4); transform: translateY(-1px);'
                : '';
            return `<a class="nav-btn ${isActive ? 'active' : ''}" style="${activeStyle}" href="${item.href}">${item.label}</a>`;
        }).join('');
    };

    const renderFooter = () => {
        const el = Cake.$('footer');
        if (!el || isInIframe) return;
        el.innerHTML = `<span class="hint" style="padding-top: 5px; padding-bottom: 5px;">💡 前往【🏪 店铺】页面即可开店营业，接待顾客！</span>`;
    };

    const renderLog = () => {
        const list = Cake.$('logList');
        if (!list) return;

        const state = Cake.store && Cake.store.state;
        if (!state) return;

        const logs = Array.isArray(state.log) ? state.log : [];
        if (logs.length === 0) {
            list.innerHTML = '<div class="muted">还没有记录，快去创造故事吧！</div>';
            return;
        }

        const esc = Cake.escapeHtml;
        list.innerHTML = logs.slice().reverse().map((l) =>
            `<div class="log-item"><span class="log-day">第${num(l.day, 1)}天</span> ${esc(l.text || '')}</div>`
        ).join('');
        list.scrollTop = 0;
    };

    // 👈 新增：渲染背包
    const renderInventory = () => {
        const el = Cake.$('ui-inventory');
        if (!el) return;

        const state = Cake.store && Cake.store.state;
        if (!state || !state.inventory || state.inventory.length === 0) {
            el.innerHTML = '<div class="muted">背包空空如也</div>';
            return;
        }

        const summary = {};
        state.inventory.forEach(item => {
            if (!summary[item.id]) {
                summary[item.id] = { count: 0, rotten: 0, name: '', emoji: '' };
                const itemData = Cake.INGREDIENTS[item.id];
                if (itemData) {
                    summary[item.id].name = itemData.name;
                    summary[item.id].emoji = itemData.emoji;
                } else {
                    summary[item.id].name = item.id;
                    summary[item.id].emoji = '❓';
                }
            }
            summary[item.id].count++;
            if (item.isRotten) summary[item.id].rotten++;
        });

        const html = Object.values(summary).map(s => {
            const rottenText = s.rotten > 0 ? `<span style="color:red; font-size:12px;">(腐烂 ${s.rotten})</span>` : '';
            return `<span class="inv-item" style="display:inline-block; margin-right: 10px; margin-bottom: 5px; background:#f0f0f0; padding: 4px 8px; border-radius: 6px;">
                ${s.emoji} ${s.name} ×${s.count} ${rottenText}
            </span>`;
        }).join('');
        
        el.innerHTML = html;
    };

    // 👈 新增：渲染成品
    const renderFoods = () => {
        const el = Cake.$('ui-foods');
        if (!el) return;

        const state = Cake.store && Cake.store.state;
        if (!state || !state.foods || Object.keys(state.foods).length === 0) {
            el.innerHTML = '<div class="muted">货架上还没有成品</div>';
            return;
        }

        let html = '';
        for (const [recipeKey, data] of Object.entries(state.foods)) {
            const recipe = Cake.RECIPES[recipeKey];
            const name = recipe ? recipe.name : recipeKey;
            
            const parts = [];
            if (data.perfect > 0) parts.push(`<span style="color:#ff8fa3">✨完美 ${data.perfect}</span>`);
            if (data.good > 0) parts.push(`<span style="color:#52c41a">👍优良 ${data.good}</span>`);
            if (data.normal > 0) parts.push(`普通 ${data.normal}`);
            if (data.failed > 0) parts.push(`<span style="color:#888">💀失败 ${data.failed}</span>`);

            if (parts.length > 0) {
                html += `<div class="food-item" style="margin-bottom: 5px;">
                    <strong>${name}</strong>: ${parts.join(' | ')}
                </div>`;
            }
        }
        
        el.innerHTML = html || '<div class="muted">货架上还没有成品</div>';
    };

    const renderAll = () => {
        try {
            renderHeader();
            renderNav(currentActiveTab);
            renderFooter();
            renderLog();
            renderInventory();
            renderFoods();
        } catch (err) {
            console.error('[Render] 主页面渲染失败:', err);
        }

        if (typeof currentRender === 'function') {
            try {
                currentRender();
            } catch (err) {
                console.error('[Render] 子页面渲染异常:', err);
            }
        }
    };

    const refreshPage = () => {
        if (!Cake.__syncing && typeof Cake.saveState === 'function') {
            Cake.saveState();
        }
        renderAll();
    };

    const initPage = (activeTab, renderFn, showLog = false) => {
        currentActiveTab = activeTab || 'home';
        currentRender = typeof renderFn === 'function' ? renderFn : null;
        const logWrap = Cake.$('logPanelWrap');
        if (logWrap) logWrap.style.display = showLog ? 'block' : 'none';
        refreshPage();
    };

    window.addEventListener('storage', (e) => {
        if (!Cake.SAVE_KEY || (e.key && e.key !== Cake.SAVE_KEY)) return;
        try {
            if (typeof Cake.loadStateFromStorage === 'function') {
                Cake.store.state = Cake.loadStateFromStorage();
            }
        } catch (_) { return; }

        Cake.__syncing = true;
        try { renderAll(); } catch (_) {}
        Cake.__syncing = false;
    });

    Object.assign(Cake, {
        renderHeader,
        renderNav,
        renderFooter,
        renderLog,
        renderInventory,
        renderFoods,
        refreshPage,
        initPage,
    });

    console.log('🎨 [Render] 渲染框架装载完毕');
})();
