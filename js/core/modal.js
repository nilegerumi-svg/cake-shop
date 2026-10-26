// js/core/modal.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    let lastFocused = null;

    /* ==================== 弹窗 DOM 创建（只执行一次） ==================== */

    const ensureModal = () => {
        if (Cake.$('gameModal')) return;

        const div = document.createElement('div');
        div.id = 'gameModal';
        div.className = 'modal hidden';
        div.setAttribute('role', 'dialog');
        div.setAttribute('aria-modal', 'true');
        div.setAttribute('aria-labelledby', 'gameModalTitle');
        div.innerHTML = `
            <div class="modal-card">
                <h2 id="gameModalTitle"></h2>
                <div id="gameModalBody"></div>
                <button type="button" class="modal-btn" data-action="close-modal">💗 知道了</button>
            </div>`;

        // 遮罩点击与关闭按钮共用同一个委托处理
        div.addEventListener('click', (e) => {
            if (e.target === div || e.target.closest('[data-action="close-modal"]')) {
                closeModal();
            }
        });

        document.body.appendChild(div);
    };

    /* ==================== 打开 / 关闭 ==================== */

    const showModal = (title, bodyHTML) => {
        ensureModal();

        const $ = Cake.$;
        lastFocused = document.activeElement;

        $('gameModalTitle').innerHTML = title;
        $('gameModalBody').innerHTML = bodyHTML;
        $('gameModal').classList.remove('hidden');
        document.body.classList.add('modal-open');

        const btn = $('gameModal').querySelector('.modal-btn');
        if (btn) setTimeout(() => btn.focus(), 0);
    };

    const closeModal = () => {
        const m = Cake.$('gameModal');
        if (!m) return;

        m.classList.add('hidden');
        document.body.classList.remove('modal-open');

        // 焦点归还给打开弹窗前的元素
        if (lastFocused && typeof lastFocused.focus === 'function' && document.body.contains(lastFocused)) {
            lastFocused.focus();
        }
        lastFocused = null;
    };

    /* ==================== 挂载 ==================== */

    Cake.showModal = showModal;
    Cake.closeModal = closeModal;
})();
