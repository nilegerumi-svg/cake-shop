// js/data/recipes/China_reciped/imported_fujian.js（菜系：fujian，共 1 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["lychee_pork"] = {
        "name": "荔枝肉",
        "skill": "cook",
        "cuisine": "fujian",
        "size": "medium",
        "energy": 12,
        "ing": {
            "meat": 2,
            "potato": 2,
            "vinegar": 1,
            "sugar": 2
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
            "key": "lychee_pork",
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
})();
