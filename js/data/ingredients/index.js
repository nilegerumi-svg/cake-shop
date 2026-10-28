// js/data/ingredients/index.js

// 1. 引入食材分类子目录
import './grain/index.js';       // 谷物
import './meat/index.js';        // 肉类
import './seasoning/index.js';   // 调料
import './vegetable/index.js';   // 蔬菜

// 2. 引入保质期配置（如果是独立文件的话）
import './important_shelf_life.js';

console.log('📦 [Data/Ingredients] 基础食材库装载完毕');
