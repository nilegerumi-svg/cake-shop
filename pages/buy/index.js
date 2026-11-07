// pages/buy/index.js

// 👈 1. 加上防崩溃导包（如果你还没有加的话）
import '../error-handler.js';

// 引擎由父页面异步注入（js/host/monitor/index.js → js/main.js），
// 不能在模块顶层同步取 Cake，否则引擎未就绪时页面会静默空白且不重试。
let Cake = null;
let currentCat = 'ingredients';

const renderShop = () => {
    const grid = document.getElementById('shopGrid');
    if (!grid) return;

    // 从商店配置里获取
    const shopItems = Cake.SHOP_ITEMS?.[currentCat] || {};

    // 转换成数组
    const items = Object.keys(shopItems).map(id => {
        // 👈 2. 兼容查找：食材 -> 工具 -> 材料包
        let data = Cake.INGREDIENTS?.[id] || Cake.TOOLS?.[id];
        if (!data && Cake.BUNDLES) {
            data = Cake.BUNDLES.find(b => b.id === id);
        }
        return { id, data };
    }).filter(x => {
        if (!x.data) return false;

        // 👈 3. 核心注入：季节白名单过滤！
        if (typeof Cake.isItemAvailableInSeason === 'function') {
            if (!Cake.isItemAvailableInSeason(x.id)) return false; // 不在当前季节白名单，直接过滤掉
        }

        return true;
    });

    if (items.length === 0) {
        grid.innerHTML = '<div class="muted" style="grid-column: 1 / -1; text-align:center; padding: 20px 0;">当前季节暂无商品上架~</div>';
        return;
    }

    grid.innerHTML = items.map(({ id, data }) => {
        // 如果是材料包，价格字段叫 cost；如果是食材，叫 price
        const price = data.price || data.cost || 0;
        // 如果是材料包，显示材料包描述
        const desc = data.desc ? `<div class="muted" style="font-size:11px; margin-top:4px; text-align:center;">${data.desc}</div>` : '';

        return `
            <div class="item-card" style="padding: 12px;">
                <div class="item-emoji">${data.emoji || '📦'}</div>
                <div class="item-name">${data.name}</div>
                ${desc}
                <div class="item-meta"><span class="price-tag">💰 ${price}</span></div>

                <div class="buy-btn-group">
                    <button class="small secondary" data-buy="${id}" data-qty="1">买1个</button>
                    <button class="small gold" data-buy="${id}" data-qty="10">买10个</button>
                </div>
            </div>
        `;
    }).join('');
};

// 事件委托：处理分类切换（不依赖引擎，可提前绑定）
const bindCategoryTabs = () => {
    const tabs = document.getElementById('categoryTabs');
    if (!tabs || tabs.dataset.bound === 'true') return;
    tabs.dataset.bound = 'true';

    tabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.cat-btn');
        if (!btn) return;

        // 更新状态
        currentCat = btn.dataset.cat;

        // 更新 UI 高亮
        document.querySelectorAll('.cat-btn').forEach(b => {
            b.classList.toggle('active', b === btn);
        });

        renderShop();
    });
};

// 事件委托：处理购买（不依赖引擎，可提前绑定）
const bindBuyActions = () => {
    const grid = document.getElementById('shopGrid');
    if (!grid || grid.dataset.bound === 'true') return;
    grid.dataset.bound = 'true';

    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-buy]');
        if (!btn || !Cake) return;

        const itemId = btn.dataset.buy;
        const qty = parseInt(btn.dataset.qty, 10) || 1;

        // 判断是不是材料包
        const isBundle = Cake.BUNDLES?.some(b => b.id === itemId);

        if (isBundle) {
            if (typeof Cake.buyBundle === 'function') {
                for (let i = 0; i < qty; i++) {
                    const res = Cake.buyBundle(itemId);
                    if (res && res.success === false) {
                        alert(res.message);
                        break; // 钱不够等情况，不再继续扣费
                    }
                }
            } else {
                alert('购买材料包的功能暂未实现');
            }
            renderShop(); // 购买后余额变化，刷新按钮状态
            return;
        }

        // 普通的单个食材/工具购买
        const res = Cake.orderItem(itemId, qty);
        if (res && res.success === false) {
            alert(res.message);
        } else {
            // 成功时，轻提示（避免 alert 打断体验）
            const itemName = Cake.INGREDIENTS?.[itemId]?.name || Cake.TOOLS?.[itemId]?.name || itemId;
            Cake.addLog(`🛒 成功订购 ${qty} 个 ${itemName}`, 'success');
            renderShop();
        }
    });
};

const start = () => {
    bindCategoryTabs();
    bindBuyActions();

    // 初始化页面
    if (typeof Cake.initPage === 'function') {
        Cake.initPage('buy', () => {
            renderShop();
        }, false);
    } else {
        // 兜底：即使 initPage 缺失也要能渲染
        renderShop();
    }
};

// 👈 等待引擎与商品数据就绪（与烘焙页/配方页一致）
if (window.safePageBoot && typeof window.safePageBoot.waitForCake === 'function') {
    window.safePageBoot.waitForCake((readyCake) => {
        Cake = readyCake;
        start();
    }, {
        timeout: 15000,
        // 必须等商店清单与食材库都到位，否则会渲染成「当前季节暂无商品上架」
        required: (game) => !!(game && game.store && game.store.state
            && game.SHOP_ITEMS && game.INGREDIENTS),
        onTimeout: () => '采购中心：游戏引擎或商品数据加载超时，请刷新页面重试。'
    });
} else {
    Cake = window.parent.Cake || window.Cake;
    if (Cake && Cake.store && Cake.store.state) {
        start();
    } else {
        console.error('未找到 Cake 引擎');
    }
}
