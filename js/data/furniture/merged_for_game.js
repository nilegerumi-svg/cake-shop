// js/data/furniture/merged_for_game.js（bundle 63 件 + 旧版补充）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FURNITURE_GAME = [
  {
    "id": "f_table",
    "name": "小圆桌",
    "emoji": "🪑",
    "desc": "喝茶看书的角落",
    "category": "table",
    "buyPrice": 120,
    "level": 1,
    "decor": 4
  },
  {
    "id": "f_cashier",
    "name": "收银台",
    "emoji": "🧾",
    "desc": "开店收银的柜台",
    "category": "table",
    "buyPrice": 280,
    "level": 1,
    "decor": 9
  },
  {
    "id": "f_bookshelf",
    "name": "书架",
    "emoji": "📚",
    "desc": "摆满甜点食谱",
    "category": "storage",
    "buyPrice": 200,
    "level": 1,
    "decor": 8
  },
  {
    "id": "f_lamp",
    "name": "台灯",
    "emoji": "💡",
    "desc": "夜晚也有暖光",
    "category": "light",
    "buyPrice": 150,
    "level": 1,
    "decor": 5
  },
  {
    "id": "f_rug",
    "name": "地毯",
    "emoji": "🧶",
    "desc": "软软的脚感",
    "category": "decor",
    "buyPrice": 180,
    "level": 1,
    "decor": 5
  },
  {
    "id": "f_plant",
    "name": "花架",
    "emoji": "🪴",
    "desc": "养几盆绿植",
    "category": "decor",
    "buyPrice": 160,
    "level": 1,
    "decor": 6
  },
  {
    "id": "f_painting",
    "name": "挂画",
    "emoji": "🖼️",
    "desc": "墙上的风景",
    "category": "decor",
    "buyPrice": 220,
    "level": 1,
    "decor": 7
  },
  {
    "id": "f_stool",
    "name": "小板凳",
    "emoji": "🪑",
    "desc": "简单实用的小凳子",
    "category": "table",
    "level": 1,
    "materials": {
      "wood": 2,
      "nail": 1
    },
    "decor": 3
  },
  {
    "id": "f_bedside",
    "name": "床头柜",
    "emoji": "🗄️",
    "desc": "睡前放杯牛奶",
    "category": "storage",
    "level": 2,
    "materials": {
      "wood": 2,
      "nail": 1,
      "paint": 1
    },
    "decor": 5
  },
  {
    "id": "f_desk",
    "name": "小书桌",
    "emoji": "🪵",
    "desc": "记录配方的书桌",
    "category": "table",
    "level": 2,
    "materials": {
      "wood": 3,
      "nail": 2,
      "paint": 1
    },
    "decor": 7
  },
  {
    "id": "f_shelf",
    "name": "置物架",
    "emoji": "🗃️",
    "desc": "收纳各种小物",
    "category": "storage",
    "level": 2,
    "materials": {
      "wood": 3,
      "nail": 2,
      "paint": 1
    },
    "decor": 5
  },
  {
    "id": "f_chair",
    "name": "软垫椅",
    "emoji": "💺",
    "desc": "一坐就不想起来",
    "category": "table",
    "level": 2,
    "materials": {
      "wood": 2,
      "cloth": 2,
      "nail": 1
    },
    "decor": 6
  },
  {
    "id": "f_wardrobe",
    "name": "衣柜",
    "emoji": "🚪",
    "desc": "装下四季衣裳",
    "category": "storage",
    "level": 3,
    "materials": {
      "wood": 4,
      "nail": 3,
      "paint": 2
    },
    "decor": 8
  },
  {
    "id": "f_glass",
    "name": "玻璃展柜",
    "emoji": "🪟",
    "desc": "展示最得意的点心",
    "category": "storage",
    "level": 3,
    "materials": {
      "wood": 3,
      "glass": 2,
      "glue": 1
    },
    "decor": 10
  },
  {
    "id": "f_bed",
    "name": "大木床",
    "emoji": "🛏️",
    "desc": "梦最香甜的地方",
    "category": "bedding",
    "level": 4,
    "materials": {
      "wood": 5,
      "cloth": 3,
      "nail": 2,
      "paint": 2
    },
    "decor": 12
  },
  {
    "id": "f_tea_table",
    "name": "藤编茶几",
    "emoji": "🧺",
    "desc": "下午茶的最佳搭档",
    "category": "table",
    "level": 2,
    "materials": {
      "wood": 3,
      "cloth": 2,
      "glue": 1
    },
    "decor": 5
  },
  {
    "id": "f_plant_stand",
    "name": "花艺边几",
    "emoji": "🪴",
    "desc": "摆上绿植，家里就有生气",
    "category": "decor",
    "level": 2,
    "materials": {
      "wood": 3,
      "paint": 2
    },
    "decor": 6
  },
  {
    "id": "f_cat_tree",
    "name": "猫爬架",
    "emoji": "🐈",
    "desc": "给路过的小猫留个窝",
    "category": "decor",
    "level": 2,
    "materials": {
      "wood": 3,
      "cloth": 3,
      "nail": 2
    },
    "decor": 5
  },
  {
    "id": "f_sideboard",
    "name": "餐边柜",
    "emoji": "🗄️",
    "desc": "收纳餐具与点心罐",
    "category": "storage",
    "level": 3,
    "materials": {
      "wood": 4,
      "nail": 3,
      "paint": 2
    },
    "decor": 8
  },
  {
    "id": "f_showcase",
    "name": "甜品展示台",
    "emoji": "🍰",
    "desc": "把最得意的点心摆在台面上",
    "category": "table",
    "buyPrice": 480,
    "level": 3,
    "materials": {
      "wood": 3,
      "glass": 2,
      "glue": 1
    },
    "decor": 10
  },
  {
    "id": "f_screen",
    "name": "拱形屏风",
    "emoji": "🪞",
    "desc": "隔出一方安静的小天地",
    "category": "decor",
    "level": 3,
    "materials": {
      "wood": 4,
      "cloth": 3,
      "paint": 1
    },
    "decor": 9
  },
  {
    "id": "f_pendant",
    "name": "星空吊灯",
    "emoji": "💡",
    "desc": "暖黄灯光像星星落进屋里",
    "category": "light",
    "level": 3,
    "materials": {
      "wood": 2,
      "glass": 2,
      "glue": 1
    },
    "decor": 8
  },
  {
    "id": "f_rocking",
    "name": "摇摇椅",
    "emoji": "🪑",
    "desc": "摇着摇着就睡着了",
    "category": "table",
    "level": 4,
    "materials": {
      "wood": 5,
      "cloth": 3,
      "nail": 2
    },
    "decor": 10
  },
  {
    "id": "f_vanity",
    "name": "梳妆台",
    "emoji": "🪞",
    "desc": "梳洗打扮的专属角落",
    "category": "table",
    "buyPrice": 680,
    "level": 4,
    "materials": {
      "wood": 4,
      "glass": 2,
      "nail": 2,
      "paint": 2
    },
    "decor": 11
  },
  {
    "id": "f_toy_blocks",
    "name": "积木套装",
    "emoji": "🧱",
    "desc": "夜市玩具摊淘来的积木，能搭小房子",
    "category": "toy",
    "buyPrice": 20,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_toy_doll",
    "name": "布偶玩偶",
    "emoji": "🧸",
    "desc": "手工缝的布偶，抱回家能当枕头",
    "category": "toy",
    "buyPrice": 30,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_toy_car",
    "name": "小汽车模型",
    "emoji": "🚗",
    "desc": "嘀嘀响的小汽车，摆着也好看",
    "category": "toy",
    "buyPrice": 25,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_toy_duck",
    "name": "橡皮鸭玩偶",
    "emoji": "🦆",
    "desc": "套圈套中的橡皮鸭，捏一下吱吱响",
    "category": "toy",
    "buyPrice": 35,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_toy_rabbit",
    "name": "长耳兔玩偶",
    "emoji": "🐰",
    "desc": "套圈摊的“镇摊之宝”，软耳朵垂下来",
    "category": "toy",
    "buyPrice": 45,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_aquarium",
    "name": "水族缸",
    "emoji": "🐠",
    "desc": "捞来的金鱼放进水族缸就能养，记得喂食、定期清理",
    "category": "aquarium",
    "buyPrice": 480,
    "level": 1,
    "decor": 6
  },
  {
    "id": "f_aquarium_round",
    "name": "小圆玻璃缸",
    "emoji": "🐠",
    "desc": "圆滚滚的玻璃缸，小巧透亮",
    "category": "aquarium",
    "buyPrice": 260,
    "level": 1,
    "decor": 5
  },
  {
    "id": "f_aquarium_wood",
    "name": "大木缸",
    "emoji": "🪵",
    "desc": "松木大缸，宽敞结实，鱼儿游得欢",
    "category": "aquarium",
    "buyPrice": 780,
    "level": 1,
    "decor": 9
  },
  {
    "id": "f_aquarium_ceramic",
    "name": "陶瓷金鱼缸",
    "emoji": "🏺",
    "desc": "青花瓷身，古色古香",
    "category": "aquarium",
    "buyPrice": 620,
    "level": 1,
    "decor": 8
  },
  {
    "id": "f_tablecloth_red",
    "name": "红格桌布",
    "emoji": "🧺",
    "desc": "红格纹桌布，喜庆又耐脏",
    "category": "tablecloth",
    "size": "small",
    "buyPrice": 26,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_tablecloth_blue",
    "name": "蓝格桌布",
    "emoji": "🧺",
    "desc": "蓝格纹桌布，清爽干净",
    "category": "tablecloth",
    "size": "small",
    "buyPrice": 26,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_tablecloth_yellow",
    "name": "黄格桌布",
    "emoji": "🧺",
    "desc": "黄格纹桌布，暖洋洋的",
    "category": "tablecloth",
    "size": "small",
    "buyPrice": 26,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_tablecloth_pink",
    "name": "粉格桌布",
    "emoji": "🧺",
    "desc": "粉格纹桌布，少女心满满",
    "category": "tablecloth",
    "size": "small",
    "buyPrice": 26,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_tablecloth_green",
    "name": "绿格桌布",
    "emoji": "🧺",
    "desc": "绿格纹桌布，像春天的小草地",
    "category": "tablecloth",
    "size": "small",
    "buyPrice": 26,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_tablecloth_natural",
    "name": "原木色桌布",
    "emoji": "🧺",
    "desc": "原木色桌布，素净百搭",
    "category": "tablecloth",
    "size": "small",
    "buyPrice": 26,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_vase_red",
    "name": "红花瓶摆件",
    "emoji": "🏺",
    "desc": "小红花瓶，插枝野花正好",
    "category": "ornament",
    "size": "small",
    "buyPrice": 34,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_vase_blue",
    "name": "蓝花瓶摆件",
    "emoji": "🏺",
    "desc": "小蓝花瓶，清爽又别致",
    "category": "ornament",
    "size": "small",
    "buyPrice": 34,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_vase_yellow",
    "name": "黄花瓶摆件",
    "emoji": "🏺",
    "desc": "小黄花瓶，像阳光一样亮眼",
    "category": "ornament",
    "size": "small",
    "buyPrice": 34,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_vase_pink",
    "name": "粉花瓶摆件",
    "emoji": "🏺",
    "desc": "小粉花瓶，温柔可爱",
    "category": "ornament",
    "size": "small",
    "buyPrice": 34,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_clock_wood",
    "name": "原木小座钟",
    "emoji": "⏰",
    "desc": "滴答作响的原木座钟",
    "category": "ornament",
    "size": "small",
    "buyPrice": 42,
    "level": 1,
    "decor": 4
  },
  {
    "id": "f_clock_red",
    "name": "红漆小座钟",
    "emoji": "⏰",
    "desc": "红漆木座钟，喜气洋洋",
    "category": "ornament",
    "size": "small",
    "buyPrice": 42,
    "level": 1,
    "decor": 4
  },
  {
    "id": "f_hanging_wind",
    "name": "风铃挂饰",
    "emoji": "🎐",
    "desc": "风一吹叮叮当当",
    "category": "hanging",
    "size": "small",
    "buyPrice": 38,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_hanging_photo",
    "name": "照片挂饰",
    "emoji": "🖼️",
    "desc": "挂上合影，回忆满满",
    "category": "hanging",
    "size": "small",
    "buyPrice": 36,
    "level": 1,
    "decor": 3
  },
  {
    "id": "f_hanging_star",
    "name": "星星挂饰",
    "emoji": "⭐",
    "desc": "夜里像落进屋里的小星星",
    "category": "hanging",
    "size": "small",
    "buyPrice": 40,
    "level": 1,
    "decor": 4
  },
  {
    "id": "f_pebble_red",
    "name": "红彩鹅卵石",
    "emoji": "🔴",
    "desc": "圆润的红彩石，垫在缸底亮眼",
    "category": "aqua_decor",
    "size": "small",
    "buyPrice": 15,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_pebble_blue",
    "name": "蓝彩鹅卵石",
    "emoji": "🔵",
    "desc": "圆润的蓝彩石，像一小汪湖水",
    "category": "aqua_decor",
    "size": "small",
    "buyPrice": 15,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_pebble_yellow",
    "name": "黄彩鹅卵石",
    "emoji": "🟡",
    "desc": "圆润的黄彩石，像小太阳",
    "category": "aqua_decor",
    "size": "small",
    "buyPrice": 15,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_pebble_green",
    "name": "绿彩鹅卵石",
    "emoji": "🟢",
    "desc": "圆润的绿彩石，像苔藓小岛",
    "category": "aqua_decor",
    "size": "small",
    "buyPrice": 15,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_pebble_pink",
    "name": "粉彩鹅卵石",
    "emoji": "🌸",
    "desc": "圆润的粉彩石，少女心配色",
    "category": "aqua_decor",
    "size": "small",
    "buyPrice": 15,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_weed_green",
    "name": "绿水草",
    "emoji": "🌿",
    "desc": "翠绿水草，鱼儿爱绕着游",
    "category": "aqua_decor",
    "size": "small",
    "buyPrice": 20,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_weed_pink",
    "name": "粉水草",
    "emoji": "🪸",
    "desc": "粉粉的水草，缸里多一分温柔",
    "category": "aqua_decor",
    "size": "small",
    "buyPrice": 20,
    "level": 1,
    "decor": 2
  },
  {
    "id": "f_bridge_wood",
    "name": "原木小桥摆件",
    "emoji": "🌉",
    "desc": "迷你小桥，金鱼从桥下游过",
    "category": "aqua_decor",
    "size": "small",
    "buyPrice": 50,
    "level": 1,
    "decor": 4
  },
  {
    "id": "f_bridge_red",
    "name": "红漆小桥摆件",
    "emoji": "🌉",
    "desc": "红漆小桥，像画里的江南",
    "category": "aqua_decor",
    "size": "small",
    "buyPrice": 50,
    "level": 1,
    "decor": 4
  },
  {
    "id": "f_fish_fridge",
    "name": "河鲜冷藏柜",
    "emoji": "🧊",
    "desc": "鱼类食材放包里坏得慢：变质速度减半",
    "category": "storage",
    "buyPrice": 560,
    "level": 1,
    "decor": 5
  },
  {
    "id": "f_fishtank",
    "name": "河鲜养护缸",
    "emoji": "🐠",
    "desc": "钓来的活鱼入缸养着，不会变质，随取随做",
    "category": "aquarium",
    "buyPrice": 680,
    "level": 1,
    "decor": 6
  },
  {
    "id": "f_juicer",
    "name": "榨汁机",
    "emoji": "🍹",
    "desc": "互动「榨果汁」：消耗 1 份水果得果汁，心情 +4、精力 +4",
    "category": "appliance",
    "buyPrice": 240,
    "level": 2,
    "materials": {
      "wood": 2,
      "glass": 2,
      "glue": 1
    },
    "decor": 6
  },
  {
    "id": "f_coffee",
    "name": "咖啡机",
    "emoji": "☕",
    "desc": "互动「煮咖啡」：每天一次，精力 +8、心情 +4",
    "category": "appliance",
    "buyPrice": 300,
    "level": 2,
    "materials": {
      "wood": 2,
      "nail": 1,
      "glass": 1
    },
    "decor": 7
  },
  {
    "id": "f_fridge",
    "name": "冰箱",
    "emoji": "🧊",
    "desc": "摆进店铺：全部食材新鲜度下降减半（保鲜效果，全店生效）",
    "category": "appliance",
    "buyPrice": 350,
    "level": 2,
    "materials": {
      "wood": 2,
      "nail": 2,
      "glue": 1
    },
    "decor": 7
  },
  {
    "id": "f_ac",
    "name": "空调",
    "emoji": "❄️",
    "desc": "摆进店铺：店内舒适度提升，客人成交率 +2%、睡觉回复心情 +2",
    "category": "appliance",
    "buyPrice": 400,
    "level": 3,
    "materials": {
      "wood": 2,
      "nail": 3,
      "glass": 1
    },
    "decor": 8
  }
];
})();
