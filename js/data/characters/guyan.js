// js/data/characters/guyan.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.CHARACTERS_DATA = window.Cake.CHARACTERS_DATA || {};

    window.Cake.CHARACTERS_DATA.guyan = {
        info: {
            name: '顾言', emoji: '☕', color: '#90a4ae',
            desc: '对面咖啡店的冷面老板，毒舌却心软，对品质极为挑剔。',
            likes: ['提拉米苏', '红丝绒蛋糕'],
            metText: '一位穿着考究的男人面无表情地点了一块蛋糕。吃完后他沉默良久：\n「……顾言。对面咖啡店。以后，我会常来。」'
        },
        affEvents: {
            20:  { text: '顾言指出你蛋糕的一处不足，语气严厉但很有用。', rep: 10 },
            40:  { text: '顾言默默帮你修好了店里坏掉的灯，什么都没说。', rep: 12, money: 100 },
            60:  { text: '顾言请你喝他亲手调制的咖啡：「勉强配得上你的蛋糕。」', rep: 20, money: 150 },
            80:  { text: '顾言红着脸塞给你一张VIP卡：「以后……只许你来我店里免费喝咖啡。」', rep: 25, money: 250 },
            100: { text: '顾言把额头抵在你肩上，声音低哑：「别开店了……我养你。开玩笑的。店要开，我陪你。」💍', rep: 40, money: 500 }
        },
        chat: ['「哼，我只是路过。……蛋糕，还不错。」', '「店里的灯光太暗了，影响食欲。」（其实是关心你）', '「别太累了，笨蛋。」', '「今天的咖啡，我请。」'],
        date: ['他带你去了安静的江边，给你买了一杯热可可。', '你们在咖啡店顶楼看夜景，他把外套披在你肩上。', '他陪你去了游乐园，虽然一脸不情愿，却陪你坐了旋转木马。']
    };
})();
