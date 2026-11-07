// js/data/recipes/China_reciped/imported_german.js（菜系：german，共 5 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["bratwurst_platter"] = {
        "name": "德式香肠拼盘",
        "skill": "cook",
        "cuisine": "german",
        "size": "large",
        "energy": 18,
        "ing": {
            "sausage": 3,
            "potato": 2,
            "onion": 1,
            "cabbage": 1
        },
        "tools": [
            {
                "tech": "stirfry",
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
            "key": "bratwurst_platter",
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

    window.Cake.RECIPES_CHINA_IMPORTED["german_apple_pork"] = {
        "name": "德式苹果炖猪排",
        "skill": "cook",
        "cuisine": "german",
        "size": "medium",
        "energy": 12,
        "ing": {
            "meat": 2,
            "apple": 2,
            "onion": 1,
            "cooking_wine": 1
        },
        "tools": [
            {
                "tech": "braise",
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
            "key": "german_apple_pork",
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

    window.Cake.RECIPES_CHINA_IMPORTED["pork_knuckle"] = {
        "name": "德国猪肘",
        "skill": "cook",
        "cuisine": "german",
        "size": "large",
        "energy": 18,
        "ing": {
            "meat": 3,
            "garlic": 2,
            "honey": 1,
            "cooking_wine": 1
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
            "key": "pork_knuckle",
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

    window.Cake.RECIPES_CHINA_IMPORTED["potato_dumplings"] = {
        "name": "德式土豆丸子",
        "skill": "cook",
        "cuisine": "german",
        "size": "small",
        "energy": 6,
        "ing": {
            "potato": 3,
            "flour_low": 1,
            "chicken_egg": 1
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
            "key": "potato_dumplings",
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

    window.Cake.RECIPES_CHINA_IMPORTED["sauerkraut_stew"] = {
        "name": "酸菜炖肉",
        "skill": "cook",
        "cuisine": "german",
        "size": "medium",
        "energy": 12,
        "ing": {
            "meat": 2,
            "cabbage": 2,
            "bacon": 1,
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
            "key": "sauerkraut_stew",
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
