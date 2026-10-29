// js/data/recipes/meta/index.js
(function () {
    window.Cake = window.Cake || {};
    
    window.Cake.RECIPES_META = {
        // 用基础工作台，把木材和生铁做成高级烤箱
        'tool:oven_pro': {
            name: '制造风炉烤箱',
            skill: 'craft',          // 对应“制造”熟练度
            energy: 30,
            ing: { wood: 10, iron: 20, parts: 5 }, // 消耗的材料
            tools: [{ id: 'workbench', role: 'required' }], // 必须在工作台旁边做
            output: {
                type: 'tool',        // 👈 注意！这里产出的类型是工具，而不是食物
                key: 'oven_pro'      // 产出物 ID
            }
        }
    };
})();
