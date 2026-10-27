// js/host/router.js
(() => {
    'use strict';

    const mainFrame = document.getElementById('mainFrame');
    if (!mainFrame) return;

    // 🌟 1. 把各种奇奇怪怪的路径，规范化为标准路径
    const normalizePage = (href) => {
        const t = (href || '').trim().replace(/^\.\//, '');
        if (!t) return null;
        if (/^(https?:)?\/\//.test(t) || /^javascript:/i.test(t)) return null;
        
        if (t === 'game.html' || t === 'index.html' || t === '/') return 'pages/home.html';
        if (t.startsWith('pages/')) return t;
        
        // 如果是从子页面发出的相对路径，强行拼接
        return `pages/${t}`;
    };

    // 🌟 2. 根据路径自动识别，该点亮哪个导航按钮
    const getTabKey = (url) => {
        if (url.includes('shop')) return 'shop';
        if (url.includes('bake')) return 'bake';
        if (url.includes('buy')) return 'buy';
        if (url.includes('recipe')) return 'recipe';
        if (url.includes('love')) return 'love';
        if (url.includes('entertainment')) return 'fun';
        if (url.includes('profile')) return 'profile';
        return 'home'; // 默认主页
    };

    // 🌟 3. 核心跳转（绝不自作主张，只负责平滑换页）
    const navigateTo = (href) => {
        const target = normalizePage(href);
        if (!target) return false;
        
        if (mainFrame.getAttribute('src') !== target) {
            // 先给外层导航栏上色（0 延迟响应）
            if (window.Cake && typeof window.Cake.renderNav === 'function') {
                window.Cake.renderNav(getTabKey(target));
            }
            
            // 切换 iframe 的地址
            mainFrame.src = target;
        }
        return true;
    };

    // 暴露给子页面调用的安全通道
    window.HostRouter = { navigateTo };

    // 🌟 4. 拦截 `<a>` 标签的点击，防止页面穿透刷新
    const bindLinkInterceptor = (doc) => {
        if (!doc || doc.__navBound) return;
        doc.__navBound = true;

        doc.addEventListener('click', (e) => {
            const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!link || link.target === '_blank') return;

            const href = link.getAttribute('href');
            if (!href || href === '#' || /^javascript:/i.test(href)) return;

            // 拦截并交给我们的 navigateTo 处理
            if (navigateTo(href)) {
                e.preventDefault(); // 阻止浏览器默认的页面跳转
            }
        });
    };

    // 绑定当前页面
    bindLinkInterceptor(document);

    // 每次子页面加载完毕，再次重新绑定（防止新页面的 a 标签失效）
    mainFrame.addEventListener('load', () => {
        try {
            bindLinkInterceptor(mainFrame.contentDocument);
            
            // 顺手再点亮一次导航栏，防止子页面渲染失败导致高亮丢失
            const currentSrc = mainFrame.getAttribute('src') || '';
            if (currentSrc && window.Cake && typeof window.Cake.renderNav === 'function') {
                window.Cake.renderNav(getTabKey(currentSrc));
            }
        } catch (_) { /* 跨域时忽略 */ }
    });
})();
