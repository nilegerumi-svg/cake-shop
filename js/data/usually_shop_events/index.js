// js/data/usually_shop_events/index.js
import './random.js';
import './walk.js';

(function () {
    'use strict';
    window.Cake = window.Cake || {};
    
    // 如果你有全局的统一事件池，可以在这里合并，或者直接交给底层的 MapMonitor 去读取
    // 例如：
    // window.Cake.ALL_EVENTS = [ ...window.Cake.RANDOM_EVENTS, ...window.Cake.WALK_EVENTS ];
    
    console.log('🎲 [Data/Events] 随机事件与散步事件装载完毕');
})();
