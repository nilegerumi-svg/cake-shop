// js/core/index.js
import './schema.js';             // 数据结构契约
import './migrate.js';            // 旧版存档迁移器
import './time_engine.js';        // 时间流逝引擎
import './utils.js';              // 通用工具
import './store.js';              // 状态容器与存读档
import './bridge.js';             // 跨 iframe 通信
import './modal.js';              // 弹窗
import './effects.js';            // 特效
import './render/index.js';       // 模块化渲染引擎

console.log('🧱 [Core] 核心引擎装载完毕');
