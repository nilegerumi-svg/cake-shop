// js/data/sewing/merged_for_game.js（bundle 32 件衣服 + 5 工具 + 旧版补充）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.SEWING_GAME = [
  {
    "id": "cp_under",
    "outfitId": "o_under_basic",
    "name": "基础内衣",
    "emoji": "👙",
    "category": "under",
    "difficulty": 1,
    "thread": 1,
    "desc": "贴身基础层，针脚细密贴身舒适"
  },
  {
    "id": "cp_underpants",
    "outfitId": "o_pants_basic",
    "name": "基础内裤",
    "emoji": "🩲",
    "category": "under",
    "difficulty": 1,
    "thread": 1,
    "desc": "纯棉亲肤，松紧腰头"
  },
  {
    "id": "cp_apron",
    "outfitId": "o_top_apron",
    "name": "甜点围裙",
    "emoji": "👩‍🍳",
    "category": "top",
    "difficulty": 1,
    "thread": 1,
    "desc": "开店必备，耐脏好洗"
  },
  {
    "id": "cp_socks",
    "outfitId": "o_socks_white",
    "name": "白棉袜",
    "emoji": "🧦",
    "category": "socks",
    "difficulty": 1,
    "thread": 1,
    "desc": "软和吸汗的棉袜"
  },
  {
    "id": "cp_short",
    "outfitId": "o_bottom_home",
    "name": "家常短裤",
    "emoji": "🩳",
    "category": "bottom",
    "difficulty": 1,
    "thread": 2,
    "desc": "松紧腰头的舒适短裤"
  },
  {
    "id": "cp_tshirt",
    "outfitId": "o_top_tshirt",
    "name": "纯棉T恤",
    "emoji": "👕",
    "category": "top",
    "difficulty": 1,
    "thread": 2,
    "desc": "圆领短袖，百搭日常"
  },
  {
    "id": "cp_pants",
    "outfitId": "o_bottom_pants",
    "name": "休闲长裤",
    "emoji": "👖",
    "category": "bottom",
    "difficulty": 2,
    "thread": 2,
    "button": 1,
    "desc": "直筒剪裁，干活方便"
  },
  {
    "id": "cp_skirt",
    "outfitId": "o_bottom_skirt",
    "name": "百褶短裙",
    "emoji": "👗",
    "category": "bottom",
    "difficulty": 2,
    "thread": 2,
    "desc": "压褶裙摆，转起来很好看"
  },
  {
    "id": "cp_shirt",
    "outfitId": "o_top_shirt",
    "name": "泡泡袖衬衫",
    "emoji": "👚",
    "category": "top",
    "difficulty": 2,
    "thread": 2,
    "button": 2,
    "desc": "泡泡袖甜美可爱"
  },
  {
    "id": "cp_beret",
    "outfitId": "o_head_hat",
    "name": "贝雷帽",
    "emoji": "🎩",
    "category": "head",
    "difficulty": 2,
    "thread": 2,
    "desc": "文艺范的贝雷帽"
  },
  {
    "id": "cp_cap",
    "outfitId": "o_head_cap",
    "name": "棒球帽",
    "emoji": "🧢",
    "category": "head",
    "difficulty": 2,
    "thread": 2,
    "desc": "遮阳帅气的棒球帽"
  },
  {
    "id": "cp_tote",
    "outfitId": "o_bag_tote",
    "name": "帆布托特包",
    "emoji": "👜",
    "category": "bag",
    "difficulty": 2,
    "thread": 3,
    "desc": "能装点心的大托特包"
  },
  {
    "id": "cp_hoodie",
    "outfitId": "o_coat_hoodie",
    "name": "连帽卫衣",
    "emoji": "🧢",
    "category": "coat",
    "difficulty": 2,
    "thread": 3,
    "desc": "宽松舒服的连帽卫衣"
  },
  {
    "id": "cp_knit",
    "outfitId": "o_top_knit",
    "name": "奶油针织衫",
    "emoji": "🧶",
    "category": "top",
    "difficulty": 3,
    "thread": 3,
    "desc": "软乎乎的针织上衣"
  },
  {
    "id": "cp_vest",
    "outfitId": "o_coat_vest",
    "name": "甜点师马甲",
    "emoji": "🧥",
    "category": "coat",
    "difficulty": 3,
    "thread": 3,
    "button": 2,
    "desc": "专业感十足的马甲"
  },
  {
    "id": "cp_wide",
    "outfitId": "o_bottom_wide",
    "name": "阔腿裤",
    "emoji": "🕶️",
    "category": "bottom",
    "difficulty": 3,
    "thread": 3,
    "desc": "潇洒利落的阔腿裤"
  },
  {
    "id": "cp_silk",
    "outfitId": "o_top_silk",
    "name": "真丝衬衫",
    "emoji": "🦢",
    "category": "top",
    "difficulty": 4,
    "thread": 4,
    "ribbon": 1,
    "desc": "缎面光泽，最考验针脚"
  },
  {
    "id": "cp_dress_elegant",
    "outfitId": "o_dress_elegant",
    "name": "优雅连衣裙",
    "emoji": "👗",
    "category": "dress",
    "difficulty": 3,
    "thread": 4,
    "ribbon": 1,
    "desc": "收腰剪裁的日常连衣裙，穿去约会刚刚好",
    "gender": "female"
  },
  {
    "id": "cp_long_skirt",
    "outfitId": "o_bottom_long",
    "name": "及踝长裙",
    "emoji": "🌾",
    "category": "bottom",
    "difficulty": 3,
    "thread": 3,
    "desc": "裙摆垂到脚踝，走路带风",
    "gender": "female"
  },
  {
    "id": "cp_cardigan",
    "outfitId": "o_coat_cardigan",
    "name": "开衫毛衣",
    "emoji": "🧶",
    "category": "coat",
    "difficulty": 3,
    "thread": 3,
    "button": 2,
    "desc": "温柔的开衫，天凉时随手一披"
  },
  {
    "id": "cp_trench",
    "outfitId": "o_coat_trench",
    "name": "经典风衣",
    "emoji": "🧥",
    "category": "coat",
    "difficulty": 4,
    "thread": 4,
    "button": 3,
    "desc": "翻领双排扣，走路带风的风衣"
  },
  {
    "id": "cp_wool_coat",
    "outfitId": "o_coat_wool",
    "name": "羊毛大衣",
    "emoji": "🧣",
    "category": "coat",
    "difficulty": 4,
    "thread": 5,
    "button": 3,
    "desc": "加厚羊毛呢料，冬天最暖的外套"
  },
  {
    "id": "cp_lace_socks",
    "outfitId": "o_socks_lace",
    "name": "蕾丝花边袜",
    "emoji": "🎀",
    "category": "socks",
    "difficulty": 1,
    "thread": 1,
    "desc": "精致的花边袜口，俏皮可爱",
    "gender": "female"
  },
  {
    "id": "cp_wool_socks",
    "outfitId": "o_socks_wool",
    "name": "羊毛袜",
    "emoji": "🧦",
    "category": "socks",
    "difficulty": 1,
    "thread": 2,
    "desc": "软糯厚实的羊毛袜，冬天必备"
  },
  {
    "id": "cp_umbrella_paper",
    "outfitId": "o_umbrella_paper",
    "name": "油纸伞",
    "emoji": "🏮",
    "category": "rain",
    "difficulty": 3,
    "thread": 2,
    "ribbon": 2,
    "desc": "伞面糊上油纸，古风满满"
  },
  {
    "id": "cp_bag_cross",
    "outfitId": "o_bag_cross",
    "name": "斜挎小包",
    "emoji": "👝",
    "category": "bag",
    "difficulty": 2,
    "thread": 2,
    "button": 1,
    "desc": "小巧的斜挎包，装零钱和钥匙刚好"
  },
  {
    "id": "cp_bag_hand",
    "outfitId": "o_bag_hand",
    "name": "手提包",
    "emoji": "💼",
    "category": "bag",
    "difficulty": 3,
    "thread": 3,
    "button": 2,
    "desc": "精致的手提包，见客也不怯场"
  },
  {
    "id": "cp_sport_vest",
    "outfitId": "o_under_sport",
    "name": "运动背心",
    "emoji": "🎽",
    "category": "under",
    "difficulty": 1,
    "thread": 2,
    "desc": "透气吸汗的运动背心，晨跑更自在"
  },
  {
    "id": "cp_raincoat_clear",
    "outfitId": "o_raincoat_clear",
    "name": "透明雨衣",
    "emoji": "🧊",
    "category": "rain",
    "difficulty": 2,
    "thread": 3,
    "desc": "透明软胶雨衣，下雨天也清爽"
  },
  {
    "id": "cp_raincoat_yellow",
    "outfitId": "o_raincoat_yellow",
    "name": "小黄雨衣",
    "emoji": "🐤",
    "category": "rain",
    "difficulty": 2,
    "thread": 3,
    "button": 1,
    "desc": "亮黄色雨衣，雨里最显眼"
  },
  {
    "id": "cp_flower_crown",
    "outfitId": "o_head_flower",
    "name": "花环发饰",
    "emoji": "🌸",
    "category": "head",
    "difficulty": 2,
    "thread": 1,
    "ribbon": 1,
    "desc": "把布花一朵朵缝上发箍",
    "gender": "female"
  },
  {
    "id": "cp_bow_bracelet",
    "outfitId": "o_hand_bow",
    "name": "蝴蝶结手链",
    "emoji": "🎀",
    "category": "accessory",
    "difficulty": 3,
    "thread": 1,
    "ribbon": 1,
    "desc": "缎带打的蝴蝶结手链，甜到心里"
  }
];
    window.Cake.SEWING_TOOLS_GAME = [
  {
    "id": "sew_basic",
    "name": "基础针线包",
    "emoji": "🪡",
    "desc": "开局自带的针线包，凑合能用",
    "bonus": 0
  },
  {
    "id": "sew_scissors",
    "name": "裁缝剪",
    "emoji": "✂️",
    "price": 220,
    "desc": "剪布更利落，裁片更准",
    "bonus": 4
  },
  {
    "id": "sew_thimble",
    "name": "铜顶针",
    "emoji": "🪙",
    "price": 360,
    "desc": "推针不伤手，走线更稳",
    "bonus": 6
  },
  {
    "id": "sew_machine",
    "name": "脚踏缝纫机",
    "emoji": "🧵",
    "price": 760,
    "desc": "哒哒哒踩起来，效率翻倍",
    "bonus": 9
  },
  {
    "id": "sew_embroidery",
    "name": "绣花绷架",
    "emoji": "🪡",
    "price": 1300,
    "desc": "绣花绷架在手，花纹随心走",
    "bonus": 12
  }
];
})();
