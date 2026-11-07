// js/data/recipes/China_reciped/imported_sichuan.js（菜系：sichuan，共 4 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_CHINA_IMPORTED = window.Cake.RECIPES_CHINA_IMPORTED || {};

    window.Cake.RECIPES_CHINA_IMPORTED["boiled_fish"] = {
        "name": "水煮鱼",
        "skill": "cook",
        "cuisine": "sichuan",
        "size": "large",
        "energy": 18,
        "ing": {
            "carp": 2,
            "chili": 3,
            "sichuan_pepper": 1,
            "garlic": 2,
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
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "boiled_fish",
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

    window.Cake.RECIPES_CHINA_IMPORTED["fish_fragrant_pork"] = {
        "name": "鱼香肉丝",
        "skill": "cook",
        "cuisine": "sichuan",
        "size": "medium",
        "energy": 12,
        "ing": {
            "meat": 2,
            "carrot": 1,
            "chili": 1,
            "vinegar": 1,
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
            "minIngredientQuality": 50,
            "minSkillLevel": 2,
            "minRecipeProf": 4,
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "fish_fragrant_pork",
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

    window.Cake.RECIPES_CHINA_IMPORTED["kungpao_chicken"] = {
        "name": "宫保鸡丁",
        "skill": "cook",
        "cuisine": "sichuan",
        "size": "medium",
        "energy": 12,
        "ing": {
            "chicken": 2,
            "chili": 2,
            "garlic": 1,
            "soy_sauce_light": 1,
            "vinegar": 1,
            "sugar": 1
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
            "key": "kungpao_chicken",
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

    window.Cake.RECIPES_CHINA_IMPORTED["yellow_catfish_pot"] = {
        "name": "黄颡鱼豆腐煲",
        "skill": "cook",
        "cuisine": "sichuan",
        "size": "medium",
        "energy": 12,
        "ing": {
            "yellow_catfish": 3,
            "tofu": 2,
            "chili": 1,
            "garlic": 1
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
            "key": "yellow_catfish_pot",
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
