(() => {
    'use strict';

    function getCake() {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) {
                return window.parent.Cake;
            }
        } catch (_) {}
        return window.Cake || null;
    }

    function renderHome() {
        const Cake = getCake();
        if (!Cake || !Cake.store || !Cake.store.state) return;

        const state = Cake.store.state;
        const contentEl = document.getElementById('content');
        if (!contentEl) return;

        const shopName = state.shop?.name || '甜蜜小屋';
        const day = state.time?.day || 1;
        const money = state.money || 0;
        const reputation = state.shop?.stats?.reputation || 0;
        const energy = state.energy || 0;
        const maxEnergy = state.maxEnergy || 100;

        contentEl.innerHTML = `
            <div class="card" style="text-align: center; background: linear-gradient(135deg, #fff, #fff0f5);">
                <h2 style="margin: 0; color: var(--pink-600);">🏠 欢迎回到「${shopName}」</h2>
                <p class="muted" style="margin-top: 8px;">今天是经营的第 <b>${day}</b> 天</p>

                <div style="display: flex; justify-content: space-around; margin-top: 15px; font-weight: bold;">
                    <span style="color: var(--pink-500);">💰 ${money}元</span>
                    <span style="color: var(--green-ok);">⭐ ${reputation}声望</span>
                    <span style="color: var(--pink-400);">⚡ ${energy}/${maxEnergy}</span>
                </div>
            </div>

            <h3>🚪 小屋房间</h3>

            <div class="room-card" onclick="go('bake')">
                <div class="room-left">
                    <span class="room-icon">🍳</span>
                    <div>
                        <div class="room-title">厨房与烘焙坊</div>
                        <div class="room-desc">去制作蛋糕、研发新的美味</div>
                    </div>
                </div>
                <span class="arrow">→</span>
            </div>

            <div class="room-card" onclick="openBedroom()">
                <div class="room-left">
                    <span class="room-icon">🛏️</span>
                    <div>
                        <div class="room-title">温馨卧室</div>
                        <div class="room-desc">累了就睡一觉，恢复精力</div>
                    </div>
                </div>
                <span class="arrow">→</span>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3>🎒 我的随身物品</h3>
                <div id="ui-inventory" class="ing-row" style="justify-content:flex-start;">
                    <!-- render.js 全局会渲染它 -->
                </div>
            </div>
        `;
    }

    window.go = (target) => {
        if (target === 'bake') {
            try {
                const frame = window.parent && window.parent.document
                    ? window.parent.document.getElementById('mainFrame')
                    : null;
                if (frame) frame.src = 'pages/bake/index.html';
            } catch (_) {
                console.warn('go(): cannot switch frame');
            }
        }
    };

    window.openBedroom = () => {
        const Cake = getCake();
        if (!Cake || !Cake.store || !Cake.store.state) return;

        const shouldSleep = window.confirm('要睡觉进入下一天吗？点击取消可以小憩1小时。');
        if (shouldSleep) {
            if (typeof Cake.sleep === 'function') Cake.sleep();
        } else {
            if (typeof Cake.nap === 'function') Cake.nap();
        }
    };

    if (window.safePageBoot && typeof window.safePageBoot.waitForCake === 'function') {
        window.safePageBoot.waitForCake((Cake) => {
            renderHome();

            if (typeof Cake.initPage === 'function') {
                Cake.initPage('home', renderHome, false);
            }
        }, {
            timeout: 15000,
            required: (game) => !!(game && game.store && game.store.state),
            onTimeout: () => '游戏引擎加载超时，请刷新页面'
        });
    } else {
        const Cake = getCake();
        if (Cake && Cake.store && Cake.store.state) {
            renderHome();

            if (typeof Cake.initPage === 'function') {
                Cake.initPage('home', renderHome, false);
            }
        }
    }
})();
