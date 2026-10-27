// js/actions/entertainment/rest/town/index.js
import './config.js';
import './events/common.js';
import './events/place/home.js';
import './events/place/park.js';

(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 建立城镇休息命名空间
    Cake.Actions = Cake.Actions || {};
    Cake.Actions.Rest = Cake.Actions.Rest || {};
    
    // 将基础配置挂载到总表
    Cake.Actions.Rest.town = Cake.TownRestConfig;
    
    console.log('🏘️ 城镇休息模块装载完毕');
})();
