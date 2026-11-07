// pages/bake/index.js
(() => {
    'use strict';

    // 引擎由父页面异步注入（js/host/monitor/index.js → js/main.js），
    // 因此不能在模块顶层同步取 Cake，必须等引擎与菜谱数据就绪后再渲染。
    let Cake = null;
    let currentSelected = null;
    let menuBound = false;

    // === 渲染左侧配方菜单 ===
    const renderMenu = () => {
        const state = Cake.store.state;
        const menuEl = document.getElementById('recipeMenu');
        if (!menuEl) return;

        if (!state.unlockedRecipes) state.unlockedRecipes = {};

        // 过滤出已解锁的烘焙配方
        const unlocked = Object.keys(Cake.RECIPES || {}).filter(k =>
            state.unlockedRecipes[k] && Cake.RECIPES[k].skill === 'bakery'
        );

        if (unlocked.length === 0) {
            menuEl.innerHTML = '<div class="muted">暂无解锁的配方<br>可先去「配方」图鉴研发</div>';
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
        if (!benchEl || !currentSelected) return;

        const state = Cake.store.state;
        const r = Cake.RECIPES[currentSelected];
        if (!r) {
            benchEl.innerHTML = '<div class="muted text-center" style="margin-top:50px;">配方数据缺失</div>';
            return;
        }

        // 1. 检查工具是否齐备
        let hasAllTools = true;
        if (r.tools) {
            r.tools.forEach(t => {
                const owned = Object.keys(state.tools || {}).some(id => {
                    if (!state.tools[id] || !state.tools[id].owned) return false;
                    return t.id ? id === t.id : Cake.TOOLS?.[id]?.tech === t.tech;
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

        // 5. 熟练度与完美品质门槛（每 100 经验升 1 级，见 addProficiencyExp）
        const EXP_PER_LEVEL = 100;
        const skill = (state.skills && state.skills[r.skill]) || { lv: 1, exp: 0 };
        const prof = (state.recipeProf && state.recipeProf[currentSelected]) || { lv: 1, exp: 0 };
        const req = r.qualityReq || {};
        const skillLv = Number(skill.lv) || 1;
        const profLv = Number(prof.lv) || 1;

        // 逐项列出距离完美品质的差距
        const gaps = [];
        if (req.minSkillLevel && skillLv < req.minSkillLevel) {
            gaps.push(`烘焙等级 ${skillLv} → ${req.minSkillLevel}`);
        }
        if (req.minRecipeProf && profLv < req.minRecipeProf) {
            gaps.push(`配方熟练 ${profLv} → ${req.minRecipeProf}`);
        }
        const needPerfectTools = (req.perfectTools || []).filter(id => !(state.tools && state.tools[id] && state.tools[id].owned));
        if (needPerfectTools.length > 0) {
            const names = needPerfectTools.map(id => (Cake.TOOLS && Cake.TOOLS[id] && Cake.TOOLS[id].name) || id);
            gaps.push(`工具：${names.join('、')}`);
        }

        const bar = (lv, exp, label) => `
            <div class="prof-row">
                <span class="prof-label">${label}</span>
                <span class="prof-lv">Lv.${lv}</span>
                <div class="prof-track"><div class="prof-bar-fill" style="width:${Math.min(100, Math.round(((Number(exp) || 0) / EXP_PER_LEVEL) * 100))}%;"></div></div>
                <span class="prof-exp">${Number(exp) || 0}/${EXP_PER_LEVEL}</span>
            </div>
        `;

        const profHtml = `
            <div class="prof-panel">
                <div class="prof-title">📈 熟练度</div>
                ${bar(skillLv, skill.exp, r.skill === 'cook' ? '料理' : '烘焙')}
                ${bar(profLv, prof.exp, '本配方')}
                <div class="prof-hint">${gaps.length > 0
                    ? '✨ 距离完美：' + gaps.join(' · ')
                    : '✨ 条件已满足，有机会做出完美品质'}</div>
            </div>
        `;

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

            ${profHtml}

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
    const bindMenu = () => {
        if (menuBound) return;
        const menuEl = document.getElementById('recipeMenu');
        if (!menuEl) return;

        menuEl.addEventListener('click', (e) => {
            const item = e.target.closest('[data-recipe]');
            if (!item) return;

            currentSelected = item.dataset.recipe;
            renderMenu();      // 刷新高亮状态
            renderWorkbench(); // 刷新右侧面板
        });
        menuBound = true;
    };

    // === 选中默认配方并渲染 ===
    const render = () => {
        const state = Cake.store.state;
        // 默认选中第一个已解锁的烘焙配方
        const first = Object.keys(Cake.RECIPES || {}).find(k =>
            state.unlockedRecipes && state.unlockedRecipes[k] && Cake.RECIPES[k].skill === 'bakery'
        );
        if (first && !currentSelected) currentSelected = first;

        renderMenu();
        renderWorkbench();
    };

    // === 初始化页面 ===
    const start = () => {
        bindMenu();

        if (typeof Cake.initPage === 'function') {
            Cake.initPage('bake', render, false);
        } else {
            // 兜底：即使 initPage 缺失也要能渲染
            render();
        }
    };

    // === 等待引擎与菜谱就绪 ===
    if (window.safePageBoot && typeof window.safePageBoot.waitForCake === 'function') {
        window.safePageBoot.waitForCake((readyCake) => {
            Cake = readyCake;
            start();
        }, {
            timeout: 15000,
            // 必须等菜谱数据也到位，否则菜单会永久停在「暂无解锁的配方」
            required: (game) => !!(game && game.store && game.store.state
                && game.RECIPES && Object.keys(game.RECIPES).length > 0),
            onTimeout: () => '烘焙工坊：游戏引擎或菜谱数据加载超时，请刷新页面重试。',
            targetId: 'workbench'
        });
    } else {
        Cake = window.parent.Cake || window.Cake;
        if (Cake && Cake.store && Cake.store.state) {
            start();
        } else {
            console.error('未找到 Cake 引擎');
        }
    }
})();
