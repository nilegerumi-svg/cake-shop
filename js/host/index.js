// js/host/index.js

// 1. 最先加载：错误捕获网，防止后续模块报错直接白屏
import './error.js';

// 2. 路由分发：负责 iframe 内部的页面跳转拦截与修正
import './router.js';

// 3. 状态同步：监听 localStorage 变化，同步父页面与子页面的状态
import './sync.js';

// 4. 宿主主控：初始化 ResizeObserver、首屏渲染等
import './main.js';

console.log('🖥️ [Host] 宿主环境协调系统装载完毕');
