<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* 局部样式补丁，配合全局 styles.css */
        .loc-nav-btn { 
            background: #fff; color: var(--pink-600); border: 1px solid var(--pink-200); 
            padding: 10px; border-radius: 8px; text-align: center; cursor: pointer; 
            transition: all 0.2s; font-weight: bold; font-size: 14px;
        }
        .loc-nav-btn.active { 
            background: var(--pink-400); color: #fff; border-color: var(--pink-400); 
            box-shadow: 0 2px 8px rgba(255,143,163,0.3);
        }
        .loc-nav-btn:active { transform: scale(0.96); }
        
        .action-btn {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            background: var(--pink-50); border: 1px dashed var(--pink-300); 
            padding: 10px; border-radius: 10px; cursor: pointer; color: var(--pink-600);
        }
        .action-btn:active { background: var(--pink-100); }
        .action-btn .desc { font-size: 11px; color: var(--text-muted); margin-top: 4px; }
    </style>
</head>
<body>
    <div class="game-body">
        
        <!-- 1. 地点导航栏 -->
        <div class="card">
            <h2>🗺️ 甜蜜小镇</h2>
            <div id="nav-grid" class="grid-2" style="margin-top: 10px;">
                <!-- 地点按钮由 JS 动态生成 -->
            </div>
        </div>

        <!-- 2. 当前地点信息与动作 -->
        <div class="card" id="location-panel">
            <h3 id="loc-title">🏠 甜蜜小屋</h3>
            <p class="muted mb-8" id="loc-desc">温馨的烘焙坊，可以在此休息。</p>
            
            <div id="actions-grid" class="grid-2" style="margin-top: 15px;">
                <!-- 动作按钮由 JS 动态生成 -->
            </div>
        </div>

        <!-- 3. 商店面板（只有到了超市才会显示） -->
        <div class="card" id="shop-panel" style="display: none;">
            <h3 id="shop-title">🏪 街角超市</h3>
            <p class="muted mb-8">这里可以买到烘焙材料。</p>
            <div id="shop-items" class="grid-2">
                <!-- 商品由 JS 动态生成 -->
            </div>
        </div>

    </div>

    <script type="module">
        const Cake = window.parent.Cake || window.Cake;
        
        // 当前所在的区域和地点
        const REGION_ID = 'town';
        let currentLocId = 'home'; 

        // === 渲染左侧/顶部的地点导航 ===
        function renderNav() {
            const grid = document.getElementById('nav-grid');
            const locations = Cake.getRegionLocations(REGION_ID);
            
            grid.innerHTML = Object.values(locations).map(loc => {
                // 注意：这里只是点击切换当前查看的地点，真正的“走路”动作在下面
                const isActive = (loc.name === locations[currentLocId]?.name);
                return `
                    <div class="loc-nav-btn ${isActive ? 'active' : ''}" onclick="switchLocation('${loc.name}')">
                        ${loc.name}
                    </div>
                `;
            }).join('');
        }

        // 辅助：根据名字找 key (因为 getRegionLocations 返回的是对象，需要反查)
        function getLocKeyByName(name) {
            const locations = Cake.getRegionLocations(REGION_ID);
            for (const key in locations) {
                if (locations[key].name === name) return key;
            }
            return 'home';
        }

        // === 切换地点 ===
        window.switchLocation = (locName) => {
            currentLocId = getLocKeyByName(locName);
            renderUI();
        };

        // === 渲染主界面 ===
        function renderUI() {
            // 1. 重新渲染导航高亮
            renderNav();

            const locations = Cake.getRegionLocations(REGION_ID);
            const locConfig = locations[currentLocId];
            if (!locConfig) return;

            // 2. 更新地点信息卡
            document.getElementById('loc-title').textContent = locConfig.emoji + ' ' + locConfig.name;
            document.getElementById('loc-desc').textContent = locConfig.desc;

            // 3. 渲染动作按钮（这是底层 location_actions.js 的绝杀）
            const actions = Cake.getLocationActions(REGION_ID, currentLocId);
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

            // 4. 如果是商店，渲染商品面板
            const shopPanel = document.getElementById('shop-panel');
            if (locConfig.type === 'shop') {
                shopPanel.style.display = 'block';
                document.getElementById('shop-title').textContent = locConfig.emoji + ' ' + locConfig.name;
                
                const items = Cake.getShopItems(currentLocId);
                const itemsGrid = document.getElementById('shop-items');
                
                if (items && items.length > 0) {
                    itemsGrid.innerHTML = items.map(item => `
                        <div class="item-card">
                            <div class="item-emoji">${item.emoji}</div>
                            <div class="item-name">${item.name}</div>
                            <div class="item-meta"><span class="price-tag">💰 ${item.price}</span></div>
                            <button class="small" style="width: 100%; margin-top: 8px;" onclick="buyItem('${item.id}')">订购</button>
                        </div>
                    `).join('');
                } else {
                    itemsGrid.innerHTML = '<div class="muted" style="grid-column: span 2;">商品卖空了。</div>';
                }
            } else {
                shopPanel.style.display = 'none';
            }
        }

        // === 执行动作（散步、打盹、睡觉） ===
        window.doAction = (actionKey) => {
            // 底层分发器会自动根据当前区域和地点执行逻辑
            Cake.performLocationAction(REGION_ID, currentLocId, actionKey);
            // 动作执行后（可能会扣时间），触发重绘
            setTimeout(renderUI, 100);
        };

        // === 购买物品 ===
        window.buyItem = (itemId) => {
            const res = Cake.orderItem(itemId, 1);
            if (res && res.success === false) {
                alert(res.message);
            } else {
                alert('订购成功！将在 2 小时内送达店铺。');
            }
        };

        // === 初始化 ===
        Cake.initPage('fun', () => {
            renderUI();
        }, false);

    </script>
</body>
</html>
