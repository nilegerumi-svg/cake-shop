// js/data/recipes/China_reciped/imported_shandong.js（菜系：shandong，共 1 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["braised_river_shrimp"] = {
        "name": "油焖河虾",
        "skill": "cook",
        "cuisine": "shandong",
        "size": "small",
        "energy": 6,
        "ing": {
            "river_shrimp": 4,
            "oil": 1,
            "ginger": 1,
            "sugar": 1,
            "soy_sauce_light": 1
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
            "key": "braised_river_shrimp",
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
