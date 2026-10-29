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
            if (typeof G.nap === 'function') G.nap();
        }

        if (action === 'sleep') {
            if (typeof G.sleep === 'function') G.sleep();
        }

        if (action === 'go-park') {
            if (typeof G.walk === 'function') G.walk('park');
        }

        if (action === 'go-town') {
            if (typeof G.travelTo === 'function') {
                G.travelTo('town');
            } else {
                G.state.currentLocation = 'town';
            }
            if (typeof G.refreshPage === 'function') G.refreshPage();
        }

        if (action === 'go-home') {
            if (typeof G.travelTo === 'function') {
                G.travelTo('home');
            } else {
                G.state.currentLocation = 'home';
            }
            if (typeof G.refreshPage === 'function') G.refreshPage();
        }
    });
};
