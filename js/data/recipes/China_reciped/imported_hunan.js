// js/data/recipes/China_reciped/imported_hunan.js（菜系：hunan，共 2 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["chopped_chili_fish"] = {
        "name": "剁椒鱼头",
        "skill": "cook",
        "cuisine": "hunan",
        "size": "large",
        "energy": 18,
        "ing": {
            "common_carp": 2,
            "chili": 3,
            "garlic": 2,
            "ginger": 1
        },
        "tools": [
            {
                "tech": "steam",
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
            "key": "chopped_chili_fish",
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

    window.Cake.RECIPES_CHINA_IMPORTED["fried_snail"] = {
        "name": "辣炒田螺",
        "skill": "cook",
        "cuisine": "hunan",
        "size": "small",
        "energy": 6,
        "ing": {
            "snail": 4,
            "chili": 2,
            "garlic": 2,
            "soy_sauce_light": 1,
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
            "key": "fried_snail",
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
