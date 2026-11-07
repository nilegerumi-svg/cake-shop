// js/data/recipes/China_reciped/imported_korean.js（菜系：korean，共 5 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["army_stew"] = {
        "name": "部队锅",
        "skill": "cook",
        "cuisine": "korean",
        "size": "large",
        "energy": 18,
        "ing": {
            "sausage": 2,
            "bacon": 1,
            "kimchi": 2,
            "tofu": 1,
            "pasta": 1
        },
        "tools": [
            {
                "tech": "stew",
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
            "key": "army_stew",
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

    window.Cake.RECIPES_CHINA_IMPORTED["bibimbap"] = {
        "name": "石锅拌饭",
        "skill": "cook",
        "cuisine": "korean",
        "size": "medium",
        "energy": 12,
        "ing": {
            "japonica_rice": 2,
            "meat": 1,
            "chicken_egg": 1,
            "carrot": 1,
            "kimchi": 1
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
            "key": "bibimbap",
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

    window.Cake.RECIPES_CHINA_IMPORTED["kimchi_fried_rice"] = {
        "name": "泡菜炒饭",
        "skill": "cook",
        "cuisine": "korean",
        "size": "medium",
        "energy": 12,
        "ing": {
            "japonica_rice": 2,
            "kimchi": 2,
            "bacon": 1,
            "scallion": 1
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
            "key": "kimchi_fried_rice",
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

    window.Cake.RECIPES_CHINA_IMPORTED["korean_fried_chicken"] = {
        "name": "韩式炸鸡",
        "skill": "cook",
        "cuisine": "korean",
        "size": "medium",
        "energy": 12,
        "ing": {
            "chicken": 2,
            "flour_low": 2,
            "chili": 1,
            "sugar": 1
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
            "key": "korean_fried_chicken",
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

    window.Cake.RECIPES_CHINA_IMPORTED["naengmyeon"] = {
        "name": "韩式冷面",
        "skill": "cook",
        "cuisine": "korean",
        "size": "medium",
        "energy": 12,
        "ing": {
            "pasta": 2,
            "chicken_egg": 1,
            "kimchi": 1,
            "vinegar": 1,
            "cucumber": 1
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
            "key": "naengmyeon",
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
})();
