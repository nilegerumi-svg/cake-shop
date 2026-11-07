// js/data/recipes/China_reciped/imported_indian.js（菜系：indian，共 5 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["aloo_masala"] = {
        "name": "玛萨拉土豆",
        "skill": "cook",
        "cuisine": "indian",
        "size": "small",
        "energy": 6,
        "ing": {
            "potato": 3,
            "tomato": 2,
            "curry": 1,
            "onion": 1,
            "garlic": 1
        },
        "tools": [
            {
                "tech": "stirfry",
                "role": "required"
            }
        ],
        "qualityReq": {
            "minIngredientQuality": 40,
            "minSkillLevel": 1,
            "minRecipeProf": 2,
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "aloo_masala",
            "attrs": {
                "flavor": {
                    "umami": 50,
                    "salty": 30
                },
                "texture": {
                    "tender": 40
                }
            }
        }
    };

    window.Cake.RECIPES_CHINA_IMPORTED["biryani"] = {
        "name": "印度香饭",
        "skill": "cook",
        "cuisine": "indian",
        "size": "large",
        "energy": 18,
        "ing": {
            "japonica_rice": 2,
            "chicken": 2,
            "yogurt": 1,
            "onion": 1,
            "garlic": 1
        },
        "tools": [
            {
                "tech": "braise",
                "role": "required"
            }
        ],
        "qualityReq": {
            "minIngredientQuality": 60,
            "minSkillLevel": 3,
            "minRecipeProf": 6,
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "biryani",
            "attrs": {
                "flavor": {
                    "umami": 50,
                    "salty": 30
                },
                "texture": {
                    "tender": 40
                }
            }
        }
    };

    window.Cake.RECIPES_CHINA_IMPORTED["butter_chicken"] = {
        "name": "黄油咖喱鸡",
        "skill": "cook",
        "cuisine": "indian",
        "size": "medium",
        "energy": 12,
        "ing": {
            "chicken": 2,
            "yogurt": 1,
            "cream": 1,
            "butter": 1,
            "curry": 1
        },
        "tools": [
            {
                "tech": "stew",
                "role": "required"
            }
        ],
        "qualityReq": {
            "minIngredientQuality": 50,
            "minSkillLevel": 2,
            "minRecipeProf": 4,
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "butter_chicken",
            "attrs": {
                "flavor": {
                    "sweet": 30,
                    "umami": 20
                },
                "texture": {
                    "smooth": 60,
                    "fatty": 20
                }
            }
        }
    };

    window.Cake.RECIPES_CHINA_IMPORTED["naan"] = {
        "name": "印度烤饼",
        "skill": "cook",
        "cuisine": "indian",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "yogurt": 1,
            "butter": 1
        },
        "tools": [
            {
                "tech": "roast",
                "role": "required"
            }
        ],
        "qualityReq": {
            "minIngredientQuality": 40,
            "minSkillLevel": 1,
            "minRecipeProf": 2,
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "naan",
            "attrs": {
                "flavor": {
                    "umami": 50,
                    "salty": 30
                },
                "texture": {
                    "tender": 40
                }
            }
        }
    };

    window.Cake.RECIPES_CHINA_IMPORTED["tandoori_chicken"] = {
        "name": "坦都里烤鸡",
        "skill": "cook",
        "cuisine": "indian",
        "size": "medium",
        "energy": 12,
        "ing": {
            "chicken": 2,
            "yogurt": 1,
            "chili": 1,
            "ginger": 1,
            "garlic": 1
        },
        "tools": [
            {
                "tech": "roast",
                "role": "required"
            }
        ],
        "qualityReq": {
            "minIngredientQuality": 50,
            "minSkillLevel": 2,
            "minRecipeProf": 4,
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "tandoori_chicken",
            "attrs": {
                "flavor": {
                    "umami": 50,
                    "salty": 30
                },
                "texture": {
                    "tender": 40
                }
            }
        }
    };
})();
