// js/actions/entertainment/map/index.js
import './location_actions.js';
// 如果有 monitor.js 也在这里 import
// import './monitor.js';

(function () {
    'use strict';
    const Cake = window.Cake;

    // 👈 新增：提供 getRegionLocations 接口
    Cake.REGIONS = {
        'town': {
            name: '甜蜜小镇',
            locations: {
                'home': { 
                    name: '甜蜜小屋', 
                    type: 'home', 
                    cost: 0, 
                    time: 0, 
                    desc: '温馨的烘焙坊，可以在此休息。' 
                },
                'street': { 
                    name: '街角超市', 
                    type: 'shop', 
                    cost: 5, 
                    time: 15, 
                    desc: '基础食材和烘焙工具供应商。' 
                },
                'market': { 
                    name: '热闹菜市场', 
                    type: 'shop', 
                    cost: 8, 
                    time: 30,
                    desc: '新鲜肉类、蔬菜和调料。' 
                },
                'park': { 
                    name: '城镇公园', 
                    type: 'scenery', 
                    cost: 6, 
                    time: 20, 
                    desc: '散步放松，也许会触发随机事件。' 
                },
                'river': {
                    name: '河畔五金店',
                    type: 'shop',
                    cost: 10,
                    time: 40,
                    desc: '卖工具和建造材料。'
                }
            }
        }
    };

    // 提供辅助查询方法
    Cake.getRegionLocations = function (regionId) {
        const region = Cake.REGIONS[regionId];
        return region ? region.locations : null;
    };
})();

console.log('🗺️ [Map] 地图区域与动作系统装载完毕');
