// js/host/game-shell.js
const updateFooter = () => {
    const Cake = window.Cake;
    if (!Cake || !Cake.store || !Cake.store.state) return;
    
    const state = Cake.store.state;
    const timeStr = Cake.getTimeString ? Cake.getTimeString() : '08:00';
    
    const timeEl = document.getElementById('f-time');
    if (timeEl) timeEl.textContent = `Day ${state.time.day} ${timeStr}`;

    const shopIcon = document.getElementById('f-icon-shop');
    const shopText = document.getElementById('f-text-shop');
    if (state.shop?.isOpen) {
        shopIcon.textContent = '🔕';
        shopText.textContent = '打烊';
        shopText.style.color = 'var(--pink-600)';
    } else {
        shopIcon.textContent = '🚪';
        shopText.textContent = '营业';
        shopText.style.color = '';
    }
};

window.footerAction = (action) => {
    const Cake = window.Cake;
    if (!Cake) return;
    
    if (action === 'sleep' && Cake.sleep) {
        Cake.sleep();
        const mainFrame = document.getElementById('mainFrame');
        if (mainFrame && mainFrame.contentWindow) {
            mainFrame.contentWindow.location.reload();
        }
    } 
    else if (action === 'shop' && Cake.toggleShopStatus) {
        const res = Cake.toggleShopStatus();
        if (res && res.success === false) alert(res.message);
    }
    updateFooter();
};

// 监听引擎就绪和 UI 刷新，替代低效的死循环轮询
window.addEventListener('game-ready', updateFooter);
window.addEventListener('storage', updateFooter);
// 如果父页面有全局刷新事件，也顺便更新底栏
window.addEventListener('refresh_ui', updateFooter); 
