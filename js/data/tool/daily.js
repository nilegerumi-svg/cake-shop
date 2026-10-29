// js/data/tool/daily.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.TOOLS_DAILY = {
        'broom':    { id: 'broom',    name: '扫把',   emoji: '🧹', price: 10, cat: 'daily', tech: 'clean', tier: 1 }, // 用于清理店铺卫生
        'mop':      { id: 'mop',      name: '拖把',   emoji: '🧽', price: 15, cat: 'daily', tech: 'clean', tier: 1 },
        'trash_bag':{ id: 'trash_bag',name: '垃圾袋', emoji: '🛍️', price: 2,  cat: 'daily', tech: 'dispose', tier: 1 }  // 扔掉变质食材用
    };
})();
