<script type="module">
    // 1. 移除那个路径容易错的 error-handler（防崩溃已经由父页面的 monitor 接管）

    // 2. 全局变量与轮询等待机制
    let Cake = null;
    let checkCount = 0;

    function waitForEngine() {
        Cake = window.parent.Cake || window.Cake;
        // 必须确保核心数据方法也挂载了才能开始渲染
        if (Cake && typeof Cake.getRegionLocations === 'function') {
            initPage();
        } else {
            checkCount++;
            if (checkCount < 50) { // 最多等 5 秒
                setTimeout(waitForEngine, 100);
            } else {
                document.body.innerHTML = '<h3 style="color:red; text-align:center; margin-top:50px;">❌ 游戏引擎加载超时，请刷新重试</h3>';
            }
        }
    }

    // 当前所在的区域和地点
    const REGION_ID = 'town';
    let currentLocId = 'home'; 

    // === 渲染左侧/顶部的地点导航 ===
    function renderNav(locations) {
        const grid = document.getElementById('nav-grid');
        if (!grid) return;

        // 直接用 Object.entries 拿到 key 和 value，不用再通过名字反查
        grid.innerHTML = Object.entries(locations).map(([key, loc]) => {
            const isActive = (key === currentLocId);
            return `
                <div class="loc-nav-btn ${isActive ? 'active' : ''}" onclick="switchLocation('${key}')">
                    ${loc.name}
                </div>
            `;
        }).join('');
    }

    // === 切换地点 ===
    window.switchLocation = (locId) => {
        currentLocId = locId;
        renderUI();
    };

    // === 渲染主界面 ===
    function renderUI() {
        try {
            if (typeof Cake.getRegionLocations !== 'function') return;

            const locations = Cake.getRegionLocations(REGION_ID);
            if (!locations || Object.keys(locations).length === 0) {
                console.warn('⚠️ 城镇地点数据为空！');
                document.getElementById('nav-grid').innerHTML = '<div class="muted">暂无地点数据</div>';
                return;
            }

            // 1. 重新渲染导航高亮
            renderNav(locations);

            // 2. 更新地点信息卡
            const locConfig = locations[currentLocId];
            if (!locConfig) return;

            document.getElementById('loc-title').textContent = (locConfig.emoji || '📍') + ' ' + locConfig.name;
            document.getElementById('loc-desc').textContent = locConfig.desc || '';

            // 3. 渲染动作按钮
            const actions = (typeof Cake.getLocationActions === 'function') 
                ? Cake.getLocationActions(REGION_ID, currentLocId) 
                : [];
            const actionsGrid = document.getElementById('actions-grid');
            
            if (actions.length === 0) {
                actionsGrid.innerHTML = '<div class="muted" style="grid-column: span 2;">此处没有任何互动。</div>';
            } else {
                actionsGrid.innerHTML = actions.map(act => `
                    <div class="action-btn" onclick="doAction('${act.key}')">
                        <span style="font-size: 20px; margin-bottom: 4px;">${act.emoji}</span>
                        <strong>${act.name}</strong>
                        <span class="desc">${act.desc}</span>
                    </div>
                `).join('');
            }

            // 4. 商店面板
            const shopPanel = document.getElementById('shop-panel');
            if (locConfig.type === 'shop') {
                shopPanel.style.display = 'block';
                document.getElementById('shop-title').textContent = (locConfig.emoji || '🏪') + ' ' + locConfig.name;
                
                const items = (typeof Cake.getShopItems === 'function') 
                    ? Cake.getShopItems(currentLocId) 
                    : [];
                const itemsGrid = document.getElementById('shop-items');
                
                if (items && items.length > 0) {
                    itemsGrid.innerHTML = items.map(item => `
                        <div class="item-card">
                            <div class="item-emoji">${item.emoji || '📦'}</div>
                            <div class="item-name">${item.name}</div>
                            <div class="item-meta"><span class="price-tag">💰 ${item.price || 0}</span></div>
                            <button class="small" style="width: 100%; margin-top: 8px;" onclick="buyItem('${item.id}')">订购</button>
                        </div>
                    `).join('');
                } else {
                    itemsGrid.innerHTML = '<div class="muted" style="grid-column: span 2;">商品卖空了。</div>';
                }
            } else {
                shopPanel.style.display = 'none';
            }
        } catch (err) {
            console.error('❌ [娱乐页] 渲染崩溃:', err);
            document.getElementById('location-panel').innerHTML = `
                <div style="color:red; padding:20px; background:#fff; border-radius:10px;">
                    页面渲染遇到错误: ${err.message}
                </div>
            `;
        }
    }

    // === 执行动作 ===
    window.doAction = (actionKey) => {
        if (typeof Cake.performLocationAction !== 'function') return;
        const res = Cake.performLocationAction(REGION_ID, currentLocId, actionKey);
        if (res && res.success === false) {
            alert(res.message);
        }
        setTimeout(renderUI, 100); 
    };

    // === 购买物品 ===
    window.buyItem = (itemId) => {
        if (typeof Cake.orderItem !== 'function') return;
        const res = Cake.orderItem(itemId, 1);
        if (res && res.success === false) {
            alert(res.message);
        } else {
            alert('订购成功！将在 2 小时内送达店铺。');
        }
    };

    // === 初始化页面 ===
    function initPage() {
        if (typeof Cake.initPage === 'function') {
            Cake.initPage('fun', () => {
                renderUI();
            }, false);
        } else {
            renderUI();
        }
    }

    // 启动等待机制
    waitForEngine();
</script>
