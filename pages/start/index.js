// js/pages/start/index.js
(() => {
    'use strict';

    // 获取当前环境下的 Cake
    const Cake = window.Cake;
    if (!Cake) return;

    /* ---------------- 常量与 DOM ---------------- */

    const AVATAR_EMOJI = Object.freeze({
        girl1: '👧🏻',
        girl2: '👩🏻',
        boy1:  '👦🏻',
        cake:  '🧁',
    });

    const group        = document.getElementById('avatarGroup');
    const options      = [...group.querySelectorAll('.avatar-option')];
    const btnStart     = document.getElementById('btnStart');
    const btnContinue  = document.getElementById('btnContinue');
    const nameInput    = document.getElementById('playerName');
    const shopInput    = document.getElementById('shopName');

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
        selectedKey = opt.dataset.avatar;
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
            return typeof Cake.hasSave === 'function' && Cake.hasSave();
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
            if (typeof Cake.defaultState === 'function' && typeof Cake.saveState === 'function') {
                const state = Cake.defaultState();
                Object.assign(state, { playerName, shopName, avatar });

                Cake.store.state = state;
                Cake.saveState();
            } else {
                localStorage.setItem('playerName', playerName);
                localStorage.setItem('shopName', shopName);
                localStorage.setItem('playerAvatar', selectedKey);

                if (typeof Cake.SAVE_KEY === 'string') {
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
})();
