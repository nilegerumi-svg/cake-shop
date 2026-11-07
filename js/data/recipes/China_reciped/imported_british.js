// js/data/recipes/China_reciped/imported_british.js（菜系：british，共 5 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["fish_and_chips"] = {
        "name": "炸鱼薯条",
        "skill": "cook",
        "cuisine": "british",
        "size": "medium",
        "energy": 12,
        "ing": {
            "crucian": 2,
            "flour_low": 2,
            "potato": 2,
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
            "key": "fish_and_chips",
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

    window.Cake.RECIPES_CHINA_IMPORTED["roast_beef"] = {
        "name": "英式烤牛肉",
        "skill": "cook",
        "cuisine": "british",
        "size": "large",
        "energy": 18,
        "ing": {
            "meat": 3,
            "potato": 2,
            "onion": 1,
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
            "key": "roast_beef",
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

    window.Cake.RECIPES_CHINA_IMPORTED["scone"] = {
        "name": "英式司康",
        "skill": "cook",
        "cuisine": "british",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "milk": 1,
            "chicken_egg": 1,
            "butter": 1
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
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "scone",
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

    window.Cake.RECIPES_CHINA_IMPORTED["shepherd_pie"] = {
        "name": "牧羊人派",
        "skill": "cook",
        "cuisine": "british",
        "size": "medium",
        "energy": 12,
        "ing": {
            "meat": 2,
            "potato": 3,
            "onion": 1,
            "cheese": 1
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
            "key": "shepherd_pie",
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

    window.Cake.RECIPES_CHINA_IMPORTED["yorkshire_pudding"] = {
        "name": "约克郡布丁",
        "skill": "cook",
        "cuisine": "british",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "milk": 2,
            "chicken_egg": 2
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
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "yorkshire_pudding",
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
