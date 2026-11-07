// js/actions/entertainment/rest/town/events/index.js

// 引入通用事件
import './common.js';

// 引入各个地点的专属事件
import './place/home.js';
import './place/park.js';
import './place/street.js';  // ⭐ 新增
import './place/river.js';   // ⭐ 新增

(() => {
    'use strict';

    const getCake = () => {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) {
                return window.parent.Cake;
            }
        } catch (_) { /* 跨域忽略 */ }
        return window.Cake || null;
    };

    const Cake = getCake();
    if (!Cake) return;

    // 防重复挂载
    if (Cake.__restTownEventsIndexLoaded) return;
    Cake.__restTownEventsIndexLoaded = true;

    // 打印注册统计，方便调试
    const events = Cake.REST_EVENTS || {};
    const keys = Object.keys(events);
    const total = keys.reduce((sum, k) => sum + (Array.isArray(events[k]) ? events[k].length : 0), 0);

    console.log(`📦 城镇休息事件库装载完毕！${keys.length} 个事件池，共 ${total} 条事件`);
})();
