// js/core/render/nav.js
window.Cake = window.Cake || {};
(() => {
    const Cake = window.Cake;

    const NAV_ITEMS = [
        { key: 'home', label: '🏠 主页', href: 'pages/home/index.html' },
        { key: 'shop', label: '🏪 店铺', href: 'pages/shop/index.html' },
        { key: 'bake', label: '🧂 烘焙', href: 'pages/bake/index.html' },
        { key: 'buy', label: '🛒 采购', href: 'pages/buy/index.html' },
        { key: 'recipe', label: '🍖 配方', href: 'pages/recipe/index.html' },
        { key: 'love', label: '💕 缘分', href: 'pages/love/index.html' },
        { key: 'fun', label: '🎮 娱乐', href: 'pages/entertainment/index.html' },
        { key: 'profile', label: '⭐ 我的', href: 'pages/profile/index.html' }
    ];

    Cake.renderNav = (activeKey) => {
        console.log('👉 [Nav] 开始渲染导航栏...');
        const el = Cake.$('navBar');

        if (!el) {
            console.error('❌ [Nav] 找不到 #navBar 元素！');
            return;
        }

        const key = activeKey || 'home';

        el.innerHTML = NAV_ITEMS.map((item) => {
            const isActive = item.key === key;
            const activeStyle = isActive
                ? 'background: var(--pink-400); color: #ffffff; box-shadow: 0 4px 10px rgba(255,143,163,0.4); transform: translateY(-1px);'
                : '';

            return `
                <a class="nav-btn ${isActive ? 'active' : ''}"
                   style="${activeStyle}; cursor: pointer;"
                   href="#"
                   data-nav-key="${item.key}"
                   data-nav-href="${item.href}">
                    ${item.label}
                </a>
            `;
        }).join('');

        el.querySelectorAll('.nav-btn').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const navKey = link.dataset.navKey;
                const navHref = link.dataset.navHref;

                if (navHref) {
                    const mainFrame = document.getElementById('mainFrame');
                    if (mainFrame) {
                        mainFrame.src = navHref;
                    }
                }

                if (navKey === 'bake' || navKey === 'home') {
                    if (Cake.store && Cake.store.state) {
                        Cake.store.state.currentLocation = 'home';
                    }
                }

                if (typeof Cake.initPage === 'function') {
                    Cake.initPage(navKey || 'home');
                }
            });
        });

        console.log('✅ [Nav] 导航栏渲染完成！');
    };
})();
