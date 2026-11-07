// js/data/recipes/China_reciped/imported_american.js（菜系：american，共 6 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["bbq_ribs"] = {
        "name": "烧烤肋排",
        "skill": "cook",
        "cuisine": "american",
        "size": "large",
        "energy": 18,
        "ing": {
            "meat": 3,
            "honey": 2,
            "chili": 1,
            "garlic": 1
        },
        "tools": [
            {
                "tech": "roast",
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
            "key": "bbq_ribs",
            "attrs": {
                "flavor": {
                    "sweet": 70
                },
                "texture": {
                    "smooth": 40
                }
            }
        }
    };

    window.Cake.RECIPES_CHINA_IMPORTED["burger"] = {
        "name": "香煎汉堡",
        "skill": "cook",
        "cuisine": "american",
        "size": "medium",
        "energy": 12,
        "ing": {
            "flour_low": 2,
            "meat": 2,
            "cheese": 2,
            "tomato": 2
        },
        "tools": [
            {
                "tech": "stirfry",
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
            "key": "burger",
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

    window.Cake.RECIPES_CHINA_IMPORTED["cheeseburger"] = {
        "name": "芝士汉堡",
        "skill": "cook",
        "cuisine": "american",
        "size": "medium",
        "energy": 12,
        "ing": {
            "meat": 2,
            "flour_low": 2,
            "cheese": 1,
            "tomato": 1
        },
        "tools": [
            {
                "tech": "stirfry",
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
            "key": "cheeseburger",
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

    window.Cake.RECIPES_CHINA_IMPORTED["corn_chowder"] = {
        "name": "玉米浓汤",
        "skill": "cook",
        "cuisine": "american",
        "size": "small",
        "energy": 6,
        "ing": {
            "corn": 2,
            "cream": 1,
            "milk": 1,
            "potato": 1
        },
        "tools": [
            {
                "tech": "stew",
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
            "key": "corn_chowder",
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

    window.Cake.RECIPES_CHINA_IMPORTED["fries"] = {
        "name": "黄金薯条",
        "skill": "cook",
        "cuisine": "american",
        "size": "small",
        "energy": 6,
        "ing": {
            "potato": 3,
            "oil": 1
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
            "key": "fries",
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

    window.Cake.RECIPES_CHINA_IMPORTED["grilled_steak"] = {
        "name": "香烤牛排",
        "skill": "cook",
        "cuisine": "american",
        "size": "large",
        "energy": 18,
        "ing": {
            "meat": 3,
            "butter": 1,
            "sichuan_pepper": 1,
            "garlic": 1
        },
        "tools": [
            {
                "tech": "roast",
                "role": "required"
            }
        ],
        "qualityReq": {
            "minIngredientQuality": 60,
            "minSkillLevel": 3,
            "minRecipeProf": 6,
            "perfectTools": [
                "roast_oven"
            ]
        },
        "output": {
            "type": "food",
            "key": "grilled_steak",
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
