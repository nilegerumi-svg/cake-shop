// pages/entertainment/map/location.js —— 地点页逻辑（从 location.html 内联拆分）
let Cake = null;
const $ = (id) => document.getElementById(id);
const num = (v, fallback = 0) => Number.isFinite(Number(v)) ? Number(v) : fallback;

function getCake() {
    try {
        if (window.parent && window.parent !== window && window.parent.Cake) return window.parent.Cake;
    } catch (_) {}
    return window.Cake || null;
}

window.handleLocationAction = (actionKey, locKey) => {
    if (!Cake || !Cake.store || !Cake.store.state) return;
    try {
        const res = Cake.performLocationAction && Cake.performLocationAction('town', locKey, actionKey);
        if (res && res.success === false) {
            alert(res.message);
            return;
        }
    } catch (err) {
        console.error('[location] 动作执行失败:', err);
        alert('❌ 动作执行失败：' + (err && err.message || err));
        return;
    }
    setTimeout(renderLocation, 200);
};

function renderLocation() {
    Cake = getCake();
    if (!Cake || !Cake.store || !Cake.store.state) return;
    const params = new URLSearchParams(window.location.search);
    const key = params.get('id') || 'park';

    // 统一从区域配置取地点数据，并与动作接口保持一致
    let loc = null;
    const locs = (typeof Cake.getRegionLocations === 'function') ? Cake.getRegionLocations('town') : null;
    loc = (locs && (locs[key] || (locs.find && locs.find((x) => x.id === key || x.key === key)))) || null;

    // 兜底：从汇总 LOCATIONS 中查找
    if (!loc) {
        const list = Array.isArray(Cake.LOCATIONS) ? Cake.LOCATIONS : Object.values(Cake.LOCATIONS || {});
        loc = list.find((item) => item.id === key || item.key === key) || null;
    }

    loc = loc || { id: key, name: '未知地点', emoji: '📍', desc: '该地点目前尚未配置。' };
    const state = Cake.store.state;

    $('pageTitle').textContent = `${loc.emoji || '📍'} ${loc.name || '地点'}`;
    $('energy').textContent = num(state.energy, 0);

    // 动作列表：优先引擎接口，兜底 loc.actions
    let actions = [];
    if (typeof Cake.getLocationActions === 'function') {
        try { actions = Cake.getLocationActions('town', key) || []; } catch (_) {}
    }
    if (actions.length === 0 && Array.isArray(loc.actions)) actions = loc.actions;

    // 内嵌商店：该地点配了商店时，显示商店入口按钮（点击弹窗分类选购，不再平铺）
    let shopHtml = '';
    try {
        const shopInfo = (typeof Cake.getLocationShop === 'function') ? Cake.getLocationShop('town', key) : null;
        if (shopInfo && Array.isArray(shopInfo.items) && shopInfo.items.length > 0) {
            shopHtml = `
                <div class="section-title">${shopInfo.shop.emoji || '🏪'} ${shopInfo.shop.name || '商店'}</div>
                <button class="shop-entry" type="button" data-open-shop="${key}">
                    <span>🛒 进入商店选购</span>
                    <span class="action-arrow">▶</span>
                </button>
                <div class="shop-hint">点击按钮，在弹窗中按分类选购，下单后约 2 小时送达店铺</div>
            `;
        }
    } catch (err) {
        // 商店数据缺失时不影响地点探索
        console.warn('[location] 商店渲染跳过:', err);
    }

    const html = `
        <div class="loc-head">
            <div class="loc-emoji">${loc.emoji || '📍'}</div>
            <div class="loc-meta">
                <div class="loc-name">${loc.name || '地点'}</div>
                <div class="loc-desc">${loc.desc || '探索与互动'}</div>
            </div>
        </div>
        <div class="section-title">可执行动作</div>
        <div class="action-list">
            ${actions.map((action) => {
                const actionKey = action.key || action.id || action.name || 'action';
                const disabled = num(action.cost, 0) > num(state.energy, 0);
                return `
                    <button class="action-item ${action.type === 'rest' ? 'rest' : ''} ${disabled ? 'disabled' : ''}" type="button" data-action="${actionKey}" data-loc="${key}" ${disabled ? 'disabled' : ''} onclick="window.handleLocationAction && window.handleLocationAction('${actionKey}', '${key}')">
                        <div class="action-info">
                            <div class="action-emoji">${action.emoji || '✨'}</div>
                            <div class="action-text">
                                <div class="action-name">${action.name || '动作'}</div>
                                <div class="action-desc">${action.desc || '进行一次活动'}${action.cost ? ` · 消耗 ${action.cost} 精力` : ''}</div>
                            </div>
                        </div>
                        <div class="action-arrow">${disabled ? '锁定' : '执行'}</div>
                    </button>
                `;
            }).join('') || '<div class="muted text-center">暂无可执行动作</div>' }
        </div>
        ${shopHtml}
    `;
    $('locationContent').innerHTML = html;
    bindShopButtons();
}

// === 商店弹窗：分类选购（食材/工具/建材） ===
const SHOP_CATEGORIES = [
    { id: 'ingredients', label: '🥩 基础食材', match: (item) => {
        // 食材：在 INGREDIENTS 中，且不是建材
        return !!Cake.INGREDIENTS?.[item.id] && !(Array.isArray(item.tags) && item.tags.includes('material'));
    }},
    { id: 'materials', label: '🪵 建造材料', match: (item) => {
        return Array.isArray(item.tags) && item.tags.includes('material');
    }},
    { id: 'tools', label: '🛠️ 厨房工具', match: (item) => {
        return !!Cake.TOOLS?.[item.id];
    }}
];

