// js/data/recipes/China_reciped/imported_huaiyang.js（菜系：huaiyang，共 4 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["crab_tofu"] = {
        "name": "蟹黄豆腐",
        "skill": "cook",
        "cuisine": "huaiyang",
        "size": "medium",
        "energy": 12,
        "ing": {
            "river_crab": 1,
            "tofu": 2,
            "ginger": 1,
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
            "key": "crab_tofu",
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

    window.Cake.RECIPES_CHINA_IMPORTED["lion_head"] = {
        "name": "红烧狮子头",
        "skill": "cook",
        "cuisine": "huaiyang",
        "size": "large",
        "energy": 18,
        "ing": {
            "meat": 3,
            "tofu": 1,
            "chicken_egg": 1,
            "soy_sauce_light": 1,
            "ginger": 1
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
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "lion_head",
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

    window.Cake.RECIPES_CHINA_IMPORTED["squirrel_fish"] = {
        "name": "松鼠桂鱼",
        "skill": "cook",
        "cuisine": "huaiyang",
        "size": "large",
        "energy": 18,
        "ing": {
            "crucian": 2,
            "flour_low": 2,
            "vinegar": 1,
            "sugar": 2,
            "oil": 1
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
            "perfectTools": [
                "wok_iron_big"
            ]
        },
        "output": {
            "type": "food",
            "key": "squirrel_fish",
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

    window.Cake.RECIPES_CHINA_IMPORTED["steamed_bass"] = {
        "name": "清蒸鲈鱼",
        "skill": "cook",
        "cuisine": "huaiyang",
        "size": "medium",
        "energy": 12,
        "ing": {
            "bass": 2,
            "scallion": 1,
            "ginger": 1,
            "soy_sauce_light": 1
        },
        "tools": [
            {
                "tech": "steam",
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
            "key": "steamed_bass",
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
