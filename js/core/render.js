window.Cake = window.Cake || {};
(function () {
    var currentRender = null;
    var currentActiveTab = 'home';
    // 判断是否在 iframe 内部
    var isInIframe = (window.self !== window.top);

    function renderHeader() {
        var el = window.Cake.$('header');
        if (!el) return;
        
        // ✨ 彻底修复：如果是 iframe 内部，直接跳过，不用渲染，也不要删 DOM
        if (isInIframe) return;
        
        var state = window.Cake.store.state;
        var pct = Math.max(0, Math.min(100, Math.round(state.energy)));
        var esc = window.Cake.escapeHtml;
        el.innerHTML =
            '<div class="header-left">' +
                '<span class="shop-emoji">' + esc(state.avatar) + '</span>' +
                '<span>' + esc(state.shopName) + '</span>' +
            '</div>' +
            '<div class="header-stats">' +
                '<div class="stat-chip">📅 第 ' + state.day + ' 天</div>' +
                '<div class="stat-chip">💰 ' + state.money + ' 元</div>' +
                '<div class="stat-chip">⭐ 声望 ' + state.reputation + '</div>' +
                '<div class="energy-wrap">' +
                    '<span>⚡</span>' +
                    '<div class="energy-bar"><div class="energy-bar-fill" style="width:' + pct + '%"></div></div>' +
                    '<span class="energy-text">' + Math.round(state.energy) + '/100</span>' +
                '</div>' +
            '</div>';
    }

    function renderNav(active) {
        var el = window.Cake.$('navBar');
        if (!el) return;
        
        // ✨ 彻底修复：如果是 iframe 内部，直接跳过
        if (isInIframe) return;

        var items = [
            { key: 'home',    label: '🏠 主页', href: 'game.html' },
            { key: 'shop',    label: '🏪 店铺', href: 'shop.html' },
            { key: 'bake',    label: '🎂 烘焙', href: 'bake.html' },
            { key: 'buy',     label: '🛒 采购', href: 'buy.html' },
            { key: 'recipe',  label: '📖 配方', href: 'recipe.html' },
            { key: 'love',    label: '💕 缘分', href: 'love.html' },
            { key: 'fun',     label: '🎮 娱乐', href: 'rest_and_outside.html' },
            { key: 'profile', label: '📊 我的', href: 'profile.html' },
        ];
        var html = '';
        for (var i = 0; i < items.length; i++) {
            var it = items[i];
            html += '<a class="nav-btn ' + (it.key === active ? 'active' : '') + '" href="' + it.href + '">' + it.label + '</a>';
        }
        el.innerHTML = html;
    }

    function renderFooter() {
        var el = window.Cake.$('footer');
        if (!el) return;
        
        // ✨ 彻底修复：如果是 iframe 内部，直接跳过
        if (isInIframe) return;

        el.innerHTML =
            '<button class="big-btn gold" onclick="Game.openShop()">🧁 开店营业</button>' +
            '<span class="hint">💡 白天先烘焙、采购、社交或装修店铺，准备好就开店迎接顾客吧！</span>';
    }

    function renderLog() {
        var list = window.Cake.$('logList');
        if (!list) return;
        var state = window.Cake.store.state;
        if (state.log.length === 0) {
            list.innerHTML = '<div class="muted">还没有记录，快去创造故事吧～</div>';
            return;
        }
        var esc = window.Cake.escapeHtml;
        var html = '';
        for (var i = state.log.length - 1; i >= 0; i--) {
            var l = state.log[i];
            html += '<div class="log-item"><span class="log-day">第' + l.day + '天</span>' + esc(l.text) + '</div>';
        }
        list.innerHTML = html;
        list.scrollTop = 0;
    }

    function refreshPage() {
        if (!window.Cake.__syncing) window.Cake.saveState();
        renderHeader();
        renderNav(currentActiveTab);
        renderFooter();
        renderLog();
        if (currentRender) currentRender();
    }

    function initPage(activeTab, renderFn, showLog) {
        currentActiveTab = activeTab;
        currentRender = renderFn;
        var logWrap = window.Cake.$('logPanelWrap');
        if (logWrap) logWrap.style.display = showLog ? 'block' : 'none';
        refreshPage();
    }

    // 跨 iframe 状态同步
    window.addEventListener('storage', function (e) {
        if (e.key && e.key !== window.Cake.SAVE_KEY) return;
        if (e.storageArea && e.storageArea !== window.localStorage) return;
        try {
            window.Cake.store.state = window.Cake.loadStateFromStorage();
        } catch (err) { return; }
        window.Cake.__syncing = true;
        try {
            renderHeader();
            renderNav(currentActiveTab);
            renderFooter();
            renderLog();
            if (currentRender) currentRender();
        } catch (err) {}
        window.Cake.__syncing = false;
    });

    window.Cake.renderHeader = renderHeader;
    window.Cake.renderNav = renderNav;
    window.Cake.renderFooter = renderFooter;
    window.Cake.renderLog = renderLog;
    window.Cake.refreshPage = refreshPage;
    window.Cake.initPage = initPage;
})();
