// js/core/migrate.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    /**
     * 检查并迁移存档
     * @param {Object} rawData 从 localStorage 读出来的旧数据
     * @returns {Object} 可以安全使用的最新版数据
     */
    window.Cake.migrateState = function (rawData) {
        // 如果没有存档，直接返回全新的初始状态
        if (!rawData) {
            return window.Cake.createEmptyState();
        }

        const newState = window.Cake.createEmptyState();

        // 简单合并：如果旧存档里有这个属性，就覆盖初始的；没有就保留初始的
        // 这里使用了浅合并，实际大项目可能需要针对某个版本做深合并
        const mergedState = Object.assign({}, newState, rawData);

        // 确保关键对象存在（防止旧存档缺字段导致报错）
        mergedState.time = Object.assign({}, newState.time, rawData.time || {});
        mergedState.shop = Object.assign({}, newState.shop, rawData.shop || {});
        mergedState.shop.stats = Object.assign({}, newState.shop.stats, (rawData.shop && rawData.shop.stats) || {});
        
        // 如果版本号不一致，强制升级到最新版号
        if (mergedState.version !== window.Cake.SCHEMA_VERSION) {
            mergedState.version = window.Cake.SCHEMA_VERSION;
            console.log('🔄 [Migrate] 存档已升级至最新版本！');
        }

        return mergedState;
    };

    console.log('🔄 [Migrate] 存档迁移系统准备就绪');
})();
