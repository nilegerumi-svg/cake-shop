// js/data/index.js

// 依次引入各个子目录的 index.js
import './achievements/index.js';
import './attributes/index.js';       // ⭐ 新增的属性目录
import './bundles/index.js';
import './characters/index.js';
import './ingredients/index.js';
import './recipes/index.js';
import './shop/index.js';             // 以前叫 shop_config，现在统一为文件夹
import './tool/index.js';
import './usually_shop_events/index.js';

console.log('📦 [Data] 基础数据层装载完毕');
