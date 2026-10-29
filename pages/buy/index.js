// pages/buy/index.js
const Cake = window.parent.Cake || window.Cake;
if (!Cake) {
    console.error('未找到 Cake 引擎');
} else {
    let currentCat = 'ingredients';

    const renderShop = () => {
        const grid = document.getElementById('shopGrid');
        
        // 从商店配置里获取
        const shopItems = Cake.SHOP_ITEMS?.[currentCat] || {};
        
        // 转换成数组并过滤掉找不到数据的
        const items = Object.keys(shopItems).map(id => {
            return { id, data: Cake.INGREDIENTS[id] || Cake.TOOLS[id] };
        }).filter(x => x.data);

        if (items.length === 0) {
            grid.innerHTML = '<div class="muted" style="grid-column: 1 / -1; text-align:center;">暂无商品</div>';
            return;
        }

        grid.innerHTML = items.map(({ id, data }) => `
            <div class="item-card" style="padding: 12px;">
                <div class="item-emoji">${data.emoji || '📦'}</div>
                <div class="item-name">${data.name}</div>
                <div class="item-meta"><span class="price-tag">💰 ${data.price}</span></div>
                
                <div class="buy-btn-group">
                    <button class="small secondary" data-buy="${id}" data-qty="1">买1个</button>
                    <button class="small gold" data-buy="${id}" data-qty="10">买10个</button>
                </div>
            </div>
        `).join('');
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

        const res = Cake.orderItem(itemId, qty);
        if (res && res.success === false) {
            alert(res.message);
        } else {
            // 成功时，轻提示（避免 alert 打断体验）
            Cake.addLog(`✅ 成功订购 ${qty} 个 ${Cake.INGREDIENTS[itemId]?.name || Cake.TOOLS[itemId]?.name || itemId}`, 'success');
        }
    });

    // 初始化页面
    if (typeof Cake.initPage === 'function') {
        Cake.initPage('buy', () => {
            renderShop();
        }, false);
    }
}
