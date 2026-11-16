// js/data/characters/npcs/profiles_v53.js
// 【第二批移植 · v53 档案增量补丁】
// 来源：甜蜜物语-离线版-v53.html 框架区全镇合集 Zt（window.__TM_NPC__）。
// 与仓库既有 58 位镇民 id 完全一致（58/58），本文件只补仓库缺失的字段，
// 不覆盖任何已有值：7 人完全一致、51 人需补、零值冲突。
// 字段：rels / giftLine / loveGiftLine / dateLine / hiddenRels。
// 由 npcs/index.js 末尾 import，沿用「按地点分文件 + 横切补丁」的既有层级。
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.NPCS = window.Cake.NPCS || {};

    const PATCH = {
  "xiaotian": {
    "rels": [
      "苏建国、王秀英的女儿",
      "陈叙白的堂姐",
      "苏记甜品面包店店主"
    ]
  },
  "ahe": {
    "rels": [
      "陈永福、苏丽华的儿子",
      "苏晚晴的堂弟",
      "苏记甜品面包店·面点师"
    ]
  },
  "xiaomei": {
    "rels": [
      "林大海、赵春梅的女儿",
      "水果摊主"
    ]
  },
  "shen_jiaoyan": {
    "rels": [
      "沈国豪、韩雅琴的儿子",
      "沈嘉禾的哥哥",
      "收容所资助人"
    ]
  },
  "shen_jiahe": {
    "rels": [
      "沈国豪、韩雅琴的女儿",
      "沈嘉言的妹妹",
      "收容所会计"
    ]
  },
  "wen_yanzhou": {
    "rels": [
      "温守仁、罗秀清的儿子",
      "镇医院全科医生"
    ]
  },
  "yang_yinuo": {
    "rels": [
      "杨志强、陈美华的女儿",
      "镇医院护士长"
    ]
  },
  "su_jianguo": {
    "rels": [
      "苏晚晴的父亲",
      "苏丽华的哥哥",
      "苏记甜品面包店创始人"
    ]
  },
  "su_lihua": {
    "rels": [
      "陈叙白的母亲",
      "苏建国的妹妹",
      "苏记甜品面包店掌勺（退休）"
    ]
  },
  "duoduo": {
    "rels": [
      "周子昂、宋小雨的女儿",
      "幼儿园小朋友"
    ]
  },
  "dabao": {
    "rels": [
      "方远山、方雪梅的儿子",
      "方糖糖的哥哥",
      "小学一年级学生"
    ]
  },
  "fang_tangtang": {
    "rels": [
      "方远山、方雪梅的女儿",
      "大宝的妹妹",
      "小学三年级学生"
    ]
  },
  "chen_xiaobei": {
    "rels": [
      "陈远、王芳的儿子",
      "初一学生"
    ]
  },
  "su_xiaoya": {
    "rels": [
      "苏志远、柳青的女儿",
      "高二学生"
    ]
  },
  "gao_yang": {
    "rels": [
      "高建军、何静的儿子",
      "高三学生"
    ]
  },
  "zhou_ziang": {
    "rels": [
      "朵朵的父亲",
      "幼儿园老师"
    ]
  },
  "song_xiaoyu": {
    "rels": [
      "朵朵的母亲",
      "花店店主"
    ]
  },
  "fang_yuanshan": {
    "rels": [
      "大宝、糖糖的父亲",
      "小学教师"
    ]
  },
  "fang_xuemei": {
    "rels": [
      "大宝、糖糖的母亲",
      "图书管理员"
    ]
  },
  "chen_yuan": {
    "rels": [
      "陈小北的父亲",
      "公交车司机"
    ]
  },
  "wang_fang": {
    "rels": [
      "陈小北的母亲",
      "菜市场摊主"
    ]
  },
  "gao_jianjun": {
    "rels": [
      "高阳的父亲",
      "中学体育老师"
    ]
  },
  "he_jing": {
    "rels": [
      "高阳的母亲",
      "银行职员"
    ]
  },
  "su_zhiyuan": {
    "rels": [
      "苏小雅的父亲",
      "高中语文老师"
    ]
  },
  "liu_qing": {
    "rels": [
      "苏小雅的母亲",
      "服装店店主"
    ]
  },
  "du_ruoxi": {
    "rels": [
      "杜国栋、江雪的女儿",
      "幼儿园大班老师"
    ]
  },
  "bai_qiuqiu": {
    "rels": [
      "白世杰、姚静的女儿",
      "幼儿园小班老师"
    ]
  },
  "wang_xiuying": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "chen_yongfu": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "lin_dahai": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "zhao_chunmei": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "tian_guanglin": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "sun_yumei": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "xu_deming": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "liu_guifang": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "wen_shouren": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "luo_xiuqing": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "yang_zhiqiang": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "chen_meihua": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "gu_zhengping": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "chen_hulan": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "zheng_haibo": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "wu_lijuan": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "lin_mo": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "zhou_xiaoyun": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "du_guodong": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "jiang_xue": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "bai_shijie": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "yao_jing": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "shen_guohao": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。"
  },
  "han_yaqin": {
    "giftLine": "哎哟，这么客气呀，谢谢你啦！",
    "loveGiftLine": "这个可是我的心尖尖，你怎么知道的！",
    "dateLine": "有空常来坐坐，给你讲讲小镇的老故事。",
    "hiddenRels": [
      {
        "at": 240,
        "text": "义卖摊的旧相识：从田甜还在收容所做志愿者那年算起，这份心意已经伴着两人走了很多年。沈国豪心里有数，镇上再没第三个人知道。"
      }
    ]
  }
};

    for (const id of Object.keys(PATCH)) {
        const npc = window.Cake.NPCS[id];
        if (!npc) continue;                 // 只补已存在的镇民，不新建
        for (const k of Object.keys(PATCH[id])) {
            if (!(k in npc)) npc[k] = PATCH[id][k];   // 绝不覆盖既有值
        }
    }
    console.log('👥 [NPC/v53] 档案增量已补', Object.keys(PATCH).length, '位镇民');
})();
