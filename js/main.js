// js/main.js

// 1. 基础数据层
import './data/ingredients.js';
import './data/recipes.js';
import './data/bundles.js';
import './data/characters.js';
import './data/events.js';
import './data/shop-config.js';
import './data/achievements.js';

// 2. 核心引擎层
import './core/index.js';

// 3. 时间系统
import './time/index.js';

// 4. 动作与玩法层
import './actions/index.js';

// 5. 兼容层（必须放在 core 和 actions 之后，确保挂载成功）
import './shared.js';

// 6. 宿主环境（错误捕获、路由）
import './host/error.js';
import './host/router.js';
import './host/sync.js';
import './host/main.js';

// 7. 全局监视器
import './monitor.js';

console.log('🚀 [Main] 甜蜜物语全系统启动完毕！');
