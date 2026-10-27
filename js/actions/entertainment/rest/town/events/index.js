// js/actions/entertainment/rest/town/events/index.js

// 引入通用事件
import './common.js';

// 引入各个地点的专属事件
import './place/home.js';
import './place/park.js';

(() => {
    'use strict';
    console.log('📦 城镇休息事件库装载完毕！');
})();
