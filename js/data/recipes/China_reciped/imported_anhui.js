// js/data/recipes/China_reciped/imported_anhui.js（菜系：anhui，共 2 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["hairy_tofu"] = {
        "name": "毛豆腐",
        "skill": "cook",
        "cuisine": "anhui",
        "size": "small",
        "energy": 6,
        "ing": {
            "tofu": 2,
            "chili": 1,
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
            "key": "hairy_tofu",
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

    window.Cake.RECIPES_CHINA_IMPORTED["stinky_mandarin"] = {
        "name": "臭鳜鱼",
        "skill": "cook",
        "cuisine": "anhui",
        "size": "medium",
        "energy": 12,
        "ing": {
            "common_carp": 2,
            "chili": 1,
            "ginger": 1,
            "soy_sauce_light": 1,
            "cooking_wine": 1
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
            "key": "stinky_mandarin",
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
