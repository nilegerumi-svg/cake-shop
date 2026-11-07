// bakery/small/imported_1.js（烘焙小份 第 1 批，共 16 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_SMALL_IMPORTED = window.Cake.RECIPES_SMALL_IMPORTED || {};

    window.Cake.RECIPES_SMALL_IMPORTED["americano"] = {
        "name": "美式咖啡",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "coffee_bean": 2
        },
        "tools": [
            {
                "tech": "stew",
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
            "key": "americano",
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

    window.Cake.RECIPES_SMALL_IMPORTED["apple_juice"] = {
        "name": "苹果汁",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "apple": 3,
            "sugar": 1
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
            "key": "apple_juice",
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

    window.Cake.RECIPES_SMALL_IMPORTED["bagel"] = {
        "name": "原味贝果",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "chicken_egg": 1,
            "sugar": 1
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
            "key": "bagel",
            "attrs": {
                "flavor": {
                    "umami": 30
                },
                "texture": {
                    "crispy": 40
                }
            }
        }
    };

    window.Cake.RECIPES_SMALL_IMPORTED["blueberry_jam_jar"] = {
        "name": "蓝莓酱罐头",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {},
        "tools": [],
        "qualityReq": {
            "minIngredientQuality": 40,
            "minSkillLevel": 1,
            "minRecipeProf": 2,
            "perfectTools": []
        },
        "output": {
            "type": "food",
            "key": "blueberry_jam_jar",
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

    window.Cake.RECIPES_SMALL_IMPORTED["blueberry_muffin"] = {
        "name": "蓝莓麦芬",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "blueberry": 2,
            "sugar": 1,
            "chicken_egg": 1
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
            "key": "blueberry_muffin",
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

    window.Cake.RECIPES_SMALL_IMPORTED["butter_cookie"] = {
        "name": "黄油曲奇",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "butter": 2,
            "sugar": 2
        },
        "tools": [],
        "qualityReq": {
            "minIngredientQuality": 40,
            "minSkillLevel": 1,
            "minRecipeProf": 2,
            "perfectTools": [
                "oven_pro"
            ]
        },
        "output": {
            "type": "food",
            "key": "butter_cookie",
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

    window.Cake.RECIPES_SMALL_IMPORTED["cappuccino"] = {
        "name": "卡布奇诺",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "coffee_bean": 2,
            "milk": 2,
            "cream": 1
        },
        "tools": [
            {
                "tech": "stew",
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
            "key": "cappuccino",
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

    window.Cake.RECIPES_SMALL_IMPORTED["caramel_macchiato"] = {
        "name": "焦糖玛奇朵",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "coffee_bean": 2,
            "milk": 2,
            "sugar": 2
        },
        "tools": [
            {
                "tech": "stew",
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
            "key": "caramel_macchiato",
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

    window.Cake.RECIPES_SMALL_IMPORTED["chocolate_cookie"] = {
        "name": "巧克力曲奇",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "butter": 2,
            "sugar": 1,
            "chocolate": 2
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
            "key": "chocolate_cookie",
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

    window.Cake.RECIPES_SMALL_IMPORTED["chocolate_icecream"] = {
        "name": "巧克力冰淇淋",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "chocolate": 2,
            "milk": 2,
            "cream": 2,
            "sugar": 1
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
            "key": "chocolate_icecream",
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

    window.Cake.RECIPES_SMALL_IMPORTED["chocolate_muffin"] = {
        "name": "巧克力麦芬",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "chocolate": 2,
            "sugar": 1,
            "chicken_egg": 1
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
            "key": "chocolate_muffin",
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

    window.Cake.RECIPES_SMALL_IMPORTED["chocolate_pudding"] = {
        "name": "巧克力布丁",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "milk": 2,
            "chicken_egg": 2,
            "chocolate": 2,
            "sugar": 1
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
            "key": "chocolate_pudding",
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

    window.Cake.RECIPES_SMALL_IMPORTED["classic_muffin"] = {
        "name": "经典麦芬",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "sugar": 1,
            "chicken_egg": 1
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
            "key": "classic_muffin",
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

    window.Cake.RECIPES_SMALL_IMPORTED["coconut_cake"] = {
        "name": "椰香小蛋糕",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "coconut": 1,
            "flour_low": 1,
            "chicken_egg": 1,
            "sugar": 1
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
            "key": "coconut_cake",
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

    window.Cake.RECIPES_SMALL_IMPORTED["coconut_mochi"] = {
        "name": "椰蓉糯米糍",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "sugar": 2,
            "coconut": 2,
            "red_bean": 2
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
            "key": "coconut_mochi",
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

    window.Cake.RECIPES_SMALL_IMPORTED["cupcake"] = {
        "name": "纸杯蛋糕",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 1,
            "sugar": 1,
            "chicken_egg": 1,
            "milk": 1
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
            "key": "cupcake",
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
