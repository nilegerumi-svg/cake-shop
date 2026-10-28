// js/core/index.js

// 1. 最底层：数据契约与存档迁移
import './schema.js';             // 定义 state 长什么样
import './migrate.js';            // 将旧存档转换为新结构

// 2. 基础工具
import './utils.js';              // 通用小工具函数

// 3. 状态容器与通信桥接
import './store.js';              // 全局状态管理中心（会用到 schema 和 migrate）
import './state.js';              // 状态操作逻辑
import './bridge.js';             // 跨模块通信

// 4. 界面与特效
import './modal.js';
import './effects.js';

// 5. 渲染引擎（依赖以上所有）
import './render.js';

console.log('🧱 [Core] 核心引擎与渲染系统装载完毕');
