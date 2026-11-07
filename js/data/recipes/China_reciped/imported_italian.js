// js/data/recipes/China_reciped/imported_italian.js（菜系：italian，共 7 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["italian_meatball"] = {
        "name": "意式肉丸",
        "skill": "cook",
        "cuisine": "italian",
        "size": "medium",
        "energy": 12,
        "ing": {
            "meat": 2,
            "flour_low": 1,
            "chicken_egg": 1,
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
            "key": "italian_meatball",
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

    window.Cake.RECIPES_CHINA_IMPORTED["italian_risotto"] = {
        "name": "意式烩饭",
        "skill": "cook",
        "cuisine": "italian",
        "size": "medium",
        "energy": 12,
        "ing": {
            "japonica_rice": 2,
            "mushroom": 2,
            "butter": 1,
            "cheese": 1
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
            "key": "italian_risotto",
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

    window.Cake.RECIPES_CHINA_IMPORTED["lasagna"] = {
        "name": "芝士千层面",
        "skill": "cook",
        "cuisine": "italian",
        "size": "large",
        "energy": 18,
        "ing": {
            "pasta": 2,
            "cheese": 2,
            "meat": 2,
            "tomato": 3
        },
        "tools": [
            {
                "tech": "bake",
                "role": "required"
            }
        ],
        "qualityReq": {
            "minIngredientQuality": 60,
            "minSkillLevel": 3,
            "minRecipeProf": 6,
            "perfectTools": [
                "oven_pro"
            ]
        },
        "output": {
            "type": "food",
            "key": "lasagna",
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

    window.Cake.RECIPES_CHINA_IMPORTED["margherita_pizza"] = {
        "name": "玛格丽特披萨",
        "skill": "cook",
        "cuisine": "italian",
        "size": "large",
        "energy": 18,
        "ing": {
            "flour_low": 2,
            "tomato": 2,
            "cheese": 2,
            "basil": 1
        },
        "tools": [
            {
                "tech": "bake",
                "role": "required"
            }
        ],
        "qualityReq": {
            "minIngredientQuality": 60,
            "minSkillLevel": 3,
            "minRecipeProf": 6,
            "perfectTools": [
                "oven_pro"
            ]
        },
        "output": {
            "type": "food",
            "key": "margherita_pizza",
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

    window.Cake.RECIPES_CHINA_IMPORTED["pasta"] = {
        "name": "番茄肉酱意面",
        "skill": "cook",
        "cuisine": "italian",
        "size": "medium",
        "energy": 12,
        "ing": {
            "pasta": 2,
            "meat": 2,
            "tomato": 3
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
            "key": "pasta",
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

    window.Cake.RECIPES_CHINA_IMPORTED["pizza"] = {
        "name": "芝士披萨",
        "skill": "cook",
        "cuisine": "italian",
        "size": "large",
        "energy": 18,
        "ing": {
            "flour_low": 3,
            "cheese": 3,
            "tomato": 3,
            "meat": 2
        },
        "tools": [
            {
                "tech": "bake",
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
            "key": "pizza",
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

    window.Cake.RECIPES_CHINA_IMPORTED["tiramisu"] = {
        "name": "提拉米苏",
        "skill": "cook",
        "cuisine": "italian",
        "size": "medium",
        "energy": 12,
        "ing": {
            "chicken_egg": 2,
            "cream": 2,
            "coffee_bean": 1,
            "sugar": 2
        },
        "tools": [],
        "qualityReq": {
            "minIngredientQuality": 50,
            "minSkillLevel": 2,
            "minRecipeProf": 4,
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "tiramisu",
            "attrs": {
                "flavor": {
                    "bitter": 60
                },
                "texture": {
                    "smooth": 30
                }
            }
        }
    };
})();
