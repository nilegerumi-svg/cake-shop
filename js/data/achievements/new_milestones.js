// js/data/achievements/new_milestones.js（里程碑奖励）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.MILESTONES_NEW = window.Cake.MILESTONES_NEW || {};

    window.Cake.MILESTONES_NEW["m_open"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_bake"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_earn"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_recipe"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_explore"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_date"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_perfect"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_year"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_sold"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_fish"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_furniture"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_aff"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_earn2"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_sold2"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_bake2"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_perfect2"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_chat"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_gift"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_date2"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_fish2"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_bigfish"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_loach"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_exercise2"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_explore2"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_clean"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_maxcoins"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_aff3"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_recipe2"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_furniture2"] = {
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
    };

    window.Cake.MILESTONES_NEW["m_year2"] = {
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
    };
})();
