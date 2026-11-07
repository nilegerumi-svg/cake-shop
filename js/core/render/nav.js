// js/core/render/nav.js
// 新版 UI：底部 6 主标签（小楼/订购/小镇/缘分/档案/成就）
window.Cake = window.Cake || {};
(() => {
    const Cake = window.Cake;

    const NAV_ITEMS = [
        { key: 'home',    label: '小楼', emoji: '🏠',  href: 'pages/home/index.html' },
        { key: 'market',  label: '订购', emoji: '📦',  href: 'pages/market/index.html' },
        { key: 'town',    label: '小镇', emoji: '🏘️', href: 'pages/town/index.html' },
        { key: 'fate',    label: '缘分', emoji: '💕',  href: 'pages/fate/index.html' },
        { key: 'profile', label: '档案', emoji: '👤',  href: 'pages/profile/index.html' },
        { key: 'achieve', label: '成就', emoji: '🏆',  href: 'pages/achieve/index.html' }
    ];

    Cake.renderNav = (activeKey) => {
        const el = Cake.$('tabBar');
        if (!el) { console.error('❌ [Nav] 找不到 #tabBar 元素！'); return; }
        const key = activeKey || 'home';

        el.innerHTML = NAV_ITEMS.map((item) => {
            const isActive = item.key === key;
            return `
                <button type="button" class="tab-btn ${isActive ? 'active' : ''}" role="tab"
                    aria-selected="${isActive}" aria-label="${item.label}"
                    data-nav-key="${item.key}" data-nav-href="${item.href}">
                    <span class="tab-emoji" aria-hidden="true">${item.emoji}</span>
                    <span>${item.label}</span>
                </button>`;
        }).join('');

        el.querySelectorAll('.tab-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const navKey = btn.dataset.navKey;
                const navHref = btn.dataset.navHref;
                const mainFrame = document.getElementById('mainFrame');
                if (mainFrame && navHref) mainFrame.src = navHref;

                // 记录玩家所在位置：小镇(地图探索)视为出门，其余为店内/家中
                if (Cake.store && Cake.store.state) {
                    Cake.store.state.currentLocation = (navKey === 'town') ? 'town' : 'home';
                }
                if (typeof Cake.initPage === 'function') Cake.initPage(navKey || 'home');

                // 高亮当前标签
                el.querySelectorAll('.tab-btn').forEach((b) => {
                    const active = b === btn;
                    b.classList.toggle('active', active);
                    b.setAttribute('aria-selected', String(active));
                });
            });
        });

        console.log('✅ [Nav] 底部 6 标签导航渲染完成！');
    };
})();
