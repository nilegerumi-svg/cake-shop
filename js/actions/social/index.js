// js/actions/social/index.js
(function () {
    'use strict';
    const Cake = window.Cake;

    // 和 NPC 交流（占位，以后加剧情和好感度）
    Cake.talkToNPC = function (npcId) {
        Cake.addLog(`🗣️ 你尝试和 ${npcId} 交流，但目前还没想好说什么。`);
        Cake.refreshPage();
    };
})();
console.log('💬 [Actions/Social] 社交系统装载完毕');
