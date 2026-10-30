// pages/larder/index.js —— 食材库主界面逻辑
(() => {
    'use strict';

    let Cake = null;
    let currentCat = 'all';

    const $ = (id) => document.getElementById(id);
    const num = (v, fallback = 0) => Number.isFinite(Number(v)) ? Number(v) : fallback;

    // 食材分类中文名（与 INGREDIENTS 合并时的 shelfCategory 对应）
    const CAT_LABELS = {
        meat: '🥩 肉类',
        vegetable: '🥬 蔬菜',
        grain: '🌾 谷物',
        egg: '🥚 蛋类',
        dairy: '🥛 奶类',
        fruit: '🍓 水果',
        seasoning: '🧂 调料',
        additive: '🧁 辅料',
        material: '🪵 建材',
        default: '📦 其他'
    };

    const CLOCK_EMOJI = { dry: '🟢', common: '🟢', normal: '🟢' };

    function escapeHtml(v) {
        return String(v ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // 获取该食材当前库存（含腐烂统计）
    function getStockState(itemId) {
        const state = Cake.store?.state;
        const inv = (state && Array.isArray(state.inventory)) ? state.inventory : [];
        const items = inv.filter((it) => it && it.id === itemId);
        return {
            total: items.length,
            rotten: items.filter((it) => it.isRotten).length,
            minRemain: (() => {
                let min = Infinity;
                for (const it of items) {
                    const remain = Number(it.expireDay) - Number(state.time?.day || 1);
                    if (!Number.isFinite(remain)) continue;
                    if (remain < min) min = remain;
                }
                return Number.isFinite(min) ? Math.max(0, min) : null;
            })()
        };
    }

    function renderGrid() {
        const grid = $('larderGrid');
        if (!grid) return;

        const ingredients = (Cake && Cake.INGREDIENTS) ? Cake.INGREDIENTS : {};
        const ids = Object.keys(ingredients).sort((a, b) => {
            const an = ingredients[a].name || a;
            const bn = ingredients[b].name || b;
            return an.localeCompare(bn, 'zh-Hans-CN');
        });

        const rows = ids
            .filter((id) => {
                if (currentCat === 'all') return true;
                const it = ingredients[id];
                const cat = it.shelfCategory || (it.tags && it.tags[0]) || 'default';
                return cat === currentCat;
            })
            .map((id) => {
                const it = ingredients[id] || {};
                const cat = it.shelfCategory || (it.tags && it.tags[0]) || 'default';
                const catLabel = CAT_LABELS[cat] || CAT_LABELS.default;
                const stock = getStockState(id);
                const shelf = (typeof Cake.getRandomShelfLife === 'function')
                    ? (() => { try { return Cake.getRandomShelfLife(cat); } catch (_) { return null; } })()
                    : null;

                let badge = '';
                if (stock.total > 0 && stock.rotten > 0) {
                    badge = `<span class="spoil-badge rotten">☠️ 腐烂 ${stock.rotten}</span>`;
                }

                return `
                    <div class="ing-card">
                        <span class="ing-emoji">${it.emoji || '📦'}</span>
                        <span class="ing-name">${escapeHtml(it.name || id)}</span>
                        <span class="ing-cat">${catLabel}</span>
                        <span class="ing-price">💰 ${num(it.price, 0)}/份</span>
                        <span class="ing-stock">库存：${stock.total}${stock.rotten > 0 ? `（烂${stock.rotten}）` : ''}</span>
                        <span class="ing-days">保质期约 ${shelf != null ? shelf : '—'} 天</span>
                        ${badge}
                    </div>
                `;
            }).join('');

        grid.innerHTML = rows
            ? `<div class="larder-grid">${rows}</div>`
            : '<div class="muted" style="padding: 20px; text-align:center;">该分类暂无食材</div>';
    }

    function bindTabs() {
        const tabsWrap = $('categoryTabs');
        if (!tabsWrap || tabsWrap.dataset.bound === 'true') return;
        tabsWrap.dataset.bound = 'true';

        tabsWrap.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-cat]');
            if (!btn) return;
            currentCat = btn.dataset.cat;
            tabsWrap.querySelectorAll('.cat-btn').forEach((b) => b.classList.toggle('active', b === btn));
            renderGrid();
        });
    }

    function start() {
        bindTabs();
        if (typeof Cake.initPage === 'function') {
            Cake.initPage('profile', renderGrid, false);
        } else {
            renderGrid();
        }
    }

    if (window.safePageBoot && typeof window.safePageBoot.waitForCake === 'function') {
        window.safePageBoot.waitForCake((readyCake) => {
            Cake = readyCake;
            start();
        }, {
            timeout: 15000,
            required: (game) => !!(game && game.store && game.store.state && game.INGREDIENTS),
            onTimeout: () => '食材库：游戏引擎或食材数据加载超时，请刷新页面重试。'
        });
    } else {
        Cake = window.parent.Cake || window.Cake;
        if (Cake && Cake.store && Cake.store.state) start();
    }
})();