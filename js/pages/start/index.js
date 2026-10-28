// js/pages/start/index.js
(() => {
    'use strict';

    // ⚠️ 不强制依赖 window.Cake：即使 core/store.js 未定义 Cake，
    // 也能用 localStorage 兜底走完流程，并正常关闭 loading 屏。
    const Cake = window.Cake || null;

    const finish = () => {
        if (typeof window.appLoadingComplete === 'function') {
            window.appLoadingComplete();
        }
    };
    const fail = (msg) => {
        if (typeof window.appLoadingFail === 'function') {
            window.appLoadingFail(msg);
        }
        console.error('❌ [Start]', msg);
    };

    /* ---------------- 常量与 DOM ---------------- */

    const AVATAR_EMOJI = Object.freeze({
        girl1: '👧🏻',
        girl2: '👩🏻',
        boy1:  '👦🏻',
        cake:  '🧁',
    });

    const group       = document.getElementById('avatarGroup');
    const btnStart    = document.getElementById('btnStart');
    const btnContinue = document.getElementById('btnContinue');
    const nameInput   = document.getElementById('playerName');
    const shopInput   = document.getElementById('shopName');

    if (!group || !btnStart || !btnContinue || !nameInput || !shopInput) {
        fail('开始页 DOM 结构缺失，请检查 index.html');
        return;
    }

    const options = [...group.querySelectorAll('.avatar-option')];
    if (options.length === 0) {
        fail('未找到头像选项');
        return;
    }

    const DEFAULT_PLAYER_NAME = '小甜心';
    const DEFAULT_SHOP_NAME   = '甜蜜小屋';
    const NEXT_PAGE           = 'game.html';

    let selectedKey = 'girl1';

    /* ---------------- 头像选择 ---------------- */

    const select = (opt) => {
        for (const o of options) {
            const on = o === opt;
            o.classList.toggle('selected', on);
            o.setAttribute('aria-checked', String(on));
            o.setAttribute('tabindex', on ? '0' : '-1');
        }
        selectedKey = opt.dataset.avatar || 'girl1';
    };

    const moveFocus = (idx, delta) => {
        const next = options[(idx + delta + options.length) % options.length];
        select(next);
        next.focus();
    };

    options.forEach((opt, idx) => {
        opt.addEventListener('click', () => {
            select(opt);
            opt.focus();
        });

        opt.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    moveFocus(idx, 1);
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    moveFocus(idx, -1);
                    break;
                case ' ':
                case 'Enter':
                    select(opt);
                    break;
                default:
                    return;
            }
            e.preventDefault();
        });
    });

    /* ---------------- 存档检测 ---------------- */

    const hasSave = () => {
        try {
            if (Cake && typeof Cake.hasSave === 'function') {
                return !!Cake.hasSave();
            }
            // 兜底：Cake 不可用时，检查 localStorage 是否已有玩家名
            return !!localStorage.getItem('playerName');
        } catch (err) {
            console.warn('检查存档失败:', err);
            return false;
        }
    };

    if (hasSave()) {
        btnContinue.style.display = '';
        btnStart.textContent = '重新开始';
    }

    /* ---------------- 工具函数 ---------------- */

    const readInput = (input, fallback) =>
        (input.value || '').trim().slice(0, 12) || fallback;

    const goToGame = () => {
        window.location.href = NEXT_PAGE;
    };

    /* ---------------- 开始新游戏 ---------------- */

    btnStart.addEventListener('click', () => {
        if (hasSave() && !confirm('已有存档，重新开始会覆盖当前进度，确定吗？')) return;

        const playerName = readInput(nameInput, DEFAULT_PLAYER_NAME);
        const shopName   = readInput(shopInput, DEFAULT_SHOP_NAME);
        const avatar     = AVATAR_EMOJI[selectedKey] || AVATAR_EMOJI.girl1;

        try {
            // 优先走 Cake 存档系统
            if (
                Cake &&
                typeof Cake.defaultState === 'function' &&
                typeof Cake.saveState === 'function'
            ) {
                const state = Cake.defaultState();
                Object.assign(state, { playerName, shopName, avatar });

                if (Cake.store) Cake.store.state = state;
                Cake.saveState();
            } else {
                // 兜底：localStorage 三件套（shared.js 在 game.html 会读取）
                localStorage.setItem('playerName', playerName);
                localStorage.setItem('shopName', shopName);
                localStorage.setItem('playerAvatar', selectedKey);

                if (Cake && typeof Cake.SAVE_KEY === 'string') {
                    localStorage.removeItem(Cake.SAVE_KEY);
                }
            }
        } catch (err) {
            console.error('保存初始状态失败:', err);
        }

        goToGame();
    });

    /* ---------------- 继续游戏 ---------------- */

    btnContinue.addEventListener('click', goToGame);

    /* ---------------- 收尾：关闭 loading 屏 ---------------- */

    finish();
})();
