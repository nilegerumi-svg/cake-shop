// js/data/festivals/merged_for_game.js（bundle 13 个节日 × 3 活动 = 39）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVALS_GAME = [
  {
    "festivalId": "new_year",
    "name": "春节庙会",
    "emoji": "🏮",
    "desc": "广场上搭起一排排红棚子：糖人、年画、舞狮、鞭炮摊前挤满了人，锣鼓声从早响到晚。",
    "hostPlace": "plaza",
    "activities": [
      {
        "id": "ny_market",
        "name": "逛年货市集",
        "emoji": "🧧",
        "desc": "挑春联、买福字、捏个糖人，把年味带回家。",
        "energy": 5,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你在庙会摊前挑了春联、福字和糖人，年味一下子就有了"
      },
      {
        "id": "ny_lion",
        "name": "看舞狮采青",
        "emoji": "🦁",
        "desc": "狮子踩着鼓点腾挪跳跃，采青的一瞬全场喝彩。",
        "energy": 8,
        "minutes": 60,
        "mood": 10,
        "health": 0,
        "line": "狮子踩着鼓点腾挪跳跃，采青的一瞬全场喝彩，你也跟着拍红了手掌"
      },
      {
        "id": "ny_firework",
        "name": "放烟花迎新春",
        "emoji": "🎆",
        "desc": "烟花在夜空炸开，许下新年第一个愿望。",
        "energy": 4,
        "minutes": 30,
        "mood": 8,
        "health": 0,
        "line": "烟花在夜空炸开，你仰头许下新年第一个愿望"
      }
    ]
  },
  {
    "festivalId": "lantern",
    "name": "元宵灯会",
    "emoji": "🏮",
    "desc": "广场挂满花灯，灯谜纸条在风里哗哗响，孩子们提着兔子灯满场跑。",
    "hostPlace": "plaza",
    "activities": [
      {
        "id": "lan_riddle",
        "name": "猜灯谜",
        "emoji": "🧩",
        "desc": "花灯下挂着一排排灯谜，答对了有彩头。",
        "energy": 5,
        "minutes": 30,
        "mood": 7,
        "health": 0,
        "line": "你连猜中三盏花灯的谜面，摊主笑着塞给你一个小彩头"
      },
      {
        "id": "lan_parade",
        "name": "赏花灯巡游",
        "emoji": "✨",
        "desc": "跟着提灯的人群绕广场走一圈，满眼流光。",
        "energy": 6,
        "minutes": 60,
        "mood": 9,
        "health": 0,
        "line": "提灯的人群绕着广场缓缓流动，你在流光里走了很久很久"
      },
      {
        "id": "lan_tangyuan",
        "name": "吃热汤圆",
        "emoji": "🥣",
        "desc": "黑芝麻馅的汤圆刚出锅，甜到心里。",
        "energy": 3,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "黑芝麻馅的汤圆又烫又甜，一口下去整个人都暖了"
      }
    ]
  },
  {
    "festivalId": "new_year_solar",
    "name": "元旦烟花晚会",
    "emoji": "🎆",
    "desc": "广场上拉起彩带，倒计时一过，烟花准时在夜空炸开。",
    "hostPlace": "plaza",
    "activities": [
      {
        "id": "nye_firework",
        "name": "看跨年烟花",
        "emoji": "🎇",
        "desc": "和全镇人一起倒计时，看烟花点亮夜空。",
        "energy": 6,
        "minutes": 60,
        "mood": 9,
        "health": 0,
        "line": "烟花在倒计时声里炸开，你和新的一年撞了个满怀"
      },
      {
        "id": "nye_market",
        "name": "逛新年集市",
        "emoji": "🛍️",
        "desc": "小吃、手作、灯笼摊排成长龙，烟火气十足。",
        "energy": 5,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "集市上的小吃摊冒着热气，你边走边吃，心情也跟着热乎起来"
      },
      {
        "id": "nye_card",
        "name": "写新年心愿卡",
        "emoji": "✍️",
        "desc": "把新年愿望写在卡片上，挂上许愿墙。",
        "energy": 3,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你把心愿写在卡片上挂上许愿墙，感觉新的一年有盼头了"
      }
    ]
  },
  {
    "festivalId": "valentine",
    "name": "情人节花市",
    "emoji": "💐",
    "desc": "商店街变成一片花的海洋，玫瑰、巧克力、告白气球到处都是。",
    "hostPlace": "street",
    "activities": [
      {
        "id": "vd_rose",
        "name": "逛玫瑰摊位",
        "emoji": "🌹",
        "desc": "红玫瑰白玫瑰摆满摊位，香气扑鼻。",
        "energy": 4,
        "minutes": 30,
        "mood": 7,
        "health": 0,
        "line": "你在玫瑰花摊前站了很久，最后挑了一束最顺眼的"
      },
      {
        "id": "vd_sweet",
        "name": "买情侣点心",
        "emoji": "🍫",
        "desc": "巧克力、心形饼干，甜点铺子排着长队。",
        "energy": 3,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你挤进甜品铺子买了一份心形点心，甜度刚刚好"
      },
      {
        "id": "vd_wall",
        "name": "逛告白墙",
        "emoji": "💌",
        "desc": "墙上贴满了写给心上人的话，暖意十足。",
        "energy": 4,
        "minutes": 30,
        "mood": 7,
        "health": 0,
        "line": "你在告白墙上读到好多真心话，忍不住也跟着祝福起来"
      }
    ]
  },
  {
    "festivalId": "sakura",
    "name": "樱花野餐会",
    "emoji": "🌸",
    "desc": "公园的樱花全开了，树下一块块野餐垫，花瓣落进便当盒里。",
    "hostPlace": "park",
    "activities": [
      {
        "id": "sk_picnic",
        "name": "樱花树下野餐",
        "emoji": "🍱",
        "desc": "铺开垫子，边吃点心边看花瓣飘落。",
        "energy": 6,
        "minutes": 60,
        "mood": 9,
        "health": 0,
        "line": "花瓣一片片落进便当盒，你坐在樱花树下把春天吃进了肚子里"
      },
      {
        "id": "sk_photo",
        "name": "拍樱花照片",
        "emoji": "📷",
        "desc": "挑个好角度，把满树粉白装进相册。",
        "energy": 4,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你挑了个好角度按了好几下快门，满树粉白都装进了相册"
      },
      {
        "id": "sk_craft",
        "name": "逛手作小摊",
        "emoji": "🎐",
        "desc": "樱花书签、花瓣皂，都是春天的味道。",
        "energy": 5,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你在手作摊前挑了一枚樱花书签，春天的味道算是留住了"
      }
    ]
  },
  {
    "festivalId": "labor",
    "name": "劳动节游园会",
    "emoji": "🎡",
    "desc": "公园搭起舞台和游戏棚，套圈、投篮、飞镖，大人小孩都玩疯了。",
    "hostPlace": "park",
    "activities": [
      {
        "id": "lab_fair",
        "name": "逛游园集市",
        "emoji": "🎠",
        "desc": "游戏棚和零食摊一个挨一个，热闹非凡。",
        "energy": 6,
        "minutes": 60,
        "mood": 8,
        "health": 0,
        "line": "你从套圈摊逛到零食摊，手里的奖品越攒越多"
      },
      {
        "id": "lab_show",
        "name": "看民俗表演",
        "emoji": "🎭",
        "desc": "魔术、杂技、小丑，舞台前排满了人。",
        "energy": 4,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "杂技演员在高空荡来荡去，你看得手心直冒汗"
      },
      {
        "id": "lab_sport",
        "name": "参加趣味运动",
        "emoji": "🏃",
        "desc": "拔河、两人三足、袋鼠跳，出一身汗。",
        "energy": 10,
        "minutes": 60,
        "mood": 9,
        "health": 2,
        "line": "你在两人三足里摔了个跟头，爬起来接着跑，笑了一下午"
      }
    ]
  },
  {
    "festivalId": "sweet_fest",
    "name": "甜蜜节甜品市集",
    "emoji": "🍬",
    "desc": "全镇的甜品店都摆出看家点心，评选「小镇第一甜」的投票箱前排着长队。",
    "hostPlace": "plaza",
    "activities": [
      {
        "id": "sf_taste",
        "name": "试吃全镇甜品",
        "emoji": "🍰",
        "desc": "从这头吃到那头，把每家招牌都尝一遍。",
        "energy": 5,
        "minutes": 60,
        "mood": 10,
        "health": 0,
        "line": "你从市集这头吃到那头，最后扶着腰宣布：今晚不吃了"
      },
      {
        "id": "sf_vote",
        "name": "投出「第一甜」",
        "emoji": "🗳️",
        "desc": "在投票箱前认真写下你心里的第一名。",
        "energy": 3,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你把票投给了自己最服气的那一家，期待开奖"
      },
      {
        "id": "sf_stall",
        "name": "帮忙摆试吃摊",
        "emoji": "🍡",
        "desc": "帮相熟的店家切点心、招呼客人。",
        "energy": 8,
        "minutes": 60,
        "mood": 8,
        "health": 0,
        "line": "你帮忙招呼了一下午客人，听了一下午「再来一块」"
      }
    ]
  },
  {
    "festivalId": "qixi",
    "name": "七夕河灯会",
    "emoji": "🏮",
    "desc": "河边星星点点全是河灯，情侣们并肩坐在石阶上，牛郎织女的传说被讲了一遍又一遍。",
    "hostPlace": "river",
    "activities": [
      {
        "id": "qx_lantern",
        "name": "放河灯",
        "emoji": "🕯️",
        "desc": "在灯上写下心愿，轻轻推进河里。",
        "energy": 3,
        "minutes": 30,
        "mood": 8,
        "health": 0,
        "line": "河灯载着你的心愿顺流而下，你看了很久很久"
      },
      {
        "id": "qx_star",
        "name": "坐在河边看星星",
        "emoji": "✨",
        "desc": "夏夜的星星特别亮，传说牛郎织女今晚相会。",
        "energy": 4,
        "minutes": 60,
        "mood": 8,
        "health": 0,
        "line": "你仰头数着星星，想起牛郎织女的故事，心里也跟着亮堂起来"
      },
      {
        "id": "qx_market",
        "name": "逛鹊桥市集",
        "emoji": "🎐",
        "desc": "手作香囊、同心结、小灯笼，逛着逛着就挪不动脚。",
        "energy": 5,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你在鹊桥市集挑了一枚同心结，摊主笑着说「送人最合适」"
      }
    ]
  },
  {
    "festivalId": "mid_autumn",
    "name": "中秋赏月会",
    "emoji": "🌕",
    "desc": "广场摆起长桌，月饼和柚子堆成小山，月亮又圆又亮。",
    "hostPlace": "plaza",
    "activities": [
      {
        "id": "ma_moon",
        "name": "赏月吃月饼",
        "emoji": "🥮",
        "desc": "就着月光咬一口月饼，甜丝丝的。",
        "energy": 3,
        "minutes": 30,
        "mood": 8,
        "health": 0,
        "line": "月亮又圆又亮，你咬了一口莲蓉月饼，甜丝丝的"
      },
      {
        "id": "ma_riddle",
        "name": "猜灯谜",
        "emoji": "🧩",
        "desc": "灯谜挂了一长廊，答对能换柚子。",
        "energy": 5,
        "minutes": 30,
        "mood": 7,
        "health": 0,
        "line": "你猜对两道灯谜，抱着赢来的柚子心满意足"
      },
      {
        "id": "ma_story",
        "name": "听中秋故事",
        "emoji": "📖",
        "desc": "老人们围坐讲嫦娥奔月，孩子们听得入神。",
        "energy": 4,
        "minutes": 60,
        "mood": 7,
        "health": 0,
        "line": "嫦娥奔月的故事讲完，你发现月亮好像真的更圆了"
      }
    ]
  },
  {
    "festivalId": "harvest",
    "name": "丰收节庆祝会",
    "emoji": "🌾",
    "desc": "农贸市场堆满新摘的瓜果，金黄的麦穗扎成拱门，全镇都来庆祝丰收。",
    "hostPlace": "market",
    "activities": [
      {
        "id": "hv_fruit",
        "name": "尝新摘瓜果",
        "emoji": "🍎",
        "desc": "刚从地里摘的果子，咬一口都是阳光味。",
        "energy": 4,
        "minutes": 30,
        "mood": 7,
        "health": 1,
        "line": "新摘的苹果又脆又甜，你一口气尝了三种"
      },
      {
        "id": "hv_parade",
        "name": "参加丰收巡游",
        "emoji": "🚜",
        "desc": "跟着花车和锣鼓队绕市场走一圈。",
        "energy": 6,
        "minutes": 60,
        "mood": 9,
        "health": 0,
        "line": "你跟着花车队伍走了一整圈，锣鼓声把耳朵都震麻了"
      },
      {
        "id": "hv_gift",
        "name": "买时令特产",
        "emoji": "🎁",
        "desc": "南瓜干、山楂条、新米，装了一兜子。",
        "energy": 3,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你装了一兜子南瓜干和新米，感觉把整个秋天都带回了家"
      }
    ]
  },
  {
    "festivalId": "national",
    "name": "国庆庆祝晚会",
    "emoji": "🎇",
    "desc": "广场挂满国旗，舞台上演着庆祝演出，夜市摊位亮起一串串彩灯。",
    "hostPlace": "plaza",
    "activities": [
      {
        "id": "na_show",
        "name": "看庆祝演出",
        "emoji": "🎤",
        "desc": "歌舞、合唱、小品，舞台前围得水泄不通。",
        "energy": 5,
        "minutes": 60,
        "mood": 9,
        "health": 0,
        "line": "台上的合唱响起时，你也跟着轻轻哼了起来"
      },
      {
        "id": "na_night",
        "name": "逛夜市摊位",
        "emoji": "🍢",
        "desc": "烤串、糖水、套圈，夜市的热闹一点不少。",
        "energy": 5,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你在夜市吃了烤串喝了糖水，最后还套中了一个小玩偶"
      },
      {
        "id": "na_wish",
        "name": "写祝福放飞灯笼",
        "emoji": "🏮",
        "desc": "把祝福写在灯上，看着它慢慢升上夜空。",
        "energy": 3,
        "minutes": 30,
        "mood": 7,
        "health": 0,
        "line": "写着祝福的灯笼越飞越高，你也跟着仰头看了很久"
      }
    ]
  },
  {
    "festivalId": "winter_solstice",
    "name": "冬至暖冬集市",
    "emoji": "🥟",
    "desc": "商店街支起一口口大锅，饺子、汤圆、羊肉汤冒着白汽，冬至大如年。",
    "hostPlace": "street",
    "activities": [
      {
        "id": "ws_dumpling",
        "name": "吃热饺子",
        "emoji": "🥟",
        "desc": "刚出锅的饺子蘸醋，一口一个。",
        "energy": 3,
        "minutes": 30,
        "mood": 7,
        "health": 0,
        "line": "刚出锅的饺子烫得你直吹气，还是忍不住一口一个"
      },
      {
        "id": "ws_soup",
        "name": "喝羊肉汤暖身",
        "emoji": "🍲",
        "desc": "一碗下肚，从嗓子暖到脚底板。",
        "energy": 3,
        "minutes": 30,
        "mood": 6,
        "health": 1,
        "line": "一碗羊肉汤下肚，你感觉整个冬天都不怕了"
      },
      {
        "id": "ws_craft",
        "name": "逛暖冬手作摊",
        "emoji": "🧣",
        "desc": "围巾、手套、暖手宝，摊主们都很热情。",
        "energy": 4,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你在手作摊挑了一条围巾，摊主笑着说「冬至戴上正合适」"
      }
    ]
  },
  {
    "festivalId": "christmas",
    "name": "平安夜彩灯市集",
    "emoji": "🎄",
    "desc": "商店街的彩灯全亮了，圣诞树闪着光，铃铛声和颂歌飘满整条街。",
    "hostPlace": "street",
    "activities": [
      {
        "id": "cm_lights",
        "name": "逛彩灯夜市",
        "emoji": "✨",
        "desc": "彩灯拱门下人来人往，到处亮晶晶的。",
        "energy": 6,
        "minutes": 60,
        "mood": 9,
        "health": 0,
        "line": "你在彩灯拱门下走了个来回，感觉整条街都在发光"
      },
      {
        "id": "cm_gift",
        "name": "挑圣诞礼物",
        "emoji": "🎁",
        "desc": "给朋友们挑几份礼物，包装纸沙沙响。",
        "energy": 4,
        "minutes": 30,
        "mood": 6,
        "health": 0,
        "line": "你挑了包装纸和缎带，把礼物包得漂漂亮亮"
      },
      {
        "id": "cm_carol",
        "name": "听圣诞颂歌",
        "emoji": "🎵",
        "desc": "合唱团在树下唱起颂歌，路人都放慢了脚步。",
        "energy": 3,
        "minutes": 30,
        "mood": 7,
        "health": 0,
        "line": "颂歌响起来的时候，你也跟着轻轻哼了两句"
      }
    ]
  }
];
})();
