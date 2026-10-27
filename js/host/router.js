// js/host/router.js
(() => {
    'use strict';

    const mainFrame = document.getElementById('mainFrame');
    if (!mainFrame) return;

    // 1. 路径规范化
    const normalizePage = (href) => {
        const t = (href || '').trim().replace(/^\.\//, '');
        if (!t) return null;
        if (/^(https?:)?\/\//.test(t) || /^javascript:/i.test(t)) return null;
        
        if (t === 'game.html' || t === 'index.html' || t === '/') return 'pages/home.html';
        if (t.startsWith('pages/')) return t;
        return `pages/${t}`;
    };

    // 2. 根据路径算出要高亮哪个按钮
    const getTabKey = (url) => {
        if (url.includes('shop')) return 'shop';
        if (url.includes('bake')) return 'bake';
        if (url.includes('buy')) return 'buy';
        if (url.includes('recipe')) return 'recipe';
        if (url.includes('love')) return 'love';
        if (url.includes('entertainment')) return 'fun';
        if (url.includes('profile')) return 'profile';
        return 'home'; 
    };

    // 3. 暴力点亮导航栏（绕过所有 render 逻辑，直接改 DOM）
    const highlightNav = (targetUrl) => {
        const navBar = document.getElementById('navBar');
        if (!navBar) return;
        
        const activeKey = getTabKey(targetUrl);
        // 跟你 render.js 里的 NAV_ITEMS 顺序严格对应
        const navKeys = ['home', 'shop', 'bake', 'buy', 'recipe', 'love', 'fun', 'profile'];
        const links = navBar.querySelectorAll('.nav-btn');

        links.forEach((link, index) => {
            if (navKeys[index] === activeKey) {
                link.style.cssText = 'background: #ff8fa3; color: #ffffff; box-shadow: 0 4px 10px rgba(255,143,163,0.4); transform: translateY(-1px);';
            } else {
                link.style.cssText = 'background: #ffffff; color: #d6336c; box-shadow: none; transform: none;';
            }
        });
    };

    // 4. 核心跳转（彻底砍掉任何会“抢跑”的强制拉回逻辑）
    const navigateTo = (href) => {
        const target = normalizePage(href);
        if (!target) return false;
        
        if (mainFrame.getAttribute('src') !== target) {
            // 先变色，再跳转
            highlightNav(target);
            mainFrame.src = target;
        }
        return true;
    };

    window.HostRouter = { navigateTo };

    // 5. 拦截所有的 <a> 标签点击
    const bindLinkInterceptor = (doc) => {
        if (!doc || doc.__navBound) return;
        doc.__navBound = true;

        doc.addEventListener('click', (e) => {
            const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!link || link.target === '_blank') return;

            const href = link.getAttribute('href');
            if (!href || href === '#' || /^javascript:/i.test(href)) return;

            // 拦截并跳转
            if (navigateTo(href)) {
                e.preventDefault(); 
            }
        });
    };

    bindLinkInterceptor(document);

    // 6. 每次 iframe 加载完成，重新绑定拦截器，并且确认一次高亮
    mainFrame.addEventListener('load', () => {
        try {
            bindLinkInterceptor(mainFrame.contentDocument);
            const currentSrc = mainFrame.getAttribute('src') || '';
            if (currentSrc && currentSrc !== 'about:blank') {
                highlightNav(currentSrc);
            }
        } catch (_) { /* 忽略跨域 */ }
    });
})();
