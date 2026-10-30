// pages/profile/page.js —— 我的档案页逻辑（从 index.html 内联拆分）
let Cake = null;
let checkCount = 0;

function waitForEngine() {
    Cake = window.parent.Cake || window.Cake;
    if (Cake && Cake.store && Cake.store.state) {
        renderPage();
    } else {
        checkCount++;
        if (checkCount < 100) {
            setTimeout(waitForEngine, 100);
        } else {
            showFatalError('游戏引擎加载超时！请刷新页面。');
        }
    }
}

function showFatalError(msg) {
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = `<div class="fatal-error"><h3>🚨 致命错误</h3><div>${msg}</div></div>`;
    }
}

const render = () => {
    try {
        const contentEl = document.getElementById('content');
        const s = Cake.store.state;
        const esc = Cake.escapeHtml || ((v) => String(v ?? ''));
        const num = (v, fallback = 0) => Number.isFinite(Number(v)) ? Number(v) : fallback;

        const shopName = s.shop?.name || '甜蜜小屋';
        const day = num(s.time?.day, 1);
        const money = num(s.money, 0);
        const reputation = num(s.shop?.stats?.reputation, 0);
        const achCount = (Cake.ACHIEVEMENTS || []).filter(a => s.achievements && s.achievements[a.id]).length;
        const toolCount = Object.keys(s.tools || {}).filter(id => s.tools[id].owned).length;
        const invCount = (s.inventory || []).length;

        // 技能与配方熟练度总览（每 100 经验升 1 级）
        const EXP_PER_LEVEL = 100;
        const skills = s.skills || {};
        const SKILL_LABELS = { bakery: '🍰 烘焙', cook: '🍳 料理' };
        const profBar = (label, lv, exp) => {
            const pct = Math.min(100, Math.round((num(exp, 0) / EXP_PER_LEVEL) * 100));
            return `
                <div class="skill-row">
                    <span class="skill-label">${label}</span>
                    <span class="skill-lv">Lv.${num(lv, 1)}</span>
                    <div class="skill-track"><div class="skill-fill" style="width:${pct}%;"></div></div>
                    <span class="skill-exp">${num(exp, 0)}/${EXP_PER_LEVEL}</span>
                </div>
            `;
        };

        const skillRows = Object.keys(SKILL_LABELS)
            .map(key => {
                const sk = skills[key] || { lv: 1, exp: 0 };
                return profBar(SKILL_LABELS[key], sk.lv, sk.exp);
            })
            .join('');

        // 已解锁配方的熟练度（取有记录的，最多显示 6 条）
        const profEntries = Object.entries(s.recipeProf || {})
            .filter(([, v]) => v && num(v.lv, 1) > 1)
            .sort((a, b) => num(b[1].lv, 1) - num(a[1].lv, 1))
            .slice(0, 6)
            .map(([key, v]) => {
                const r = (Cake.RECIPES || {})[key];
                return profBar((r && r.name) || key, v.lv, v.exp);
            })
            .join('');

        contentEl.innerHTML = `
            <div class="card">
                <h2>📊 我的档案</h2>
                <div class="grid-2" style="margin-bottom: 20px;">
                    <div class="item-card">
                        <span class="item-emoji">${esc(s.avatar || '👩‍🍳')}</span>
                        <span class="item-name">${esc(s.playerName || '店长')}</span>
                        <span class="item-desc">「${esc(shopName)}」的店长</span>
                        <span class="item-meta">经营第 ${day} 天</span>
                    </div>
                    <div class="item-card">
                        <span class="item-emoji">📈</span>
                        <span class="item-name">经营数据</span>
                        <span class="item-desc">余额：${money}元<br>累计卖出：${num(s.totalCakes, 0)}个<br>累计收入：${num(s.totalEarned, 0)}元<br>声望：${reputation}</span>
                    </div>
                </div>

                <h3>📈 技能熟练度</h3>
                <div class="skill-panel">
                    ${skillRows}
                    ${profEntries
                        ? `<div class="skill-sub">已掌握的配方</div>${profEntries}`
                        : '<div class="skill-sub muted">尚无配方达到 2 级，多做几次就能升级</div>'}
                </div>

                <h3>📂 我的收藏与资产</h3>
                <div class="nav-card" data-href="achievements.html">
                    <div class="nav-left">
                        <span class="nav-icon">🏅</span>
                        <div>
                            <div class="nav-title">成就殿堂</div>
                            <div class="nav-desc">已解锁 ${achCount} 个成就</div>
                        </div>
                    </div>
                    <span class="arrow">→</span>
                </div>

                <div class="nav-card" data-href="tools.html">
                    <div class="nav-left">
                        <span class="nav-icon">🛠️</span>
                        <div>
                            <div class="nav-title">工具库</div>
                            <div class="nav-desc">已拥有 ${toolCount} 件工具</div>
                        </div>
                    </div>
                    <span class="arrow">→</span>
                </div>

                <div class="nav-card" data-href="inventory.html">
                    <div class="nav-left">
                        <span class="nav-icon">📖</span>
                        <div>
                            <div class="nav-title">食材图鉴</div>
                            <div class="nav-desc">已持有 ${invCount} 份食材，看图鉴了解状态</div>
                        </div>
                    </div>
                    <span class="arrow">→</span>
                </div>

                <h3>💾 系统操作</h3>
                <div class="char-actions" style="gap:10px;margin-top:8px;">
                    <button type="button" class="small" data-action="save-game">💾 保存游戏</button>
                    <button type="button" class="small secondary" data-action="reset-game">🔄 重新开始</button>
                </div>
            </div>`;

        contentEl.querySelectorAll('.nav-card').forEach((card) => {
            card.addEventListener('click', () => {
                const href = card.dataset.href;
                if (href) window.location.href = href;
            });
        });

        contentEl.querySelectorAll('[data-action]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action === 'save-game') {
                    window.saveGame();
                }
                if (action === 'reset-game') {
                    window.resetGame();
                }
            });
        });
    } catch (err) {
        console.error('❌ [Profile] 渲染崩溃:', err);
        showFatalError(`渲染档案时发生异常：<br>${err.message}`);
    }
};

window.saveGame = () => {
    try {
        if (typeof Cake.saveState === 'function') {
            Cake.saveState();
            alert('✅ 游戏已保存！');
        } else {
            alert('❌ 存档系统未加载，无法保存');
        }
    } catch (err) {
        alert('保存失败: ' + err.message);
    }
};

window.resetGame = () => {
    if (confirm('⚠️ 确定要重新开始吗？这会清空当前所有进度！')) {
        try {
            localStorage.removeItem(Cake.store.SAVE_KEY || 'cake_shop_save');
            window.parent.location.href = '../../index.html';
        } catch (e) {
            window.location.href = '../../index.html';
        }
    }
};

function renderPage() {
    if (typeof Cake.initPage === 'function') {
        Cake.initPage('profile', render, false);
    } else {
        render();
    }
}

waitForEngine();