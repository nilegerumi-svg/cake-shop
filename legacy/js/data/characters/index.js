// js/data/characters/index.js
import './linmo.js';
import './guyan.js';
import './sumu.js';
import './xiazhi.js';

(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    // 准备汇总的空对象
    const characters = {};
    const affEvents = {};
    const chatDialogues = {};
    const dateDialogues = {};

    // 遍历所有角色数据，拍平成全局需要的格式
    const allData = window.Cake.CHARACTERS_DATA || {};
    for (const [id, data] of Object.entries(allData)) {
        characters[id] = data.info;
        affEvents[id] = data.affEvents;
        chatDialogues[id] = data.chat;
        dateDialogues[id] = data.date;
    }

    // 统一挂载（深冻结防篡改）
    window.Cake.CHARACTERS = deepFreeze(characters);
    window.Cake.AFF_EVENTS = deepFreeze(affEvents);
    window.Cake.CHAT_DIALOGUES = deepFreeze(chatDialogues);
    window.Cake.DATE_DIALOGUES = deepFreeze(dateDialogues);

    // 相遇时间配置保持独立
    window.Cake.MEETINGS = deepFreeze({ 2: 'linmo', 4: 'sumu', 6: 'guyan', 9: 'xiazhi' });

    console.log('👥 [Data/Characters] 角色数据装载完毕，当前角色数:', Object.keys(characters).length);
})();
