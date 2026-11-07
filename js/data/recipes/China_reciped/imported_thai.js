// js/data/recipes/China_reciped/imported_thai.js（菜系：thai，共 5 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["green_curry"] = {
        "name": "绿咖喱鸡",
        "skill": "cook",
        "cuisine": "thai",
        "size": "medium",
        "energy": 12,
        "ing": {
            "chicken": 2,
            "coconut_milk": 2,
            "lemongrass": 1,
            "chili": 1,
            "basil": 1
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
            "key": "green_curry",
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

    window.Cake.RECIPES_CHINA_IMPORTED["mango_sticky_rice"] = {
        "name": "芒果糯米饭",
        "skill": "cook",
        "cuisine": "thai",
        "size": "small",
        "energy": 6,
        "ing": {
            "japonica_rice": 2,
            "mango": 2,
            "coconut_milk": 1,
            "sugar": 1
        },
        "tools": [
            {
                "tech": "steam",
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
            "key": "mango_sticky_rice",
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

    window.Cake.RECIPES_CHINA_IMPORTED["pad_thai"] = {
        "name": "泰式炒河粉",
        "skill": "cook",
        "cuisine": "thai",
        "size": "medium",
        "energy": 12,
        "ing": {
            "rice_noodle": 2,
            "shrimp": 2,
            "chicken_egg": 1,
            "lime": 1,
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
            "key": "pad_thai",
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

    window.Cake.RECIPES_CHINA_IMPORTED["pineapple_fried_rice"] = {
        "name": "泰式菠萝炒饭",
        "skill": "cook",
        "cuisine": "thai",
        "size": "medium",
        "energy": 12,
        "ing": {
            "japonica_rice": 2,
            "shrimp": 1,
            "pineapple": 2,
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
            "key": "pineapple_fried_rice",
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

    window.Cake.RECIPES_CHINA_IMPORTED["tom_yum"] = {
        "name": "冬阴功汤",
        "skill": "cook",
        "cuisine": "thai",
        "size": "medium",
        "energy": 12,
        "ing": {
            "shrimp": 2,
            "chili": 2,
            "lemon": 1,
            "onion": 1,
            "kelp": 1
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
            "key": "tom_yum",
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
