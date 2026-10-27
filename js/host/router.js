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
        
        // 如果带有奇怪的嵌套，强行拔出来
        if (t.includes('pages/')) return t.substring(t.indexOf('pages/'));
        
        return `pages/${t}`;
    };

    // 2. 根据路径点亮导航栏
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

    const highlightNav = (targetUrl) => {
        try {
            const navBar = document.getElementById('navBar');
            if (!navBar) return;
            const activeKey = getTabKey(targetUrl);
            const navKeys = ['home', 'shop', 'bake', 'buy', 'recipe', 'love', 'fun', 'profile'];
            const links = navBar.querySelectorAll('.nav-btn');

            links.forEach((link, index) => {
                if (navKeys[index] === activeKey) {
                    link.style.cssText = 'background: #ff8fa3; color: #ffffff; box-shadow: 0 4px 10px rgba(255,143,163,0.4); transform: translateY(-1px);';
                } else {
                    link.style.cssText = 'background: #ffffff; color: #d6336c; box-shadow: none; transform: none;';
                }
            });
        } catch (e) {}
    };

    // 3. 唯一的绝对跳转入口
    const navigateTo = (href) => {
        const target = normalizePage(href);
        if (!target) return false;
        
        highlightNav(target);

        if (mainFrame.getAttribute('src') !== target) {
            mainFrame.src = target;
        }
        return true;
    };

    window.HostRouter = { navigateTo };

    // 4. 🚨 霸王条款：剥夺子页面的跳转权
    const enforceParentAuthority = (iframe) => {
        try {
            const win = iframe.contentWindow;
            const doc = iframe.contentDocument;
            if (!win || !doc) return;

            if (win.__parentEnforced) return;
            win.__parentEnforced = true;

            // 第一重防御：拦截子页面里所有的 <a> 标签点击
            doc.addEventListener('click', (e) => {
                const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
                if (!link || link.target === '_blank') return;
                const href = link.getAttribute('href');
                if (!href || href === '#' || /^javascript:/i.test(href)) return;

                if (navigateTo(href)) {
                    e.preventDefault(); // 强行阻断浏览器默认跳转
                }
            });

            // 第二重：给子页面注入一个可靠的跳转接口。
            // 说明：window.location 是浏览器保护的只读 accessor，
            // 无法用 Object.defineProperty 覆盖（旧代码在这里静默失效），
            // 所以改为让子页面主动调用 window.HostRouter.navigateTo()。
            if (!win.HostRouter) {
                win.HostRouter = { navigateTo };
            }

        } catch (err) {
            /* 跨域时忽略 */
        }
    };

    // 5. 绑定父页面自己的点击
    const bindParentLinks = (doc) => {
        if (!doc || doc.__navBound) return;
        doc.__navBound = true;
        doc.addEventListener('click', (e) => {
            const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!link) return;
            const href = link.getAttribute('href');
            if (!href || href === '#' || /^javascript:/i.test(href)) return;
            if (navigateTo(href)) e.preventDefault(); 
        });
    };
    bindParentLinks(document);

    // 6. 每次 iframe 加载完成，立即执行“霸王条款”并锁定颜色
    mainFrame.addEventListener('load', () => {
        enforceParentAuthority(mainFrame);
        const currentSrc = mainFrame.getAttribute('src') || '';
        if (currentSrc && currentSrc !== 'about:blank') {
            highlightNav(currentSrc);
        }
    });
})();
