// js/data/world/explore_events.js（离线包表 ZS）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.EXPLORE_EVENTS = [
    {
        "id": "park_squirrel",
        "loc": "park",
        "text": "一只松鼠突然从树上跳下来，冲你手里的面包片眨了眨眼。你分了它一点，它居然回赠你一颗野果！",
        "coins": 8,
        "mood": 5,
        "ingredient": "apple",
        "found": "捡到 1 颗野果"
    },
    {
        "id": "park_chess",
        "loc": "park",
        "text": "凉亭里的老大爷们正在下象棋，见你路过热情地招手：「小伙子/姑娘，来杀一盘！」你陪着下了一盘，虽然输了，但心情舒畅。",
        "mood": 8,
        "satiety": -3
    },
    {
        "id": "park_stray",
        "loc": "park",
        "text": "公园长椅下蜷着一只流浪猫，你蹲下摸了摸它，它蹭了蹭你的手，喵喵叫着跑开了。",
        "mood": 6,
        "health": 1
    },
    {
        "id": "park_hotdog",
        "loc": "park",
        "text": "公园门口新开了个热狗摊，香味飘了老远。你买了一个垫肚子，摊主大叔说看你面善，多送了你一根烤肠。",
        "satiety": 20,
        "coins": -10,
        "mood": 4
    },
    {
        "id": "park_flower",
        "loc": "park",
        "text": "花坛里的花开了，一位园艺阿姨正在修剪，顺手摘了一小把新开的雏菊送给你：「带回家插瓶里，看着心情好。」",
        "mood": 5,
        "found": "收到一束雏菊"
    },
    {
        "id": "park_butterfly",
        "loc": "park",
        "text": "公园花丛里飞着一只蓝翅膀的蝴蝶，绕着你的手指转了两圈，才慢悠悠地飞走。你站在原地看了好一会儿，心情像被染上了颜色。",
        "mood": 5
    },
    {
        "id": "park_kite",
        "loc": "park",
        "text": "一个孩子放的风筝挂到了树梢上，急得直跺脚。你踮起脚帮他把风筝够了下来，孩子的妈妈赶来，硬塞给你一瓶冰镇汽水。",
        "mood": 4,
        "satiety": 8
    },
    {
        "id": "river_duck",
        "loc": "river",
        "text": "河面上游来一队小鸭子，领头的那只歪着头看你，像是在讨吃的。你随手撒了点碎面包，鸭子们欢快地扑腾起来。",
        "mood": 6,
        "satiety": -2
    },
    {
        "id": "river_painter",
        "loc": "river",
        "text": "河边有位画家正在画风景，看见你主动搭话，还给你画了张速写：「拿去，就当交个朋友！」",
        "mood": 7,
        "found": "收到一幅河边速写"
    },
    {
        "id": "river_pebble",
        "loc": "river",
        "text": "你在河滩上发现一颗特别圆润光滑的鹅卵石，在阳光下闪着细碎的光，顺手收进了口袋。",
        "mood": 3,
        "coins": 6,
        "found": "捡到一颗漂亮鹅卵石"
    },
    {
        "id": "river_splash",
        "loc": "river",
        "text": "一阵风刮过，河边的水花溅了你一身，衣服湿了半边，你哭笑不得。",
        "mood": -3,
        "energy": -3
    },
    {
        "id": "river_frog",
        "loc": "river",
        "text": "河边传来一阵响亮的蛙鸣，你循声望去，一只绿青蛙蹲在荷叶上鼓着腮帮子，像是在和你打招呼，逗得你笑出声来。",
        "mood": 4,
        "energy": 2
    },
    {
        "id": "river_sunset",
        "loc": "river",
        "text": "傍晚的河面被夕阳染成一片金黄，你站在桥上看了很久，微风吹过，一天的疲惫好像都被河水带走了。",
        "mood": 8,
        "energy": 5
    },
    {
        "id": "plaza_musician",
        "loc": "plaza",
        "text": "广场的街头艺人正在弹唱，围观的人里三层外三层。你往琴盒里放了几个硬币，艺人朝你鞠了一躬，专门为你弹了一首曲子。",
        "mood": 8,
        "coins": -5
    },
    {
        "id": "plaza_balloon",
        "loc": "plaza",
        "text": "广场边的小丑正在给孩子们扎气球，看见你也扎了一个小蛋糕造型的气球送给你：「开店的人，好运常在！」",
        "mood": 6,
        "found": "收到一个蛋糕气球"
    },
    {
        "id": "plaza_photographer",
        "loc": "plaza",
        "text": "一位游客拦住你，想请你帮忙拍张合影。拍完他连连道谢，还请你喝了杯广场边新开的柠檬水。",
        "mood": 4,
        "satiety": 8
    },
    {
        "id": "plaza_skate",
        "loc": "plaza",
        "text": "几个孩子踩着滑板从你身边呼啸而过，其中一个没刹住，差点撞到你。你扶了他一把，孩子的家长赶来连声道谢。",
        "mood": 4,
        "explores": 1
    },
    {
        "id": "plaza_calligraphy",
        "loc": "plaza",
        "text": "广场边的老爷爷正在教孩子们写毛笔字，见你好奇地围观，笑呵呵递来一支笔：「来，写个字试试！」你写了个「甜」字，孩子们拍手叫好。",
        "mood": 6,
        "explores": 1
    },
    {
        "id": "plaza_coupon",
        "loc": "plaza",
        "text": "广场上有人在发新开甜品店的宣传单，递到你手里时愣了一下：「咦，你不就是街口那家蛋糕店的老板吗？我还是觉得你家好吃！」",
        "mood": 5,
        "coins": 8,
        "found": "收到路人真诚的夸奖"
    }
];
})();
