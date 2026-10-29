// pages/bake/index.js
const Cake = window.parent.Cake || window.Cake;
if (!Cake) {
    console.error('未找到 Cake 引擎');
} else {
    let currentSelected = null;

    // === 渲染左侧配方菜单 ===
    const renderMenu = () => {
        const state = Cake.store.state;
        const menuEl = document.getElementById('recipeMenu');
        
        // 过滤出已解锁的烘焙配方
        const unlocked = Object.keys(Cake.RECIPES).filter(k => 
            state.unlockedRecipes[k] && Cake.RECIPES[k].skill === 'bakery'
        );

        if (unlocked.length === 0) {
            menuEl.innerHTML = '<div class="muted">暂无解锁的配方</div>';
            return;
        }

        menuEl.innerHTML = unlocked.map(key => {
            const r = Cake.RECIPES[key];
            return `
                <div class="recipe-item ${currentSelected === key ? 'active' : ''}" data-recipe="${key}">
                    <div style="font-size: 24px;">${r.emoji || '🍰'}</div>
                    <div style="font-weight: bold; font-size: 13px; margin-top: 5px;">${r.name}</div>
                </div>
            `;
        }).join('');
    };

    // === 渲染右侧工作台 ===
    const renderWorkbench = () => {
        const benchEl = document.getElementById('workbench');
        if (!currentSelected) return;

        const state = Cake.store.state;
        const r = Cake.RECIPES[currentSelected];
        
        // 1. 检查工具是否齐备
        let hasAllTools = true;
        if (r.tools) {
            r.tools.forEach(t => {
                const owned = Object.keys(state.tools).some(id => {
                    if (!state.tools[id].owned) return false;
                    return t.id ? id === t.id : Cake.TOOLS[id]?.tech === t.tech;
                });
                if (t.role === 'required' && !owned) hasAllTools = false;
            });
        }

        // 2. 检查材料是否齐备
        const hasIng = Cake.hasIngredients(r.ing);
        
        // 3. 渲染材料标签
        const ingHtml = Cake.ingredientTags(r.ing);
        
        // 4. 计算按钮状态
        let btnText = `开始制作 (⚡${r.energy})`;
        let btnDisabled = false;
        if (!hasAllTools) { btnText = '🛠️ 缺少必需工具'; btnDisabled = true; }
        else if (!hasIng) { btnText = '❌ 材料不足'; btnDisabled = true; }
        else if (state.energy < r.energy) { btnText = '⚡ 精力不足'; btnDisabled = true; }

        benchEl.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-size: 50px; margin-bottom: 10px;">${r.emoji || '🍰'}</div>
                <h3 style="margin: 0; color: var(--pink-600);">${r.name}</h3>
                <div class="muted" style="font-size: 13px; margin-top: 5px;">${r.desc || '自制美味'}</div>
            </div>
            
            <div style="background: #fff8fa; padding: 15px; border-radius: 12px; margin-bottom: 15px;">
                <div style="font-size: 13px; font-weight: bold; margin-bottom: 8px; color: #d6336c;">所需材料：</div>
                <div class="ing-row" style="justify-content: flex-start;">${ingHtml}</div>
            </div>

            <button class="big-craft-btn" id="btnCraft" ${btnDisabled ? 'disabled' : ''}>
                ${btnText}
            </button>
        `;

        // 绑定制作按钮
        const btn = document.getElementById('btnCraft');
        if (btn && !btnDisabled) {
            btn.onclick = () => {
                const res = Cake.craft(currentSelected, 1);
                if (res && res.success === false) {
                    alert(res.message);
                } else {
                    // 制作成功后，工作台的材料需求状态会变，需要局部刷新右侧
                    renderWorkbench();
                }
            };
        }
    };

    // === 事件委托：点击左侧配方 ===
    document.getElementById('recipeMenu').addEventListener('click', (e) => {
        const item = e.target.closest('[data-recipe]');
        if (!item) return;
        
        currentSelected = item.dataset.recipe;
        renderMenu();      // 刷新高亮状态
        renderWorkbench(); // 刷新右侧面板
    });

    // === 初始化页面 ===
    if (typeof Cake.initPage === 'function') {
        Cake.initPage('bake', () => {
            const state = Cake.store.state;
            // 默认选中第一个已解锁的烘焙配方
            const first = Object.keys(Cake.RECIPES).find(k => 
                state.unlockedRecipes[k] && Cake.RECIPES[k].skill === 'bakery'
            );
            if (first && !currentSelected) currentSelected = first;
            
            renderMenu();
            renderWorkbench();
        }, false);
    }
}
