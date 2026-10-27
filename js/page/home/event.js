// js/pages/home/events.js
const G = window.parent.Game || window.Game;

export const bindEvents = () => {
    const contentEl = document.getElementById('content');
    
    // 避免多次绑定（如果以后有重新渲染的需求）
    if (contentEl.dataset.bound) return;
    contentEl.dataset.bound = 'true';

    contentEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        
        const action = btn.dataset.action;
        
        // 触发小憩
        if (action === 'nap') {
            if (G.state.energy >= 100) return; 
            G.rest(); 
        }
        
        // 触发睡觉
        if (action === 'sleep') {
            G.sleep();
        }
    });
};
