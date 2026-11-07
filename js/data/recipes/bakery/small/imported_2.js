// bakery/small/imported_2.js（烘焙小份 第 2 批，共 16 道）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_SMALL_IMPORTED = window.Cake.RECIPES_SMALL_IMPORTED || {};

    window.Cake.RECIPES_SMALL_IMPORTED["fish_oil_cake"] = {
        "name": "鱼油海绵蛋糕",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "fish_oil": 1,
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
            "key": "fish_oil_cake",
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

    window.Cake.RECIPES_SMALL_IMPORTED["fish_paste_cake"] = {
        "name": "鱼酱咸蛋糕",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "fish_paste": 1,
            "flour_low": 2,
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
            "key": "fish_paste_cake",
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

    window.Cake.RECIPES_SMALL_IMPORTED["fish_paste_jar"] = {
        "name": "鱼酱罐头",
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
            "key": "fish_paste_jar",
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

    window.Cake.RECIPES_SMALL_IMPORTED["honey_bread"] = {
        "name": "蜂蜜面包",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 3,
            "honey": 2,
            "butter": 1
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
            "key": "honey_bread",
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

    window.Cake.RECIPES_SMALL_IMPORTED["jam_cake"] = {
        "name": "果酱夹心蛋糕",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "strawberry_jam": 1,
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
            "key": "jam_cake",
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

    window.Cake.RECIPES_SMALL_IMPORTED["latte"] = {
        "name": "拿铁",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "coffee_bean": 2,
            "milk": 2
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
            "key": "latte",
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

    window.Cake.RECIPES_SMALL_IMPORTED["lemon_mousse"] = {
        "name": "柠檬慕斯",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "cream": 2,
            "lemon": 3,
            "sugar": 2
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
            "key": "lemon_mousse",
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

    window.Cake.RECIPES_SMALL_IMPORTED["lemon_soda"] = {
        "name": "柠檬气泡水",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "lemon": 3,
            "sugar": 2
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
            "key": "lemon_soda",
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

    window.Cake.RECIPES_SMALL_IMPORTED["mango_icecream"] = {
        "name": "芒果冰淇淋",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "mango": 3,
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
            "key": "mango_icecream",
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

    window.Cake.RECIPES_SMALL_IMPORTED["mango_juice"] = {
        "name": "芒果汁",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "mango": 3,
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
            "key": "mango_juice",
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

    window.Cake.RECIPES_SMALL_IMPORTED["mango_mousse"] = {
        "name": "芒果慕斯",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "cream": 2,
            "mango": 3,
            "sugar": 2
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
            "key": "mango_mousse",
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

    window.Cake.RECIPES_SMALL_IMPORTED["matcha_icecream"] = {
        "name": "抹茶冰淇淋",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "matcha": 2,
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
            "key": "matcha_icecream",
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

    window.Cake.RECIPES_SMALL_IMPORTED["matcha_mousse"] = {
        "name": "抹茶慕斯",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "cream": 2,
            "matcha": 2,
            "sugar": 2,
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
            "key": "matcha_mousse",
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

    window.Cake.RECIPES_SMALL_IMPORTED["meat_pie"] = {
        "name": "肉派",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 3,
            "butter": 2,
            "meat": 3
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
            "key": "meat_pie",
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

    window.Cake.RECIPES_SMALL_IMPORTED["mini_chiffon"] = {
        "name": "迷你戚风",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "flour_low": 2,
            "chicken_egg": 2,
            "sugar": 1,
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
            "key": "mini_chiffon",
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

    window.Cake.RECIPES_SMALL_IMPORTED["mocha"] = {
        "name": "摩卡",
        "skill": "bakery",
        "size": "small",
        "energy": 6,
        "ing": {
            "coffee_bean": 2,
            "chocolate": 2,
            "milk": 1
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
            "key": "mocha",
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
})();
