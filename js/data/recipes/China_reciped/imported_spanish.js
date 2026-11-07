// js/data/recipes/China_reciped/imported_spanish.js（菜系：spanish，共 5 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["churros"] = {
        "name": "吉事果",
        "skill": "cook",
        "cuisine": "spanish",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "sugar": 2,
            "milk": 1,
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
            "key": "churros",
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

    window.Cake.RECIPES_CHINA_IMPORTED["gambas_ajillo"] = {
        "name": "蒜香虾",
        "skill": "cook",
        "cuisine": "spanish",
        "size": "small",
        "energy": 6,
        "ing": {
            "shrimp": 3,
            "garlic": 2,
            "chili": 1,
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
            "key": "gambas_ajillo",
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

    window.Cake.RECIPES_CHINA_IMPORTED["gazpacho"] = {
        "name": "西班牙凉菜汤",
        "skill": "cook",
        "cuisine": "spanish",
        "size": "small",
        "energy": 6,
        "ing": {
            "tomato": 3,
            "onion": 1,
            "garlic": 1,
            "cucumber": 1
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
            "key": "gazpacho",
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

    window.Cake.RECIPES_CHINA_IMPORTED["paella"] = {
        "name": "西班牙海鲜饭",
        "skill": "cook",
        "cuisine": "spanish",
        "size": "large",
        "energy": 18,
        "ing": {
            "japonica_rice": 2,
            "shrimp": 2,
            "sausage": 1,
            "tomato": 2,
            "lime": 1
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
            "key": "paella",
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

    window.Cake.RECIPES_CHINA_IMPORTED["tortilla_espanola"] = {
        "name": "西班牙土豆蛋饼",
        "skill": "cook",
        "cuisine": "spanish",
        "size": "medium",
        "energy": 12,
        "ing": {
            "potato": 3,
            "chicken_egg": 2,
            "onion": 1,
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
            "key": "tortilla_espanola",
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
