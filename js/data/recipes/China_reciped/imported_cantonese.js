// js/data/recipes/China_reciped/imported_cantonese.js（菜系：cantonese，共 4 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["garlic_oyster"] = {
        "name": "蒜蓉烤生蚝",
        "skill": "cook",
        "cuisine": "cantonese",
        "size": "small",
        "energy": 6,
        "ing": {
            "oyster": 4,
            "garlic": 3,
            "oil": 1
        },
        "tools": [
            {
                "tech": "roast",
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
            "key": "garlic_oyster",
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

    window.Cake.RECIPES_CHINA_IMPORTED["scallop_vermicelli"] = {
        "name": "蒜蓉粉丝蒸扇贝",
        "skill": "cook",
        "cuisine": "cantonese",
        "size": "small",
        "energy": 6,
        "ing": {
            "scallop": 2,
            "vermicelli": 1,
            "garlic": 2,
            "soy_sauce_light": 1
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
            "key": "scallop_vermicelli",
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

    window.Cake.RECIPES_CHINA_IMPORTED["shrimp_dumpling"] = {
        "name": "水晶虾饺",
        "skill": "cook",
        "cuisine": "cantonese",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "shrimp": 2,
            "scallion": 1
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
            "perfectTools": [
                "steamer_bamboo"
            ]
        },
        "output": {
            "type": "food",
            "key": "shrimp_dumpling",
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

    window.Cake.RECIPES_CHINA_IMPORTED["white_cut_chicken"] = {
        "name": "白切鸡",
        "skill": "cook",
        "cuisine": "cantonese",
        "size": "medium",
        "energy": 12,
        "ing": {
            "chicken": 2,
            "ginger": 1,
            "scallion": 1,
            "oil": 1
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
            "key": "white_cut_chicken",
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
