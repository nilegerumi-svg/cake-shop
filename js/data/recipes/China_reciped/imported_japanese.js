// js/data/recipes/China_reciped/imported_japanese.js（菜系：japanese，共 6 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["curry_rice"] = {
        "name": "日式咖喱饭",
        "skill": "cook",
        "cuisine": "japanese",
        "size": "medium",
        "energy": 12,
        "ing": {
            "curry": 1,
            "potato": 2,
            "onion": 2,
            "meat": 2
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
            "key": "curry_rice",
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

    window.Cake.RECIPES_CHINA_IMPORTED["katsu"] = {
        "name": "日式炸猪排",
        "skill": "cook",
        "cuisine": "japanese",
        "size": "medium",
        "energy": 12,
        "ing": {
            "meat": 2,
            "flour_low": 2,
            "chicken_egg": 1,
            "oil": 1
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
            "key": "katsu",
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

    window.Cake.RECIPES_CHINA_IMPORTED["miso_soup"] = {
        "name": "味噌汤",
        "skill": "cook",
        "cuisine": "japanese",
        "size": "small",
        "energy": 6,
        "ing": {
            "tofu": 1,
            "kelp": 1,
            "scallion": 1,
            "soy_sauce_light": 1
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
            "key": "miso_soup",
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

    window.Cake.RECIPES_CHINA_IMPORTED["oden"] = {
        "name": "关东煮",
        "skill": "cook",
        "cuisine": "japanese",
        "size": "small",
        "energy": 6,
        "ing": {
            "tofu": 2,
            "kelp": 1,
            "sausage": 1,
            "potato": 1,
            "soy_sauce_light": 1
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
            "key": "oden",
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

    window.Cake.RECIPES_CHINA_IMPORTED["sushi_roll"] = {
        "name": "玉子寿司卷",
        "skill": "cook",
        "cuisine": "japanese",
        "size": "small",
        "energy": 6,
        "ing": {
            "japonica_rice": 2,
            "crucian": 1,
            "kelp": 1,
            "vinegar": 1
        },
        "tools": [],
        "qualityReq": {
            "minIngredientQuality": 40,
            "minSkillLevel": 1,
            "minRecipeProf": 2,
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "sushi_roll",
            "attrs": {
                "flavor": {
                    "sour": 60
                },
                "texture": {
                    "tender": 30
                }
            }
        }
    };

    window.Cake.RECIPES_CHINA_IMPORTED["tempura"] = {
        "name": "天妇罗拼盘",
        "skill": "cook",
        "cuisine": "japanese",
        "size": "medium",
        "energy": 12,
        "ing": {
            "shrimp": 2,
            "flour_low": 2,
            "chicken_egg": 1,
            "oil": 1
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
            "key": "tempura",
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
})();
