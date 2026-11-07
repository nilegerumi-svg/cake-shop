(() => {
    'use strict';

    function getCake() {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) return window.parent.Cake;
        } catch (_) {}
        return window.Cake || null;
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    function navigate(href) {
        try {
            const pw = (window.parent && window.parent !== window) ? window.parent : null;
            const frame = pw && pw.document ? pw.document.getElementById('mainFrame') : null;
            if (frame) { frame.src = href; return; }
        } catch (_) {}
        window.location.href = href;
    }

    // 小楼楼层与房间
    const FLOORS = [
        { name: '一楼', emoji: '🏠', rooms: [
            { icon: '🏪', name: '店面', desc: '开店营业 · 装修 · 员工 · 货架', nav: 'pages/shop/index.html' },
            { icon: '🍰', name: '厨房', desc: '吃饭 · 备料烘焙 · 研发配方', nav: 'pages/bake/index.html' },
            { icon: '🥘', name: '工坊', desc: '制作料理 · 熬酱榨汁', nav: 'pages/recipe/index.html' },
            { icon: '🛋️', name: '装修', desc: '家具 · 布置小楼', nav: 'pages/furniture/index.html' },
        ]},
        { name: '二楼', emoji: '🛏️', rooms: [
            { icon: '😴', name: '卧室', desc: '小憩 · 睡觉恢复精力', action: 'sleep' },
            { icon: '🧵', name: '衣柜', desc: '缝纫 · 更换服装', nav: 'pages/sewing/index.html' },
            { icon: '🌻', name: '阳台', desc: '种菜种花', soon: true },
        ]},
        { name: '三楼', emoji: '📚', rooms: [
            { icon: '📖', name: '书房', desc: '读书 · 解锁食谱', nav: 'pages/books/index.html' },
            { icon: '🗃️', name: '收藏架', desc: '收藏 · 星图', soon: true },
        ]},
        { name: '天台', emoji: '🌌', rooms: [
            { icon: '🔭', name: '观星台', desc: '看天气 · 观星 · 节气', nav: 'pages/stargazing/index.html' },
        ]},
        { name: '地下室', emoji: '📦', rooms: [
            { icon: '🧺', name: '仓库', desc: '食材库 · 存储整理', nav: 'pages/larder/index.html' },
        ]},
    ];

    function renderHome() {
        const Cake = getCake();
        if (!Cake || !Cake.store || !Cake.store.state) return;
        const state = Cake.store.state;
        const contentEl = document.getElementById('content');
        if (!contentEl) return;

        const shopName = escapeHtml(state.shop?.name || '甜蜜小屋');
        const day = Number(state.time?.day) || 1;
        const money = Number(state.money) || 0;
        const energy = Number(state.energy) || 0;
        const maxEnergy = Number(state.maxEnergy) || 100;

        let html = `
            <div class="home-head">
                <h2>🏠 ${shopName}</h2>
                <p class="muted">第 ${day} 天 · 💰 ${money} · ⚡ ${energy}/${maxEnergy}</p>
            </div>`;

        for (const floor of FLOORS) {
            html += `<section class="floor" aria-label="${floor.name}">
                <h3 class="floor-title"><span aria-hidden="true">${floor.emoji}</span> ${floor.name}</h3>
                <div class="room-grid">`;
            for (const r of floor.rooms) {
                const attr = r.nav ? `data-nav="${r.nav}"` : (r.action ? `data-action="${r.action}"` : '');
                const soon = r.soon ? '<span class="soon">待开放</span>' : '';
                html += `
                    <button type="button" class="room-card" ${attr}>
                        <span class="room-icon" aria-hidden="true">${r.icon}</span>
                        <span class="room-body">
                            <span class="room-name">${r.name} ${soon}</span>
                            <span class="room-desc">${r.desc}</span>
                        </span>
                        <span class="room-arrow" aria-hidden="true">›</span>
                    </button>`;
            }
            html += `</div></section>`;
        }

        contentEl.innerHTML = html;
    }

    // 事件委托：房间导航 + 动作
    document.addEventListener('click', (e) => {
        const nav = e.target.closest('[data-nav]');
        if (nav) { navigate(nav.dataset.nav); return; }

        const act = e.target.closest('[data-action]');
        if (!act) return;
        const action = act.dataset.action;

        const Cake = getCake();
        if (!Cake) return;
        if (action === 'sleep') {
            const shouldSleep = window.confirm('要睡觉进入下一天吗？点击取消可以小憩1小时。');
            if (shouldSleep) { if (typeof Cake.sleep === 'function') Cake.sleep(); }
            else if (typeof Cake.nap === 'function') { Cake.nap(); }
            renderHome();
        }
    });

    // 引擎就绪后渲染
    if (window.safePageBoot && typeof window.safePageBoot.waitForCake === 'function') {
        window.safePageBoot.waitForCake((Cake) => {
            renderHome();
            if (typeof Cake.initPage === 'function') Cake.initPage('home', renderHome, false);
        }, {
            timeout: 15000,
            required: (game) => !!(game && game.store && game.store.state),
            onTimeout: () => '游戏引擎加载超时，请刷新页面'
        });
    } else {
        const Cake = getCake();
        if (Cake && Cake.store && Cake.store.state) {
            renderHome();
            if (typeof Cake.initPage === 'function') Cake.initPage('home', renderHome, false);
        }
    }
})();
