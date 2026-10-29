// js/pages/home/events.js
export const bindEvents = () => {
    const contentEl = document.getElementById('content');
    if (!contentEl) return;

    if (contentEl.dataset.bound) return;
    contentEl.dataset.bound = 'true';

    contentEl.addEventListener('click', (e) => {
        const G = window.parent.Game || window.Game; 
        if (!G || !G.state) return;

        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;

        if (action === 'nap') {
            if ((G.state.energy ?? 0) >= (G.state.maxEnergy ?? 100)) return;
            // 👈 修复：调用底层正确的 nap 方法
            if (typeof G.nap === 'function') G.nap();
        }

        if (action === 'sleep') {
            // 👈 修复：调用底层正确的 sleep 方法
            if (typeof G.sleep === 'function') G.sleep();
        }

        if (action === 'go-park') {
            // 👈 新增：直接调底层散步逻辑（假设你希望在这里快速散步）
            if (typeof G.walk === 'function') {
                // 由于散步需要触发地图和事件，如果你有专门的散步方法
                G.walk('park'); 
            }
        }
    });
};
