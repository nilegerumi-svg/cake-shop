// pages/shop/page.js —— 店铺经营页逻辑（从 index.html 内联拆分）
(() => {
    'use strict';

    const getCake = () => window.parent.Cake || window.Cake;

    const shopStatusEl = () => document.getElementById('shopStatus');
    const shelfEl = () => document.getElementById('shop-shelf');
    const toggleBtnEl = () => document.getElementById('toggleShopBtn');

    function setStatus(msg, type = '') {
        const el = shopStatusEl();
        if (!el) return;
        el.textContent = msg;
        el.className = 'shop-status';
        if (type) el.classList.add(type);
    }

    function renderEmptyState(message = '当前暂无货架商品') {
        const el = shelfEl();
        if (!el) return;
        el.innerHTML = `<div class="empty-state">${message}</div>`;
    }

    function renderShopPage() {
        try {
            const Cake = getCake();
            if (!Cake || !Cake.store || !Cake.store.state) {
                renderEmptyState('等待游戏引擎加载中...');
                return;
            }

            const state = Cake.store.state;
            const shop = state.shop || {};
            const foods = state.foods || {};

            const isOpen = !!shop.isOpen;
            const toggleBtn = toggleBtnEl();
            if (toggleBtn) {
                toggleBtn.textContent = isOpen ? '打烊' : '开始营业';
                toggleBtn.disabled = false;
                toggleBtn.onclick = () => {
                    if (typeof Cake.toggleShopStatus === 'function') {
                        const res = Cake.toggleShopStatus();
                        if (res && res.success === false) {
                            alert(res.message);
                        }
                        renderShopPage();
                    } else {
                        alert('营业控制器还未加载');
                    }
                };
            }

            const shelf = shelfEl();
            if (!shelf) return;

            // 组装货架：只展示成品糕点（state.foods）；名称/emoji 从配方表回查，
            // 不再直接平铺原材料库存（state.inventory），避免出现"未知商品"并防止误卖食材。
            const shelfRows = [];
            for (const [recipeKey, data] of Object.entries(foods)) {
                if (!data) continue;
                const recipe = Cake.RECIPES[recipeKey];
                const name = recipe ? recipe.name : recipeKey;
                const emoji = recipe && recipe.emoji ? recipe.emoji : '🧁';
                const p = data.perfect || 0;
                const g = data.good || 0;
                const n = data.normal || 0;
                const f = data.failed || 0;
                if (p + g + n + f === 0) continue;
                shelfRows.push({ recipeKey, name, emoji, p, g, n, f });
            }

            if (!shelfRows.length) {
                renderEmptyState('货架上还没有成品糕点，先去烘焙～');
                setStatus(isOpen ? '店铺正在营业中' : '店铺已休息，等待开店', isOpen ? 'success' : '');
                return;
            }

            const items = shelfRows.map((row) => {
                const parts = [];
                if (row.p > 0) parts.push(`✨ 完美 ${row.p}`);
                if (row.g > 0) parts.push(`👍 优良 ${row.g}`);
                if (row.n > 0) parts.push(`普通 ${row.n}`);
                if (row.f > 0) parts.push(`💀 失败 ${row.f}`);
                return `
                    <div class="shelf-item">
                        <div class="emoji">${row.emoji}</div>
                        <div class="name">${row.name}</div>
                        <div class="meta">${parts.join(' / ') || '暂无可用'}</div>
                        <div class="actions">
                            <button class="small-btn" type="button" data-sell-qty="${row.recipeKey}" data-q="${row.p}" data-quality="perfect">卖完美</button>
                            <button class="small-btn" type="button" data-sell-qty="${row.recipeKey}" data-q="${row.g}" data-quality="good">卖优良</button>
                            <button class="small-btn" type="button" data-sell-qty="${row.recipeKey}" data-q="${row.n}" data-quality="normal">卖普通</button>
                        </div>
                    </div>
                `;
            }).join('');

            shelf.innerHTML = `<div class="shelf-grid">${items}</div>`;

            shelf.querySelectorAll('[data-sell-qty]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const recipeKey = btn.dataset.sellQty;
                    const quality = btn.dataset.quality;
                    const available = Number(btn.dataset.q) || 0;
                    if (!recipeKey || !available) return;

                    if (typeof Cake.sellFood === 'function') {
                        const res = Cake.sellFood(recipeKey, quality, 1);
                        if (res && res.success === false) {
                            alert(res.message || '卖出失败');
                        } else {
                            renderShopPage();
                        }
                    } else {
                        alert('卖出功能未加载');
                    }
                });
            });

            setStatus(isOpen ? '店铺正在营业中' : '店铺已休息，等待开店', isOpen ? 'success' : '');
        } catch (err) {
            console.error('[Shop Page] 渲染失败:', err);
            setStatus(`渲染失败：${err.message || '未知错误'}`, 'error');
            renderEmptyState('页面发生异常，请刷新后重试');
        }
    }

    let checkCount = 0;

    function waitForEngine() {
        const Cake = getCake();
        if (Cake && Cake.store && Cake.store.state) {
            renderShopPage();
            return;
        }

        checkCount++;
        if (checkCount < 150) {
            setTimeout(waitForEngine, 100);
            return;
        }

        setStatus('游戏引擎加载超时，请刷新页面重试', 'error');
        renderEmptyState('游戏引擎加载超时，请刷新页面重试');
    }

    window.addEventListener('refresh_ui', renderShopPage);
    window.addEventListener('storage', renderShopPage);

    waitForEngine();
})();