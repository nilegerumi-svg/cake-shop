// js/actions/entertainment/rest/town/index.js

// 引入事件库
import './events/index.js';

(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 纯数据配置
    Cake.TownRestConfig = {
        home: {
            nap:   { name: '家里小憩', energy: 40, time: 60 },
            sleep: { name: '睡觉', time: 'next_day' }
        },
        park: {
            nap:   { name: '公园小憩', energy: 20, time: 30 }
            // park 没有配置 sleep，所以不能睡觉
        }
    };

    // 将城镇休息配置挂载到总表
    Cake.Actions = Cake.Actions || {};
    Cake.Actions.Rest = Cake.Actions.Rest || {};
    Cake.Actions.Rest.town = Cake.TownRestConfig;
    
    console.log('🏘️ 城镇休息模块装载完毕');
})();
