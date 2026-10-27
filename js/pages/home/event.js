// js/pages/home/events.js
const G = window.parent.Game || window.Game;

export const bindEvents = () => {
    const contentEl = document.getElementById('content');
    
    // 防止重复绑定
    if (contentEl.dataset.bound) return;
    contentEl.dataset.bound = 'true';

    contentEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        
        const action = btn.dataset.action;
        
        if (action === 'nap') {
            if (G.state.energy >= 100) return; 
            G.rest(); 
        }
        
        if (action === 'sleep') {
            G.sleep();
        }
    });
};
