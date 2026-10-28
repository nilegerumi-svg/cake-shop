// js/actions/craft/index.js

// 1. 先加载基础工具和常量
import './_shared.js';

// 2. 加载依赖基础工具的计算模块（品质、属性）
import './quality.js';

// 3. 加载各种独立的操作模块（购买、研发）
import './buy.js';
import './research.js';

// 4. 最后加载核心的制作主流程（它会用到上面所有的东西）
import './craft.js';

console.log('📦 [Actions/Craft] 制作系统装载完毕');
