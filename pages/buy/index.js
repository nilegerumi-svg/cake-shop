// pages/buy/index.js

// 👈 1. 加上防崩溃导包（如果你还没有加的话）
import '../error-handler.js';

const Cake = window.parent.Cake || window.Cake;
if (!Cake) {
    console.error('未找到 Cake 引擎');
} else {
    let currentCat = 'ingredients';

    const renderShop = () => {
        const grid = document.getElementById('shopGrid');
        
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

    // 事件委托：处理分类切换
    document.getElementById('categoryTabs').addEventListener('click', (e) => {
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

    // 事件委托：处理购买
    document.getElementById('shopGrid').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-buy]');
        if (!btn) return;

        const itemId = btn.dataset.buy;
        const qty = parseInt(btn.dataset.qty, 10) || 1;

        // 判断是不是材料包
        const isBundle = Cake.BUNDLES?.some(b => b.id === itemId);

        if (isBundle) {
            // 如果是材料包，调用你之前可能写过的 buyBundle 逻辑
            if (typeof Cake.buyBundle === 'function') {
                // 假设买 1 个就是买 1 套，材料包通常不支持买 10 套这种写法，我们可以循环或直接调用
                for (let i = 0; i < qty; i++) {
                    Cake.buyBundle(itemId);
                }
            } else {
                // 如果没有定义 buyBundle，临时兜底
                alert('购买材料包的功能暂未实现');
            }
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
        }
    });

    // 初始化页面
    if (typeof Cake.initPage === 'function') {
        Cake.initPage('buy', () => {
            renderShop();
        }, false);
    }
}
