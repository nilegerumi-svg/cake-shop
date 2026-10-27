// js/pages/home/events.js

export const bindEvents = () => {
    const contentEl = document.getElementById('content');
    
    // 防止多次绑定
    if (contentEl.dataset.bound) return;
    contentEl.dataset.bound = 'true';

    contentEl.addEventListener('click', (e) => {
        const G = window.parent.Game || window.Game; // 🌟 实时获取
        if (!G) return;

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
