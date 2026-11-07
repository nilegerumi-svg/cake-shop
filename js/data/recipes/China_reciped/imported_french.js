// js/data/recipes/China_reciped/imported_french.js（菜系：french，共 5 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["beef_bourguignon"] = {
        "name": "红酒炖牛肉",
        "skill": "cook",
        "cuisine": "french",
        "size": "large",
        "energy": 18,
        "ing": {
            "meat": 3,
            "cooking_wine": 1,
            "onion": 2,
            "carrot": 2,
            "potato": 2
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
            "perfectTools": [
                "claypot"
            ]
        },
        "output": {
            "type": "food",
            "key": "beef_bourguignon",
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

    window.Cake.RECIPES_CHINA_IMPORTED["french_crepe"] = {
        "name": "法式可丽饼",
        "skill": "cook",
        "cuisine": "french",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "milk": 2,
            "chicken_egg": 1,
            "honey": 1
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
            "key": "french_crepe",
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

    window.Cake.RECIPES_CHINA_IMPORTED["french_escargot"] = {
        "name": "法式烤蜗牛",
        "skill": "cook",
        "cuisine": "french",
        "size": "small",
        "energy": 6,
        "ing": {
            "garlic": 2,
            "butter": 2,
            "basil": 1
        },
        "tools": [
            {
                "tech": "bake",
                "role": "required"
            }
        ],
        "qualityReq": {
            "minIngredientQuality": 40,
            "minSkillLevel": 1,
            "minRecipeProf": 2,
            "perfectTools": [
                "oven_pro"
            ]
        },
        "output": {
            "type": "food",
            "key": "french_escargot",
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

    window.Cake.RECIPES_CHINA_IMPORTED["french_onion_soup"] = {
        "name": "法式洋葱汤",
        "skill": "cook",
        "cuisine": "french",
        "size": "medium",
        "energy": 12,
        "ing": {
            "onion": 3,
            "cheese": 1,
            "butter": 1,
            "flour_low": 1
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
            "key": "french_onion_soup",
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

    window.Cake.RECIPES_CHINA_IMPORTED["provencal_ratatouille"] = {
        "name": "普罗旺斯炖菜",
        "skill": "cook",
        "cuisine": "french",
        "size": "medium",
        "energy": 12,
        "ing": {
            "tomato": 3,
            "onion": 1,
            "garlic": 1,
            "basil": 1,
            "potato": 2
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
            "key": "provencal_ratatouille",
            "attrs": {
                "flavor": {
                    "sweet": 40,
                    "sour": 30
                },
                "texture": {
                    "tender": 30,
                    "smooth": 30
                }
            }
        }
    };
})();
