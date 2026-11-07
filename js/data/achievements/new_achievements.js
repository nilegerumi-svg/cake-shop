// js/data/achievements/new_achievements.js（新版 21 成就 + 30 里程碑）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.ACHIEVEMENTS_NEW = {
    "bake_1": {
        "id": "bake_1",
        "category": "bake",
        "name": "初出茅庐",
        "emoji": "🧁",
        "desc": "完成第一次烘焙"
    },
    "bake_10": {
        "id": "bake_10",
        "category": "bake",
        "name": "烘焙新手",
        "emoji": "🥐",
        "desc": "累计烘焙 10 次"
    },
    "bake_50": {
        "id": "bake_50",
        "category": "bake",
        "name": "烘焙达人",
        "emoji": "🍩",
        "desc": "累计烘焙 50 次"
    },
    "bake_100": {
        "id": "bake_100",
        "category": "bake",
        "name": "烘焙大师",
        "emoji": "🏆",
        "desc": "累计烘焙 100 次"
    },
    "perfect_5": {
        "id": "perfect_5",
        "category": "bake",
        "name": "完美主义者",
        "emoji": "✨",
        "desc": "制作出 5 个完美品质点心"
    },
    "perfect_20": {
        "id": "perfect_20",
        "category": "bake",
        "name": "精益求精",
        "emoji": "💎",
        "desc": "制作出 20 个完美品质点心"
    },
    "recipe_5": {
        "id": "recipe_5",
        "category": "bake",
        "name": "蛋糕爱好者",
        "emoji": "📖",
        "desc": "研发 5 种配方"
    },
    "recipe_10": {
        "id": "recipe_10",
        "category": "bake",
        "name": "美食家",
        "emoji": "👨‍🍳",
        "desc": "研发 10 种配方"
    },
    "recipe_all": {
        "id": "recipe_all",
        "category": "bake",
        "name": "甜品大师",
        "emoji": "👑",
        "desc": "研发全部配方"
    },
    "bake_300": {
        "id": "bake_300",
        "category": "bake",
        "name": "烘焙狂人",
        "emoji": "🏵️",
        "desc": "累计烘焙 300 次"
    },
    "perfect_50": {
        "id": "perfect_50",
        "category": "bake",
        "name": "匠人之心",
        "emoji": "💍",
        "desc": "制作出 50 个完美品质点心"
    },
    "bake_skill_50": {
        "id": "bake_skill_50",
        "category": "bake",
        "name": "面点师傅",
        "emoji": "🥖",
        "desc": "烘焙技能达到 50"
    },
    "bake_skill_100": {
        "id": "bake_skill_100",
        "category": "bake",
        "name": "烘焙宗师",
        "emoji": "🎓",
        "desc": "烘焙技能达到 100"
    },
    "cook_skill_50": {
        "id": "cook_skill_50",
        "category": "bake",
        "name": "厨艺精进",
        "emoji": "🍲",
        "desc": "烹饪熟练度达到 50"
    },
    "bake_500": {
        "id": "bake_500",
        "category": "bake",
        "name": "烘焙之神",
        "emoji": "🏅",
        "desc": "累计烘焙 500 次"
    },
    "perfect_100": {
        "id": "perfect_100",
        "category": "bake",
        "name": "完美百炼",
        "emoji": "💠",
        "desc": "制作出 100 个完美品质点心"
    },
    "recipe_20": {
        "id": "recipe_20",
        "category": "bake",
        "name": "菜谱收藏家",
        "emoji": "📚",
        "desc": "研发 20 种配方"
    },
    "cook_skill_80": {
        "id": "cook_skill_80",
        "category": "bake",
        "name": "灶台老手",
        "emoji": "🍳",
        "desc": "烹饪熟练度达到 80"
    },
    "cook_skill_100": {
        "id": "cook_skill_100",
        "category": "bake",
        "name": "厨神附体",
        "emoji": "🥘",
        "desc": "烹饪熟练度达到 100"
    },
    "custom_cake_1": {
        "id": "custom_cake_1",
        "category": "bake",
        "name": "心意定制",
        "emoji": "🎂",
        "desc": "制作第 1 个定制蛋糕"
    },
    "custom_cake_10": {
        "id": "custom_cake_10",
        "category": "bake",
        "name": "蛋糕艺术家",
        "emoji": "🧁",
        "desc": "累计制作 10 个定制蛋糕"
    },
    "earn_500": {
        "id": "earn_500",
        "category": "shop",
        "name": "第一桶金",
        "emoji": "🪙",
        "desc": "累计收入 500 金币"
    },
    "earn_5000": {
        "id": "earn_5000",
        "category": "shop",
        "name": "万元户",
        "emoji": "💰",
        "desc": "累计收入 5000 金币"
    },
    "earn_20000": {
        "id": "earn_20000",
        "category": "shop",
        "name": "大富翁",
        "emoji": "🏦",
        "desc": "累计收入 20000 金币"
    },
    "sold_10": {
        "id": "sold_10",
        "category": "shop",
        "name": "小有名气",
        "emoji": "🍰",
        "desc": "卖出 10 件点心"
    },
    "sold_50": {
        "id": "sold_50",
        "category": "shop",
        "name": "回头客",
        "emoji": "🤝",
        "desc": "卖出 50 件点心"
    },
    "sold_200": {
        "id": "sold_200",
        "category": "shop",
        "name": "门庭若市",
        "emoji": "🎉",
        "desc": "卖出 200 件点心"
    },
    "coin_1000": {
        "id": "coin_1000",
        "category": "shop",
        "name": "小有积蓄",
        "emoji": "🧧",
        "desc": "持有 1000 金币"
    },
    "coin_10000": {
        "id": "coin_10000",
        "category": "shop",
        "name": "富甲一方",
        "emoji": "🏝️",
        "desc": "持有 10000 金币"
    },
    "earn_50000": {
        "id": "earn_50000",
        "category": "shop",
        "name": "金碧辉煌",
        "emoji": "🏆",
        "desc": "累计收入 50000 金币"
    },
    "sold_500": {
        "id": "sold_500",
        "category": "shop",
        "name": "供不应求",
        "emoji": "🔥",
        "desc": "卖出 500 件点心"
    },
    "coin_50000": {
        "id": "coin_50000",
        "category": "shop",
        "name": "小镇首富",
        "emoji": "💎",
        "desc": "持有 50000 金币"
    },
    "employee_1": {
        "id": "employee_1",
        "category": "shop",
        "name": "开店帮手",
        "emoji": "👩‍🍳",
        "desc": "雇佣第 1 名员工"
    },
    "employee_3": {
        "id": "employee_3",
        "category": "shop",
        "name": "团队壮大",
        "emoji": "🧑‍🍳",
        "desc": "雇佣 3 名员工"
    },
    "upgrade_3": {
        "id": "upgrade_3",
        "category": "shop",
        "name": "店面升级",
        "emoji": "📈",
        "desc": "店铺升级到 Lv.3"
    },
    "upgrade_6": {
        "id": "upgrade_6",
        "category": "shop",
        "name": "豪华店面",
        "emoji": "🏬",
        "desc": "店铺升级到 Lv.6"
    },
    "earn_100000": {
        "id": "earn_100000",
        "category": "shop",
        "name": "百万甜心",
        "emoji": "🏰",
        "desc": "累计收入 100000 金币"
    },
    "sold_1000": {
        "id": "sold_1000",
        "category": "shop",
        "name": "千单达成",
        "emoji": "🚀",
        "desc": "卖出 1000 件点心"
    },
    "coin_100000": {
        "id": "coin_100000",
        "category": "shop",
        "name": "糖果巨富",
        "emoji": "👑",
        "desc": "持有 100000 金币"
    },
    "upgrade_10": {
        "id": "upgrade_10",
        "category": "shop",
        "name": "殿堂级店面",
        "emoji": "🏆",
        "desc": "店铺升级到满级 Lv.10"
    },
    "shelf_10": {
        "id": "shelf_10",
        "category": "shop",
        "name": "货架满满",
        "emoji": "🧺",
        "desc": "货架上同时摆上 10 件点心"
    },
    "shelf_20": {
        "id": "shelf_20",
        "category": "shop",
        "name": "琳琅满目",
        "emoji": "🗄️",
        "desc": "货架上同时摆上 20 件点心"
    },
    "employee_2": {
        "id": "employee_2",
        "category": "shop",
        "name": "双人成行",
        "emoji": "👥",
        "desc": "雇佣全部 2 名员工"
    },
    "truck_1": {
        "id": "truck_1",
        "category": "shop",
        "name": "移动美食家",
        "emoji": "🚚",
        "desc": "买下夜市餐车"
    },
    "explore_5": {
        "id": "explore_5",
        "category": "town",
        "name": "迈开脚步",
        "emoji": "🏃",
        "desc": "锻炼身体 5 次"
    },
    "explore_20": {
        "id": "explore_20",
        "category": "town",
        "name": "健康达人",
        "emoji": "💪",
        "desc": "锻炼身体 20 次"
    },
    "explore_50": {
        "id": "explore_50",
        "category": "town",
        "name": "运动健将",
        "emoji": "🥇",
        "desc": "锻炼身体 50 次"
    },
    "sport_50": {
        "id": "sport_50",
        "category": "town",
        "name": "身强体壮",
        "emoji": "🏋️",
        "desc": "运动技能达到 50"
    },
    "fish_1": {
        "id": "fish_1",
        "category": "town",
        "name": "河边初钓",
        "emoji": "🎣",
        "desc": "完成第一次钓鱼"
    },
    "fish_10": {
        "id": "fish_10",
        "category": "town",
        "name": "钓鱼高手",
        "emoji": "🐟",
        "desc": "累计钓鱼 10 次"
    },
    "loach_5": {
        "id": "loach_5",
        "category": "town",
        "name": "摸泥鳅小能手",
        "emoji": "🪱",
        "desc": "累计抓到 5 次泥鳅"
    },
    "day_10": {
        "id": "day_10",
        "category": "town",
        "name": "久居小镇",
        "emoji": "🏘️",
        "desc": "经营满 10 天"
    },
    "day_120": {
        "id": "day_120",
        "category": "town",
        "name": "四季轮回",
        "emoji": "🍃",
        "desc": "经营满 120 天，走过四季"
    },
    "day_30": {
        "id": "day_30",
        "category": "town",
        "name": "月满小镇",
        "emoji": "🌙",
        "desc": "经营满 30 天"
    },
    "day_365": {
        "id": "day_365",
        "category": "town",
        "name": "周年庆典",
        "emoji": "🎂",
        "desc": "经营满 365 天"
    },
    "bigfish_1": {
        "id": "bigfish_1",
        "category": "town",
        "name": "大鱼上钩",
        "emoji": "🐋",
        "desc": "钓到第一条大物（≥50cm）"
    },
    "bigfish_5": {
        "id": "bigfish_5",
        "category": "town",
        "name": "钓鱼传奇",
        "emoji": "🏅",
        "desc": "累计钓到 5 条大物"
    },
    "met_10": {
        "id": "met_10",
        "category": "town",
        "name": "广结善缘",
        "emoji": "🧑‍🤝‍🧑",
        "desc": "认识 10 位伙伴"
    },
    "met_25": {
        "id": "met_25",
        "category": "town",
        "name": "小镇名人",
        "emoji": "⭐",
        "desc": "认识 25 位伙伴"
    },
    "shelter_50": {
        "id": "shelter_50",
        "category": "town",
        "name": "收容所之友",
        "emoji": "🐾",
        "desc": "收容所友好度达到 50"
    },
    "shelter_150": {
        "id": "shelter_150",
        "category": "town",
        "name": "暖心天使",
        "emoji": "🕊️",
        "desc": "收容所友好度达到 150"
    },
    "bank_1000": {
        "id": "bank_1000",
        "category": "town",
        "name": "存钱罐",
        "emoji": "🏦",
        "desc": "银行存款达到 1000"
    },
    "fest_3": {
        "id": "fest_3",
        "category": "town",
        "name": "节庆收藏家",
        "emoji": "🎐",
        "desc": "获得 3 件节日纪念品"
    },
    "star_10": {
        "id": "star_10",
        "category": "town",
        "name": "星空守望者",
        "emoji": "🌌",
        "desc": "点亮 10 颗星星"
    },
    "sew_1": {
        "id": "sew_1",
        "category": "town",
        "name": "针线初体验",
        "emoji": "🪡",
        "desc": "亲手缝制第 1 件衣服"
    },
    "sew_5": {
        "id": "sew_5",
        "category": "town",
        "name": "缝纫巧手",
        "emoji": "🧵",
        "desc": "亲手缝制 5 件衣服"
    },
    "exercise_100": {
        "id": "exercise_100",
        "category": "town",
        "name": "百炼成钢",
        "emoji": "🏆",
        "desc": "锻炼身体 100 次"
    },
    "sport_100": {
        "id": "sport_100",
        "category": "town",
        "name": "运动满级",
        "emoji": "💯",
        "desc": "运动技能达到 100"
    },
    "fish_30": {
        "id": "fish_30",
        "category": "town",
        "name": "垂钓常客",
        "emoji": "🎏",
        "desc": "累计钓鱼 30 次"
    },
    "fish_50": {
        "id": "fish_50",
        "category": "town",
        "name": "河边传说",
        "emoji": "🐠",
        "desc": "累计钓鱼 50 次"
    },
    "loach_20": {
        "id": "loach_20",
        "category": "town",
        "name": "摸鱼大师",
        "emoji": "🪱",
        "desc": "累计抓到 20 次泥鳅"
    },
    "bigfish_10": {
        "id": "bigfish_10",
        "category": "town",
        "name": "大物猎手",
        "emoji": "🐳",
        "desc": "累计钓到 10 条大物"
    },
    "fishdex_10": {
        "id": "fishdex_10",
        "category": "town",
        "name": "图鉴入门",
        "emoji": "🐡",
        "desc": "鱼类图鉴收录 10 种"
    },
    "fishdex_25": {
        "id": "fishdex_25",
        "category": "town",
        "name": "水产行家",
        "emoji": "🐟",
        "desc": "鱼类图鉴收录 25 种"
    },
    "met_40": {
        "id": "met_40",
        "category": "town",
        "name": "小镇社交王",
        "emoji": "🏙️",
        "desc": "认识 40 位伙伴"
    },
    "shelter_200": {
        "id": "shelter_200",
        "category": "town",
        "name": "毛孩子守护神",
        "emoji": "🐕",
        "desc": "收容所友好度达到 200"
    },
    "bank_5000": {
        "id": "bank_5000",
        "category": "town",
        "name": "理财新星",
        "emoji": "🏦",
        "desc": "银行存款达到 5000"
    },
    "bank_20000": {
        "id": "bank_20000",
        "category": "town",
        "name": "存款大户",
        "emoji": "💰",
        "desc": "银行存款达到 20000"
    },
    "fest_6": {
        "id": "fest_6",
        "category": "town",
        "name": "节日收藏家",
        "emoji": "🎑",
        "desc": "获得 6 件节日纪念品"
    },
    "fest_10": {
        "id": "fest_10",
        "category": "town",
        "name": "节庆全勤王",
        "emoji": "🏮",
        "desc": "获得 10 件节日纪念品"
    },
    "star_all": {
        "id": "star_all",
        "category": "town",
        "name": "银河漫游者",
        "emoji": "🌌",
        "desc": "点亮全部 12 颗星星"
    },
    "sew_10": {
        "id": "sew_10",
        "category": "town",
        "name": "裁缝铺老板",
        "emoji": "🧵",
        "desc": "亲手缝制 10 件衣服"
    },
    "sewing_skill_50": {
        "id": "sewing_skill_50",
        "category": "town",
        "name": "缝纫学徒",
        "emoji": "✂️",
        "desc": "缝纫技能达到 50"
    },
    "sewing_skill_100": {
        "id": "sewing_skill_100",
        "category": "town",
        "name": "国手裁缝",
        "emoji": "🧶",
        "desc": "缝纫技能达到 100"
    },
    "tool_skill_100": {
        "id": "tool_skill_100",
        "category": "town",
        "name": "工具大师",
        "emoji": "🔧",
        "desc": "工具熟练度达到 100"
    },
    "material_100": {
        "id": "material_100",
        "category": "town",
        "name": "材料通",
        "emoji": "📚",
        "desc": "材料理解度达到 100"
    },
    "furniture_10": {
        "id": "furniture_10",
        "category": "town",
        "name": "装修大师",
        "emoji": "👑",
        "desc": "家具等级升到 Lv.10"
    },
    "craft_1": {
        "id": "craft_1",
        "category": "town",
        "name": "木工初体验",
        "emoji": "🛋️",
        "desc": "亲手制作第 1 件家具"
    },
    "craft_10": {
        "id": "craft_10",
        "category": "town",
        "name": "匠人作坊",
        "emoji": "🛏️",
        "desc": "亲手制作 10 件家具"
    },
    "books_5": {
        "id": "books_5",
        "category": "town",
        "name": "书虫初长成",
        "emoji": "📖",
        "desc": "读完 5 本书"
    },
    "books_20": {
        "id": "books_20",
        "category": "town",
        "name": "博览群书",
        "emoji": "📚",
        "desc": "读完 20 本书"
    },
    "flowers_10": {
        "id": "flowers_10",
        "category": "town",
        "name": "花满阳台",
        "emoji": "🌸",
        "desc": "累计收获 10 束鲜花"
    },
    "bonsai_1": {
        "id": "bonsai_1",
        "category": "town",
        "name": "方寸山水",
        "emoji": "🪴",
        "desc": "收获第 1 盆盆景"
    },
    "aquarium_1": {
        "id": "aquarium_1",
        "category": "town",
        "name": "金鱼入缸",
        "emoji": "🐠",
        "desc": "在水族缸里养起第一条金鱼"
    },
    "aquarium_decor": {
        "id": "aquarium_decor",
        "category": "town",
        "name": "水底乐园",
        "emoji": "🧸",
        "desc": "水族缸布置 3 件装饰"
    },
    "vehicles_3": {
        "id": "vehicles_3",
        "category": "town",
        "name": "出行自由",
        "emoji": "🚗",
        "desc": "集齐公交卡、小三轮与私家车"
    },
    "health_100": {
        "id": "health_100",
        "category": "town",
        "name": "元气满满",
        "emoji": "💖",
        "desc": "健康值达到 100"
    },
    "aff_20": {
        "id": "aff_20",
        "category": "fate",
        "name": "初次相识",
        "emoji": "🤝",
        "desc": "与任一伙伴好感度达到 20"
    },
    "aff_50": {
        "id": "aff_50",
        "category": "fate",
        "name": "好朋友",
        "emoji": "💛",
        "desc": "与任一伙伴好感度达到 50"
    },
    "aff_80": {
        "id": "aff_80",
        "category": "fate",
        "name": "挚友",
        "emoji": "💖",
        "desc": "与任一伙伴好感度达到 80"
    },
    "date_1": {
        "id": "date_1",
        "category": "fate",
        "name": "甜蜜约会",
        "emoji": "🌙",
        "desc": "完成第 1 次约会"
    },
    "date_10": {
        "id": "date_10",
        "category": "fate",
        "name": "情投意合",
        "emoji": "💘",
        "desc": "累计约会 10 次"
    },
    "gift_10": {
        "id": "gift_10",
        "category": "fate",
        "name": "送礼达人",
        "emoji": "🎁",
        "desc": "累计送礼 10 次"
    },
    "aff_100": {
        "id": "aff_100",
        "category": "fate",
        "name": "知己知彼",
        "emoji": "💞",
        "desc": "与任一伙伴好感度达到 100"
    },
    "friend_3": {
        "id": "friend_3",
        "category": "fate",
        "name": "朋友圈",
        "emoji": "👫",
        "desc": "与 3 位伙伴好感度达到 50"
    },
    "gift_50": {
        "id": "gift_50",
        "category": "fate",
        "name": "慷慨大方",
        "emoji": "🎀",
        "desc": "累计送礼 50 次"
    },
    "date_30": {
        "id": "date_30",
        "category": "fate",
        "name": "两情相悦",
        "emoji": "💑",
        "desc": "累计约会 30 次"
    },
    "chat_100": {
        "id": "chat_100",
        "category": "fate",
        "name": "谈天说地",
        "emoji": "💬",
        "desc": "累计聊天 100 次"
    },
    "chat_500": {
        "id": "chat_500",
        "category": "fate",
        "name": "话痨之王",
        "emoji": "🗣️",
        "desc": "累计聊天 500 次"
    },
    "aff_120": {
        "id": "aff_120",
        "category": "fate",
        "name": "亲密无间",
        "emoji": "💗",
        "desc": "与任一伙伴好感度达到 120"
    },
    "aff_150": {
        "id": "aff_150",
        "category": "fate",
        "name": "此生不渝",
        "emoji": "❤️",
        "desc": "与任一伙伴好感度达到 150"
    },
    "friend_5": {
        "id": "friend_5",
        "category": "fate",
        "name": "好友满堂",
        "emoji": "👯",
        "desc": "与 5 位伙伴好感度达到 50"
    },
    "friend_80_3": {
        "id": "friend_80_3",
        "category": "fate",
        "name": "知心小圈",
        "emoji": "💝",
        "desc": "与 3 位伙伴好感度达到 80"
    },
    "gift_100": {
        "id": "gift_100",
        "category": "fate",
        "name": "赠礼大师",
        "emoji": "🎁",
        "desc": "累计送礼 100 次"
    },
    "chat_1000": {
        "id": "chat_1000",
        "category": "fate",
        "name": "小镇社牛",
        "emoji": "🗨️",
        "desc": "累计聊天 1000 次"
    },
    "date_50": {
        "id": "date_50",
        "category": "fate",
        "name": "白头之约",
        "emoji": "💒",
        "desc": "累计约会 50 次"
    }
};
    window.Cake.MILESTONES_NEW = {
    "m_open": {
        "id": "m_open",
        "name": "开业大吉",
        "emoji": "🎊",
        "desc": "顺利开张营业",
        "rewards": [
            {
                "type": "coins",
                "amount": 200
            }
        ]
    },
    "m_bake": {
        "id": "m_bake",
        "name": "熟练烘焙",
        "emoji": "🥖",
        "desc": "累计烘焙 30 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 300
            },
            {
                "type": "ingredient",
                "ingId": "butter",
                "amount": 5
            }
        ]
    },
    "m_earn": {
        "id": "m_earn",
        "name": "财富积累",
        "emoji": "💰",
        "desc": "累计收入 3000 金币",
        "rewards": [
            {
                "type": "coins",
                "amount": 500
            }
        ]
    },
    "m_recipe": {
        "id": "m_recipe",
        "name": "研发先锋",
        "emoji": "🔬",
        "desc": "研发 6 种配方",
        "rewards": [
            {
                "type": "coins",
                "amount": 400
            },
            {
                "type": "ingredient",
                "ingId": "chocolate",
                "amount": 5
            }
        ]
    },
    "m_explore": {
        "id": "m_explore",
        "name": "活力满满",
        "emoji": "🏃",
        "desc": "锻炼身体 30 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 300
            },
            {
                "type": "ingredient",
                "ingId": "honey",
                "amount": 3
            }
        ]
    },
    "m_date": {
        "id": "m_date",
        "name": "甜蜜时光",
        "emoji": "💕",
        "desc": "累计约会 5 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 200
            },
            {
                "type": "ingredient",
                "ingId": "cream",
                "amount": 3
            }
        ]
    },
    "m_perfect": {
        "id": "m_perfect",
        "name": "完美大师",
        "emoji": "✨",
        "desc": "制作出 30 个完美品质点心",
        "rewards": [
            {
                "type": "coins",
                "amount": 500
            },
            {
                "type": "ingredient",
                "ingId": "strawberry",
                "amount": 5
            }
        ]
    },
    "m_year": {
        "id": "m_year",
        "name": "四季之主",
        "emoji": "🏅",
        "desc": "经营满 120 天，走过完整四季",
        "rewards": [
            {
                "type": "coins",
                "amount": 1000
            },
            {
                "type": "ingredient",
                "ingId": "matcha",
                "amount": 5
            }
        ]
    },
    "m_sold": {
        "id": "m_sold",
        "name": "人气小店",
        "emoji": "🍰",
        "desc": "累计卖出 300 件点心",
        "rewards": [
            {
                "type": "coins",
                "amount": 600
            },
            {
                "type": "ingredient",
                "ingId": "cream",
                "amount": 5
            }
        ]
    },
    "m_fish": {
        "id": "m_fish",
        "name": "垂钓能手",
        "emoji": "🎣",
        "desc": "累计钓鱼 20 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 400
            },
            {
                "type": "ingredient",
                "ingId": "honey",
                "amount": 3
            }
        ]
    },
    "m_furniture": {
        "id": "m_furniture",
        "name": "家装达人",
        "emoji": "🛋️",
        "desc": "家具等级升到 Lv.5",
        "rewards": [
            {
                "type": "coins",
                "amount": 800
            }
        ]
    },
    "m_aff": {
        "id": "m_aff",
        "name": "心意相通",
        "emoji": "💖",
        "desc": "与任一伙伴好感度达到 100",
        "rewards": [
            {
                "type": "coins",
                "amount": 500
            },
            {
                "type": "ingredient",
                "ingId": "strawberry",
                "amount": 5
            }
        ]
    },
    "m_earn2": {
        "id": "m_earn2",
        "name": "财富进阶",
        "emoji": "🤑",
        "desc": "累计收入达到 10000 金币",
        "rewards": [
            {
                "type": "coins",
                "amount": 1000
            },
            {
                "type": "ingredient",
                "ingId": "eggs",
                "amount": 5
            }
        ]
    },
    "m_sold2": {
        "id": "m_sold2",
        "name": "销量百件",
        "emoji": "🎂",
        "desc": "累计卖出 100 件点心",
        "rewards": [
            {
                "type": "coins",
                "amount": 600
            },
            {
                "type": "ingredient",
                "ingId": "sugar",
                "amount": 5
            }
        ]
    },
    "m_bake2": {
        "id": "m_bake2",
        "name": "烘焙大师",
        "emoji": "🥐",
        "desc": "累计烘焙 100 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 800
            },
            {
                "type": "ingredient",
                "ingId": "milk",
                "amount": 5
            }
        ]
    },
    "m_perfect2": {
        "id": "m_perfect2",
        "name": "完美宗师",
        "emoji": "🌟",
        "desc": "制作出 100 个完美品质点心",
        "rewards": [
            {
                "type": "coins",
                "amount": 1000
            },
            {
                "type": "ingredient",
                "ingId": "mango",
                "amount": 5
            }
        ]
    },
    "m_chat": {
        "id": "m_chat",
        "name": "谈笑风生",
        "emoji": "💬",
        "desc": "累计聊天 50 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 500
            },
            {
                "type": "ingredient",
                "ingId": "coffee_bean",
                "amount": 3
            }
        ]
    },
    "m_gift": {
        "id": "m_gift",
        "name": "送礼高手",
        "emoji": "🎁",
        "desc": "累计送出礼物 20 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 500
            },
            {
                "type": "ingredient",
                "ingId": "cheese",
                "amount": 3
            }
        ]
    },
    "m_date2": {
        "id": "m_date2",
        "name": "热恋进行时",
        "emoji": "🌹",
        "desc": "累计约会 15 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 800
            },
            {
                "type": "ingredient",
                "ingId": "peach",
                "amount": 5
            }
        ]
    },
    "m_fish2": {
        "id": "m_fish2",
        "name": "钓鱼大师",
        "emoji": "🐠",
        "desc": "累计钓鱼 50 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 800
            },
            {
                "type": "ingredient",
                "ingId": "blueberry",
                "amount": 5
            }
        ]
    },
    "m_bigfish": {
        "id": "m_bigfish",
        "name": "大物猎人",
        "emoji": "🏆",
        "desc": "钓到 5 条大物（≥50cm）",
        "rewards": [
            {
                "type": "coins",
                "amount": 600
            },
            {
                "type": "ingredient",
                "ingId": "matcha",
                "amount": 5
            }
        ]
    },
    "m_loach": {
        "id": "m_loach",
        "name": "摸鱼大王",
        "emoji": "🪱",
        "desc": "抓到 20 条泥鳅",
        "rewards": [
            {
                "type": "coins",
                "amount": 400
            },
            {
                "type": "ingredient",
                "ingId": "honey",
                "amount": 3
            }
        ]
    },
    "m_exercise2": {
        "id": "m_exercise2",
        "name": "健身达人",
        "emoji": "💪",
        "desc": "累计锻炼身体 100 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 700
            },
            {
                "type": "ingredient",
                "ingId": "tomato",
                "amount": 5
            }
        ]
    },
    "m_explore2": {
        "id": "m_explore2",
        "name": "小镇探险家",
        "emoji": "🗺️",
        "desc": "累计外出探索 30 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 500
            },
            {
                "type": "ingredient",
                "ingId": "apple",
                "amount": 5
            }
        ]
    },
    "m_clean": {
        "id": "m_clean",
        "name": "清洁标兵",
        "emoji": "🧹",
        "desc": "累计打扫整理 30 次",
        "rewards": [
            {
                "type": "coins",
                "amount": 400
            },
            {
                "type": "ingredient",
                "ingId": "lemon",
                "amount": 3
            }
        ]
    },
    "m_maxcoins": {
        "id": "m_maxcoins",
        "name": "日进斗金",
        "emoji": "👑",
        "desc": "单日持有金币达到 5000",
        "rewards": [
            {
                "type": "coins",
                "amount": 1000
            },
            {
                "type": "ingredient",
                "ingId": "cheese",
                "amount": 5
            }
        ]
    },
    "m_aff3": {
        "id": "m_aff3",
        "name": "情谊满园",
        "emoji": "💝",
        "desc": "有 3 位伙伴好感度达到 100",
        "rewards": [
            {
                "type": "coins",
                "amount": 800
            },
            {
                "type": "ingredient",
                "ingId": "strawberry",
                "amount": 5
            }
        ]
    },
    "m_recipe2": {
        "id": "m_recipe2",
        "name": "研发大师",
        "emoji": "📚",
        "desc": "研发 12 种配方",
        "rewards": [
            {
                "type": "coins",
                "amount": 1000
            },
            {
                "type": "ingredient",
                "ingId": "coffee_bean",
                "amount": 5
            }
        ]
    },
    "m_furniture2": {
        "id": "m_furniture2",
        "name": "豪华宅邸",
        "emoji": "🏰",
        "desc": "家具等级升到 Lv.10",
        "rewards": [
            {
                "type": "coins",
                "amount": 1500
            },
            {
                "type": "ingredient",
                "ingId": "coconut",
                "amount": 5
            }
        ]
    },
    "m_year2": {
        "id": "m_year2",
        "name": "周年庆典",
        "emoji": "🎆",
        "desc": "经营满 365 天",
        "rewards": [
            {
                "type": "coins",
                "amount": 2000
            },
            {
                "type": "ingredient",
                "ingId": "red_bean",
                "amount": 5
            }
        ]
    }
};
})();
