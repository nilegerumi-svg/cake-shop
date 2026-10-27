// js/entertainment/rest/index.js
import './core.js';
import './town/index.js';

(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 🌟 兼容主页的旧按钮调用
    Cake.rest = Cake.RestTown.homeNap;
    Cake.sleep = Cake.RestTown.homeSleep;

    // 🌟 建立统一的全局命名空间，方便以后子页面根据位置调用
    Cake.Actions = Cake.Actions || {};
    Cake.Actions.Rest = {
        town: Cake.RestTown,
        // 以后扩展：seaside: Cake.RestSeaside
    };

    console.log('🛌 休息系统已装载，支持区域:', Object.keys(Cake.Actions.Rest));
})();
