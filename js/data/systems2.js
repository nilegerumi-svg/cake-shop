// js/data/systems2.js（剩余系统的状态字段与规则）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.SYSTEMS_EXTRA = {
        bank: {
            name: '银行储蓄',
            field: 'bankSavings',
            desc: '活期存款，每天日结利息；可随时存取。',
            actions: ['存入', '取出']
        },
        vehicles: {
            name: '车辆',
            field: 'vehicles',
            desc: '公交卡 / 小三轮等代步工具，出门去小镇更快。',
            known: [{ name: '公交卡', price: 80, desc: '随时搭 3 路公交去农贸市场' }]
        },
        flowers: {
            name: '花束 / 阳台花',
            fields: ['homeFlowers', 'homeFlowerDecor', 'homeBonsai', 'flowerBouquets'],
            desc: '阳台收花后可以扎成花束送人（flowerBouquets），或摆进屋里加装饰（homeFlowerDecor），也可养盆景（homeBonsai）。'
        },
        charity: {
            name: '慈善义卖',
            fields: ['charityApplied', 'charitySoldToday', 'commercialBoostDays'],
            desc: '向镇长秘书报名义卖，义卖期摆摊卖家常料理（每天有限额），卖得好会有商业加成。'
        },
        aquarium: {
            name: '水族缸',
            fields: ['aquariumFish', 'aquariumHealth', 'aquariumCleanliness', 'aquariumDirty', 'aquariumDirtyDay', 'aquariumLastFeedDay', 'aquariumDecor'],
            rules: {
                cleanlinessStart: 100,
                dirtyThreshold: 'cleanliness 过低会变脏，需要清理',
                feed: '每天喂鱼，断粮会掉健康'
            },
            desc: '养观赏鱼的水族缸，需要喂食、清理、装饰。'
        },
        fishTank: {
            name: '河鲜养护缸',
            field: 'fishTank',
            maxFish: 6,
            desc: '钓到的河鲜可放养护缸暂养（入缸不变质），最多 6 条。'
        },
        collections: {
            name: '收藏架',
            field: 'collectionsPlaced',
            maxItems: 8,
            desc: '三楼收藏架，最多摆 8 件收藏品（含鱼标本、节日纪念品等），每件装饰度 +2。'
        },
        souvenirs: {
            name: '节日纪念品',
            field: 'festivalSouvenirs',
            desc: '参加节日活动有几率获得节日纪念品，可摆上三楼收藏架。'
        },
        govTickets: {
            name: '政府券',
            field: 'govTickets',
            desc: '市政府发放的办事凭证/票据。'
        },
        sushiStall: {
            name: '寿司摊',
            field: 'sushiStall',
            desc: '出摊卖寿司的摊位记录。'
        },
        coast: {
            name: '海边',
            field: 'coastDoneToday',
            desc: '海边玩法（每天一次）。'
        },
        floorLights: {
            name: '楼层灯光',
            field: 'floorLights',
            desc: '各楼层单独的开关灯状态。'
        },
        tutorial: {
            name: '新手教程',
            fields: ['tutorial', 'newbieTipsShown'],
            desc: '新手引导进度与已展示提示条数（共 7 天每日一条）。'
        }
    };
})();
