// loc_public.js（区域：public，共 20 项）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    var NS = 'WORLD_LOCATIONS';
    window.Cake[NS] = window.Cake[NS] || {};

    window.Cake[NS]["bakery"] = {
        "id": "bakery",
        "name": "蛋糕店",
        "emoji": "🍰",
        "tag": "经营·烘焙",
        "desc": "蛋糕店是主业：开店接待客人、烘焙点心、研发新配方。",
        "x": "25%",
        "y": "4%",
        "zone": "public"
    };

    window.Cake[NS]["hospital"] = {
        "id": "hospital",
        "name": "医院",
        "emoji": "🏥",
        "tag": "看病·门诊",
        "desc": "镇医院白天门诊：挂号看诊能快速恢复健康，医生和护士白天都在这里上班。",
        "x": "47%",
        "y": "4%",
        "zone": "public"
    };

    window.Cake[NS]["highschool"] = {
        "id": "highschool",
        "name": "高中",
        "emoji": "🏫",
        "tag": "高中·备考",
        "desc": "医院附近的高中：学生们在这里备考，语文老师也在这里任教。备考氛围浓厚，校门口常有学生们的日常。",
        "x": "69%",
        "y": "5%",
        "zone": "public"
    };

    window.Cake[NS]["wenyuan"] = {
        "id": "wenyuan",
        "name": "文苑小区",
        "emoji": "🏘️",
        "tag": "伙伴的家·文苑",
        "desc": "居民区拆分为四个小区，文苑小区是其中住户最多的一片：普通居民大多住这儿，各户都有门卫，陌生人不能随便进。",
        "x": "4%",
        "y": "28%",
        "zone": "public"
    };

    window.Cake[NS]["ankang"] = {
        "id": "ankang",
        "name": "安康苑",
        "emoji": "🏘️",
        "tag": "伙伴的家·安康",
        "desc": "安康苑是居民区的一个小区，紧邻商店街，住户们白天都在镇上各处上班，傍晚才回家。",
        "x": "13%",
        "y": "38%",
        "zone": "public"
    };

    window.Cake[NS]["wutongli"] = {
        "id": "wutongli",
        "name": "梧桐里",
        "emoji": "🏘️",
        "tag": "伙伴的家·梧桐",
        "desc": "梧桐里靠河，是居民区的一个小区：住户们白天多在河边、店里忙活，想认识他们就照时间表去碰面。",
        "x": "5%",
        "y": "48%",
        "zone": "public"
    };

    window.Cake[NS]["sujizhai"] = {
        "id": "sujizhai",
        "name": "苏记老宅",
        "emoji": "🏮",
        "tag": "苏家老宅",
        "desc": "苏记老宅是苏家的祖宅，长辈们住在这里，老宅常有晚辈回来探望。",
        "x": "14%",
        "y": "57%",
        "zone": "public"
    };

    window.Cake[NS]["eaststreet"] = {
        "id": "eaststreet",
        "name": "东商店街",
        "emoji": "🏪",
        "tag": "东街·店铺",
        "desc": "商店街拆成东西两条街：东商店街有食材商店、服装店、理发店、鱼竿店、家具店、书店、布料行和银行，员工招聘摊位也在这边。",
        "x": "25%",
        "y": "30%",
        "zone": "public"
    };

    window.Cake[NS]["weststreet"] = {
        "id": "weststreet",
        "name": "西商店街",
        "emoji": "🏪",
        "tag": "西街·店铺",
        "desc": "西商店街有苏记甜品面包店、水果摊、菜市场、快餐店、综合超市和花店：苏家甜品和果蔬摊位都在这条街上，店员白天都在当班。",
        "x": "30%",
        "y": "42%",
        "zone": "public"
    };

    window.Cake[NS]["plaza"] = {
        "id": "plaza",
        "name": "小镇广场",
        "emoji": "🏟️",
        "tag": "休闲·偶遇",
        "desc": "广场是小镇最热闹的地方：听听街头艺人、看看手作小摊，运气好还能偶遇伙伴们。",
        "x": "47%",
        "y": "36%",
        "zone": "public"
    };

    window.Cake[NS]["middleschool"] = {
        "id": "middleschool",
        "name": "广场中学",
        "emoji": "🏫",
        "tag": "初中",
        "desc": "小镇广场旁的初中：学生们在这里上初一，体育老师在这里教体育。校园公共区域开放，放学时校门口很热闹。",
        "x": "69%",
        "y": "34%",
        "zone": "public"
    };

    window.Cake[NS]["park"] = {
        "id": "park",
        "name": "公园",
        "emoji": "🌳",
        "tag": "锻炼·遛弯",
        "desc": "晨跑、健身操、抓泥鳅都在公园；锻炼能恢复健康、提升运动技能，午后还常能碰到遛狗散步的伙伴。",
        "x": "89%",
        "y": "34%",
        "zone": "public"
    };

    window.Cake[NS]["river"] = {
        "id": "river",
        "name": "河边",
        "emoji": "🏞️",
        "tag": "散步·钓鱼",
        "desc": "河边散步、骑行、钓鱼，吹吹风心情好；带上鱼竿和泥鳅饵料就能开钓，河鲜种类丰富。",
        "x": "26%",
        "y": "80%",
        "zone": "public"
    };

    window.Cake[NS]["library"] = {
        "id": "library",
        "name": "图书馆",
        "emoji": "📚",
        "tag": "借书阅读",
        "desc": "河边图书馆 10:00-18:00 开放，借书只能当场读、不能带走，读到的知识照样进脑子。",
        "x": "47%",
        "y": "66%",
        "zone": "public"
    };

    window.Cake[NS]["market"] = {
        "id": "market",
        "name": "农贸市场",
        "emoji": "🦐",
        "tag": "海鲜·需乘车",
        "desc": "农贸市场在镇郊，海鲜水产又鲜又全：带鱼、黄花鱼、鱿鱼、生蚝、蛤蜊……必须先有公交卡、小三轮或私家车才能去，一趟往返耗 1 小时。",
        "x": "67%",
        "y": "80%",
        "zone": "public"
    };

    window.Cake[NS]["garden"] = {
        "id": "garden",
        "name": "郊外菜园",
        "emoji": "🥬",
        "tag": "下地·需乘车",
        "desc": "菜摊老板在郊区有片小菜园自种自卖，下地、浇水、看收成，还能听 TA 唠贴摊补摊的讲究；隔壁水果摊的便宜货，也是这么来的。得有公交卡、小三轮或私家车才能去，一趟往返耗 1 小时。",
        "x": "55%",
        "y": "92%",
        "zone": "public"
    };

    window.Cake[NS]["orchard"] = {
        "id": "orchard",
        "name": "郊外果园",
        "emoji": "🍎",
        "tag": "采果·需乘车",
        "desc": "郊区果园自采自卖，隔壁水果摊的水果便宜，就是因为这儿是自家园子。进园看看果树、尝尝刚摘的果子，明白小镇水果便宜的来头。得有公交卡、小三轮或私家车才能去，一趟往返耗 1 小时。",
        "x": "82%",
        "y": "92%",
        "zone": "public"
    };

    window.Cake[NS]["government"] = {
        "id": "government",
        "name": "市政府",
        "emoji": "🏛️",
        "tag": "改名·义卖·活动",
        "desc": "市政府可以改名、改姓、改店名；政府每半年举办一次义卖活动，报名后能摆摊卖料理；也可以自己出资金和材料，请政府帮忙举办商业活动。镇长和秘书白天都在这里办公。",
        "x": "36%",
        "y": "54%",
        "zone": "public"
    };

    window.Cake[NS]["shelter"] = {
        "id": "shelter",
        "name": "动物收容所",
        "emoji": "🐶",
        "tag": "捐赠·志愿",
        "desc": "把多做的点心捐给流浪动物，攒友好度当志愿者；收容所对外开放，志愿者们每周有 2-3 天来当值，平时住在镇上各自的家里。",
        "x": "88%",
        "y": "64%",
        "zone": "public"
    };

    window.Cake[NS]["amusement"] = {
        "id": "amusement",
        "name": "游乐园",
        "emoji": "🎡",
        "tag": "游乐·放松",
        "desc": "欢乐街新开的游乐园：摩天轮、旋转木马、过山车、碰碰车，玩一圈心情大好，周末常有学生来玩。",
        "x": "70%",
        "y": "56%",
        "zone": "public"
    };
})();
