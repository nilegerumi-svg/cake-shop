// js/core/render.js
window.Cake = window.Cake || {};

(() => {
    'use strict';
    const Cake = window.Cake;

    const NAV_ITEMS = [
        { key: 'home',    label: '🏠 主页', href: 'game.html' },
        { key: 'shop',    label: '🏪 店铺', href: 'shop.html' },
        { key: 'bake',    label: '🎂 烘焙', href: 'bake.html' },
        { key: 'buy',     label: '🛒 采购', href: 'buy.html' },
        { key: 'recipe',  label: '📖 配方', href: 'recipe.html' },
        { key: 'love',    label: '💕 缘分', href: 'love.html' },
        { key: 'fun',     label: '🎮 娱乐', href: 'entertainment/index.html' },
        { key: 'profile', label: '📊 我的', href: 'profile.html' },
    ];

    const isInIframe = window.self !== window.top;
    let currentRender = null;
    let currentActiveTab = 'home';

    const renderHeader = () => {
        const el = Cake.$('header');
        if (!el || isInIframe) return;
        const state = Cake.store.state;
        const pct = Math.max(0, Math.min(100, Math.round(state.energy)));
        const esc = Cake.escapeHtml;

        el.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div class="header-left" style="display: flex; align-items: center; gap: 6px; font-weight: bold; font-size: 15px; color: #d6336c;">
                    <span class="shop-emoji" style="font-size: 20px;">${esc(state.avatar)}</span>
                    <span>${esc(state.shopName)}</span>
                </div>
                <div class="header-stats" style="display: flex; gap: 8px; font-size: 13px; color: #555; font-weight: bold;">
                    <span>📅 ${state.day}天</span>
                    <span>💰 ${state.money}</span>
                    <span>⭐ ${state.reputation}</span>
                </div>
            </div>
            <div class="energy-wrap" style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                <span>⚡</span>
                <div class="energy-bar" style="flex: 1; height: 6px; background: #ffe4e1; border-radius: 4px; overflow: hidden;">
                    <div class="energy-bar-fill" style="height: 100%; width: ${pct}%; background: #ff8fa3;"></div>
                </div>
                <span style="color: #888; width: 45px; text-align: right;">${Math.round(state.energy)}/100</span>
            </div>`;
    };

    const renderNav = (active) => {
        const el = Cake.$('navBar');
        if (!el || isInIframe) return;
        el.innerHTML = NAV_ITEMS.map((item) =>
            `<a class="nav-btn ${item.key === active ? 'active' : ''}" href="${item.href}">${item.label}</a>`
        ).join('');
    };

    const renderFooter = () => {
        const el = Cake.$('footer');
        if (!el || isInIframe) return;
        el.innerHTML = `<span class="hint" style="padding-top: 5px; padding-bottom: 5px;">💡 前往【🏪 店铺】页面即可开店营业，迎接顾客！</span>`;
    };

    const renderLog = () => {
        const list = Cake.$('logList');
        if (!list) return;
        const state = Cake.store.state;
        if (state.log.length === 0) {
            list.innerHTML = '<div class="muted">还没有记录，快去创造故事吧～</div>';
            return;
        }
        const esc = Cake.escapeHtml;
        list.innerHTML = state.log.slice().reverse().map((l) => `<div class="log-item"><span class="log-day">第${l.day}天</span>${esc(l.text)}</div>`).join('');
        list.scrollTop = 0;
    };

    const renderAll = () => {
        renderHeader();
        renderNav(currentActiveTab);
        renderFooter();
        renderLog();
        if (currentRender) currentRender();
    };

    const refreshPage = () => {
        if (!Cake.__syncing) Cake.saveState();
        renderAll();
    };

    const initPage = (activeTab, renderFn, showLog = false) => {
        currentActiveTab = activeTab;
        currentRender = renderFn;
        const logWrap = Cake.$('logPanelWrap');
        if (logWrap) logWrap.style.display = showLog ? 'block' : 'none';
        refreshPage();
    };

    window.addEventListener('storage', (e) => {
        if (e.key && e.key !== Cake.SAVE_KEY) return;
        if (e.storageArea && e.storageArea !== window.localStorage) return;
        try {
            Cake.store.state = Cake.loadStateFromStorage();
        } catch (_) { return; }
        Cake.__syncing = true;
        try { renderAll(); } catch (_) {}
        Cake.__syncing = false;
    });

    // 🌟 确保这一段成功挂载，否则子页面会报错！
    Object.assign(Cake, {
        renderHeader,
        renderNav,
        renderFooter,
        renderLog,
        refreshPage,
        initPage,
    });
})();
