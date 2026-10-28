// js/host/index.js

// 1. 错误捕获网（若根 monitor.js 已接管，本模块会自行跳过）
import './error.js';

// 2. 路由分发：iframe 内部跳转拦截与修正
import './router.js';

// 3. 状态同步：监听 localStorage 变化，同步父页面与子页面
import './sync.js';

// 4. 宿主主控：ResizeObserver、首屏渲染
import './main.js';

console.log('🖥️ [Host] 宿主环境协调系统装载完毕');
