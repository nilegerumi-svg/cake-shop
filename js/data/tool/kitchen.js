// js/data/tool/kitchen.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.TOOLS_KITCHEN = {
        // 通用
        'wok':          { id: 'wok',          name: '熟铁炒锅',   emoji: '🍳', price: 50,  cat: 'kitchen', tech: 'stirfry', tier: 1 },
        'steamer_bamboo':{ id: 'steamer_bamboo', name: '竹蒸笼',  emoji: '🥟', price: 40,  cat: 'kitchen', tech: 'steam',    tier: 1 },
        'claypot':      { id: 'claypot',      name: '砂锅',       emoji: '🍲', price: 60,  cat: 'kitchen', tech: 'braise',   tier: 1 },
        // 八大菜系专属
        'wok_iron_big': { id: 'wok_iron_big', name: '鲁菜大铁锅', emoji: '🥘', price: 200, cat: 'kitchen', tech: 'stirfry', tier: 2 },
        'roast_oven':   { id: 'roast_oven',   name: '粤式烧腊炉', emoji: '🦆', price: 300, cat: 'kitchen', tech: 'roast',    tier: 2 },
        'claypot_yixing':{id: 'claypot_yixing',name: '宜兴紫砂锅',emoji: '🏺', price: 250, cat: 'kitchen', tech: 'braise',   tier: 2 },
        'stone_pot':    { id: 'stone_pot',    name: '徽州石锅',   emoji: '🥣', price: 180, cat: 'kitchen', tech: 'stew',     tier: 2 },
        'pickle_jar':   { id: 'pickle_jar',   name: '川渝泡菜坛', emoji: '🏺', price: 50,  cat: 'kitchen', tech: 'ferment',  tier: 1 },
        'smoke_rack':   { id: 'smoke_rack',   name: '湘西熏肉架', emoji: '🪵', price: 120, cat: 'kitchen', tech: 'smoke',    tier: 1 },
        'jar_fotiaoqiang':{id:'jar_fotiaoqiang',name:'佛跳墙酒坛',emoji: '🏺', price: 500, cat: 'kitchen', tech: 'braise',   tier: 3 }
    };
})();
