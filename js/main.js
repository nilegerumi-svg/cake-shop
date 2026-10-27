// js/main.js

// 1. 同步导入所有底层模块（会按照顺序阻塞加载）
import './data/index.js';
import './core/index.js';
import './time/index.js';
import './actions/index.js';
import './shared.js';
import './host/index.js';
import './monitor.js';

console.log('🚀 [Main] 核心引擎装载完毕！开始构建游戏框架...');

// 2. 动态构建游戏外壳
const root = document.getElementById('app-root');
root.innerHTML = `
    <div class="app-wrapper" style="display:flex; flex-direction:column; height:100vh; height:100dvh;">
        <header id="header"></header>
        <nav id="navBar"></nav>
        <div class="split-container" style="flex:1; display:flex; flex-direction:column; overflow:hidden; padding-bottom: calc(var(--footer-h, 70px) + env(safe-area-inset-bottom));">
            <!-- 延迟加载 src，防止抢先读取 Game 对象 -->
            <iframe id="mainFrame" src="about:blank" class="main-frame" style="flex:1; width:100%; border:none; background:transparent;"></iframe>
            <iframe id="logFrame" src="pages/log.html" class="log-frame" style="flex:0 0 clamp(110px, 22vh, 180px); width:100%; border:none; background:#fff; border-top:2px dashed #ffd1dc;"></iframe>
        </div>
        <div class="action-footer" id="footer" style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:500px; z-index:100;"></div>
    </div>
`;

// 3. 等宿主环境（host）和渲染引擎（core）绑定了 DOM 后，再初始化
setTimeout(() => {
    const mainFrame = document.getElementById('mainFrame');
    
    // 此时 Game 对象、initPage 绝对全都在了，安全地加载主页
    mainFrame.src = 'pages/home.html';
    
    mainFrame.onload = () => {
        // 页面加载完成后，淡出 Loading
        const loading = document.getElementById('app-loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => loading.style.display = 'none', 300);
        }
    };
}, 100); // 100ms 足矣，因为模块早就同步引入了

// 4. 捕获子页面抛出的所有错误（终极监视器）
window.addEventListener('error', (e) => {
    console.error('【Root Monitor 捕获异常】', e.message);
    const loading = document.getElementById('app-loading');
    if (loading && loading.style.display !== 'none') {
        loading.innerHTML = `<span style="color:red">❌ 游戏加载失败：${e.message}</span>`;
    }
});
