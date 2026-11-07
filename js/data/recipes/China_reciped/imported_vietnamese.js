// js/data/recipes/China_reciped/imported_vietnamese.js（菜系：vietnamese，共 5 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["banh_mi"] = {
        "name": "越南法棍",
        "skill": "cook",
        "cuisine": "vietnamese",
        "size": "medium",
        "energy": 12,
        "ing": {
            "flour_low": 2,
            "meat": 1,
            "carrot": 1,
            "cabbage": 1,
            "butter": 1
        },
        "tools": [
            {
                "tech": "bake",
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
            "key": "banh_mi",
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

    window.Cake.RECIPES_CHINA_IMPORTED["pho"] = {
        "name": "越南河粉",
        "skill": "cook",
        "cuisine": "vietnamese",
        "size": "medium",
        "energy": 12,
        "ing": {
            "rice_noodle": 2,
            "meat": 2,
            "scallion": 1,
            "lime": 1
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
            "key": "pho",
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

    window.Cake.RECIPES_CHINA_IMPORTED["spring_rolls"] = {
        "name": "越南春卷",
        "skill": "cook",
        "cuisine": "vietnamese",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 1,
            "shrimp": 2,
            "cabbage": 1,
            "mint": 1,
            "carrot": 1
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
            "key": "spring_rolls",
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

    window.Cake.RECIPES_CHINA_IMPORTED["sugarcane_shrimp"] = {
        "name": "甘蔗虾",
        "skill": "cook",
        "cuisine": "vietnamese",
        "size": "small",
        "energy": 6,
        "ing": {
            "shrimp": 2,
            "sugar": 1,
            "flour_low": 1,
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
            "key": "sugarcane_shrimp",
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

    window.Cake.RECIPES_CHINA_IMPORTED["vietnamese_coconut_chicken"] = {
        "name": "越南椰香鸡",
        "skill": "cook",
        "cuisine": "vietnamese",
        "size": "medium",
        "energy": 12,
        "ing": {
            "chicken": 2,
            "coconut_milk": 2,
            "lemongrass": 1,
            "garlic": 1
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
            "key": "vietnamese_coconut_chicken",
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
