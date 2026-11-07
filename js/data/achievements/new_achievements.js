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