let shopModalState = { locKey: null, cat: 'ingredients' };

function openShopModal(locKey) {
    if (!Cake || !Cake.store || !Cake.store.state) return;
    const shopInfo = (typeof Cake.getLocationShop === 'function')
        ? Cake.getLocationShop('town', locKey)
        : null;
    if (!shopInfo || !Array.isArray(shopInfo.items)) return;

    shopModalState = { locKey: locKey, cat: 'ingredients' };
    renderShopModal(shopInfo);
}

function renderShopModal(shopInfo) {
    const { locKey, cat } = shopModalState;
    const money = num(Cake.store.state.money, 0);

    // 分类 tab
    const tabs = SHOP_CATEGORIES.map((c) => `
        <button class="shop-tab ${c.id === cat ? 'active' : ''}" type="button" data-shop-cat="${c.id}">${c.label}</button>
    `).join('');

    // 当前分类下的商品
    const catDef = SHOP_CATEGORIES.find((c) => c.id === cat) || SHOP_CATEGORIES[0];
    const items = shopInfo.items.filter((it) => catDef.match(it));

    const rows = items.map((item) => {
        const price = num(item.price, 0);
        const affordable = money >= price;
        return `
            <div class="shop-row">
                <span class="shop-emoji">${item.emoji || '📦'}</span>
                <span class="shop-name">${item.name || item.id}</span>
                <span class="shop-price">💰 ${price}</span>
                <button class="buy-btn" type="button" data-buy="${item.id}" ${affordable ? '' : 'disabled'}>${affordable ? '订购' : '钱不够'}</button>
            </div>
        `;
    }).join('') || '<div class="muted" style="text-align:center; padding:12px;">本类暂无商品</div>';

    if (typeof Cake.showModal === 'function') {
        Cake.showModal(`${shopInfo.shop.emoji || '🏪'} ${shopInfo.shop.name || '商店'}`, `
            <div class="shop-tabs">${tabs}</div>
            <div class="shop-list">${rows}</div>
            <div class="shop-hint">💰 余额 ${money} · 下单后约 2 小时送达店铺 · 点击「💗 知道了」关闭</div>
        `);
    } else {
        alert('❌ 弹窗组件未加载，请刷新重试');
    }

    // 绑定弹窗内分类切换与订购
    bindShopModalEvents();
}

function bindShopModalEvents() {
    const modal = Cake.$ && Cake.$('gameModal');
    if (!modal) return;
    if (modal.dataset.shopBound === 'true') return;
    modal.dataset.shopBound = 'true';

    modal.addEventListener('click', (e) => {
        // 分类切换
        const tab = e.target.closest('[data-shop-cat]');
        if (tab) {
            shopModalState.cat = tab.dataset.shopCat;
            const shopInfo = (typeof Cake.getLocationShop === 'function')
                ? Cake.getLocationShop('town', shopModalState.locKey)
                : null;
            if (shopInfo) renderShopModal(shopInfo);
            return;
        }

        // 订购按钮
        const btn = e.target.closest('[data-buy]');
        if (!btn || btn.disabled) return;
        const itemId = btn.dataset.buy;
        if (!Cake || !Cake.store || !Cake.store.state) return;

        try {
            if (typeof Cake.orderItem !== 'function') {
                alert('❌ 订购功能未加载，请刷新重试');
                return;
            }
            const res = Cake.orderItem(itemId, 1);
            if (res && res.success === false) {
                alert(res.message || '订购失败');
            } else {
                // 订购成功后刷新弹窗（更新余额与按钮状态）
                const shopInfo = (typeof Cake.getLocationShop === 'function')
                    ? Cake.getLocationShop('town', shopModalState.locKey)
                    : null;
                if (shopInfo) renderShopModal(shopInfo);
            }
        } catch (err) {
            console.error('[location] 订购失败:', err);
            alert('❌ 订购失败：' + (err && err.message || err));
        }
    });
}

// === 商店入口按钮事件（事件委托，避免重渲染后失效） ===
function bindShopButtons() {
    const root = $('locationContent');
    if (!root || root.dataset.shopBound === 'true') return;
    root.dataset.shopBound = 'true';

    root.addEventListener('click', (e) => {
        const entry = e.target.closest('[data-open-shop]');
        if (!entry) return;
        openShopModal(entry.dataset.openShop);
    });
}

function bindPage() {
    const backBtn = $('btnBack');
    if (backBtn && backBtn.dataset.bound !== 'true') {
        backBtn.dataset.bound = 'true';
        backBtn.onclick = () => history.back();
    }
    renderLocation();
    if (typeof Cake?.initPage === 'function') {
        Cake.initPage('fun', renderLocation, false);
    }
}

if (window.safePageBoot && typeof window.safePageBoot.waitForCake === 'function') {
    window.safePageBoot.waitForCake((readyCake) => {
        Cake = readyCake;
        bindPage();
    }, {
        timeout: 15000,
        required: (game) => !!(game && game.store && game.store.state),
        onTimeout: () => '地图地点数据加载超时，请刷新页面'
    });
} else {
    Cake = getCake();
    if (Cake && Cake.store && Cake.store.state) bindPage();
}