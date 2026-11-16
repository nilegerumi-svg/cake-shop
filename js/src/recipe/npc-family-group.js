function getPartnerRelation(e) {
  return NPC_PARTNER_MAP[e];
}

const NPC_FAMILY_TREE = {
  xiaotian: {
    parents: ["su_jianguo", "wang_xiuying"],
    bestFriends: ["xiaomei", "yang_yinuo"],
    friends: ["ahe"],
    eternalFriends: ["xiaomei"],
  },
  ahe: {
    parents: ["chen_yongfu", "su_lihua"],
    bestFriends: ["zheng_zixuan"],
    friends: ["xiaotian", "gu_yifan"],
    eternalFriends: ["zheng_zixuan"],
  },
  xiaomei: {
    parents: ["lin_dahai", "zhao_chunmei"],
    bestFriends: ["xiaotian", "tian_tian"],
    friends: ["yang_yinuo"],
    eternalFriends: ["xiaotian"],
  },
  shen_jiaoyan: {
    parents: ["shen_guohao", "han_yaqin"],
    siblings: ["shen_jiahe"],
    bestFriends: ["gu_yifan"],
    friends: ["xu_xiaoman"],
    eternalFriends: ["gu_yifan"],
  },
  shen_jiahe: {
    parents: ["shen_guohao", "han_yaqin"],
    siblings: ["shen_jiaoyan"],
    bestFriends: ["yang_yinuo", "tian_tian"],
    friends: ["wen_yanzhou"],
    eternalFriends: ["tian_tian"],
  },
  xu_xiaoman: {
    parents: ["xu_deming", "liu_guifang"],
    bestFriends: ["zheng_zixuan"],
    friends: ["gu_yifan"],
    eternalFriends: ["zheng_zixuan"],
  },
  gu_yifan: {
    parents: ["gu_zhengping", "chen_hulan"],
    bestFriends: ["zheng_zixuan"],
    friends: ["xu_xiaoman"],
    eternalFriends: ["shen_jiaoyan"],
  },
  tian_tian: {
    parents: ["tian_guanglin", "sun_yumei"],
    bestFriends: ["lin_xiaolu", "shen_jiahe"],
    friends: ["xiaomei"],
    eternalFriends: ["shen_jiahe"],
  },
  zheng_zixuan: {
    parents: ["zheng_haibo", "wu_lijuan"],
    bestFriends: ["gu_yifan", "xu_xiaoman"],
    friends: ["ahe"],
    eternalFriends: ["ahe", "xu_xiaoman"],
  },
  lin_xiaolu: {
    parents: ["lin_mo", "zhou_xiaoyun"],
    bestFriends: ["tian_tian", "bai_qiuqiu"],
    friends: ["du_ruoxi"],
    eternalFriends: ["bai_qiuqiu"],
  },
  wen_yanzhou: {
    parents: ["wen_shouren", "luo_xiuqing"],
    bestFriends: ["yang_yinuo"],
    friends: ["xu_deming"],
    eternalFriends: ["yang_yinuo"],
  },
  yang_yinuo: {
    parents: ["yang_zhiqiang", "chen_meihua"],
    bestFriends: ["xiaotian", "shen_jiahe"],
    friends: ["wen_yanzhou"],
    eternalFriends: ["wen_yanzhou"],
  },
  du_ruoxi: {
    parents: ["du_guodong", "jiang_xue"],
    bestFriends: ["zhou_ziang"],
    friends: ["fang_yuanshan", "lin_xiaolu"],
    eternalFriends: ["zhou_ziang"],
  },
  bai_qiuqiu: {
    parents: ["bai_shijie", "yao_jing"],
    bestFriends: ["lin_xiaolu"],
    friends: ["song_xiaoyu"],
    eternalFriends: ["lin_xiaolu", "song_xiaoyu"],
  },
  su_jianguo: {
    siblings: ["su_lihua"],
    children: ["xiaotian"],
    friends: ["chen_yongfu"],
    eternalFriends: ["chen_yongfu"],
  },
  su_lihua: {
    siblings: ["su_jianguo"],
    children: ["ahe"],
    friends: ["wang_xiuying"],
    eternalFriends: ["wang_xiuying"],
  },
  zhou_ziang: {
    children: ["duoduo"],
    bestFriends: ["du_ruoxi"],
    friends: ["fang_yuanshan"],
    eternalFriends: ["du_ruoxi"],
  },
  song_xiaoyu: {
    children: ["duoduo"],
    bestFriends: ["bai_qiuqiu"],
    eternalFriends: ["bai_qiuqiu"],
  },
  fang_yuanshan: {
    children: ["dabao", "fang_tangtang"],
    bestFriends: ["gao_jianjun"],
    friends: ["zhou_ziang"],
    eternalFriends: ["gao_jianjun"],
  },
  fang_xuemei: {
    children: ["dabao", "fang_tangtang"],
    bestFriends: ["liu_qing"],
    eternalFriends: ["liu_qing"],
  },
  chen_yuan: {
    children: ["chen_xiaobei"],
    friends: ["zheng_haibo"],
    eternalFriends: ["wang_fang"],
  },
  wang_fang: { children: ["chen_xiaobei"], friends: ["wu_lijuan"], eternalFriends: ["chen_yuan"] },
  gao_jianjun: {
    children: ["gao_yang"],
    bestFriends: ["fang_yuanshan"],
    friends: ["su_zhiyuan"],
    eternalFriends: ["fang_yuanshan"],
  },
  he_jing: {
    children: ["gao_yang"],
    bestFriends: ["fang_xuemei"],
    eternalFriends: ["fang_xuemei"],
  },
  su_zhiyuan: { children: ["su_xiaoya"], friends: ["gao_jianjun"], eternalFriends: ["liu_qing"] },
  liu_qing: {
    children: ["su_xiaoya"],
    bestFriends: ["fang_xuemei"],
    eternalFriends: ["su_zhiyuan", "fang_xuemei"],
  },
  duoduo: { parents: ["zhou_ziang", "song_xiaoyu"], bestFriends: ["dabao", "fang_tangtang"] },
  dabao: {
    parents: ["fang_yuanshan", "fang_xuemei"],
    siblings: ["fang_tangtang"],
    bestFriends: ["duoduo"],
  },
  fang_tangtang: {
    parents: ["fang_yuanshan", "fang_xuemei"],
    siblings: ["dabao"],
    bestFriends: ["duoduo"],
  },
  chen_xiaobei: { parents: ["chen_yuan", "wang_fang"], bestFriends: ["gao_yang", "su_xiaoya"] },
  su_xiaoya: { parents: ["su_zhiyuan", "liu_qing"], bestFriends: ["gao_yang", "chen_xiaobei"] },
  gao_yang: { parents: ["gao_jianjun", "he_jing"], bestFriends: ["su_xiaoya", "chen_xiaobei"] },
  zhao_weimin: { friends: ["su_zhiyuan", "gao_jianjun"], eternalFriends: ["song_yanan"] },
  song_yanan: { friends: ["bai_qiuqiu", "du_ruoxi"], eternalFriends: ["zhao_weimin"] },
};

function getFamilyOf(e) {
  return NPC_FAMILY_TREE[e];
}

const ic = 1,
  Bo = 1,
  Do = 1,
  NPC_PROFILE_AHE = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["面点师", "手稳", "不爱说话"], mbti: "ISTP", mark: "苹果派才是真本事" },
  },
  NPC_PROFILE_BAI_QIUQIU = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["小班老师", "活泼", "爱睡觉"], mbti: "ISFP", mark: "周末就想睡个懒觉" },
  },
  NPC_PROFILE_BAI_SHIJIE = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["书店店主", "温和", "爱书"], mbti: "INFJ", mark: "绘本要挑最有趣的" },
  },
  NPC_PROFILE_CHEN_HULAN = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["护士", "温柔", "操劳"], mbti: "ISFJ", mark: "一帆从小就懂事" },
  },
  NPC_PROFILE_CHEN_MEIHUA = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["裁缝", "手巧", "细致"], mbti: "ISFP", mark: "量体裁衣差一厘都不行" },
  },
  NPC_PROFILE_CHEN_XIAOBEI = {
    gender: "男",
    ageGroup: "minor",
    persona: { tags: ["初一", "爱篮球", "孝顺"], mbti: "ISFJ", mark: "放学还要帮我妈收摊" },
  },
  NPC_PROFILE_CHEN_YONGFU = {
    gender: "男",
    ageGroup: "elder",
    persona: { tags: ["老木匠", "手稳", "话少"], mbti: "ISTP", mark: "手要稳心要细" },
  },
  NPC_PROFILE_CHEN_YUAN = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["公交司机", "憨厚", "热心"], mbti: "ESFJ", mark: "这条线我跑了十几年" },
  },
  NPC_PROFILE_DABAO = {
    gender: "男",
    ageGroup: "minor",
    persona: { tags: ["一年级", "活泼", "爱炫耀"], mbti: "ESTP", mark: "我数学考了一百分" },
  },
  NPC_PROFILE_DU_GUODONG = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["邮递员", "健谈", "热心"], mbti: "ESFJ", mark: "镇上的狗都认识我" },
  },
  NPC_PROFILE_DU_RUOXI = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["大班老师", "温柔", "爱孩子"], mbti: "ENFJ", mark: "孩子们的笑脸最治愈" },
  },
  NPC_PROFILE_DUODUO = {
    gender: "女",
    ageGroup: "minor",
    persona: { tags: ["幼儿园", "奶声奶气", "爱画画"], mbti: "ENFP", mark: "我最喜欢草莓蛋糕啦" },
  },
  NPC_PROFILE_FANG_TANGTANG = {
    gender: "女",
    ageGroup: "minor",
    persona: { tags: ["三年级", "爱画画", "嘴甜"], mbti: "ESFP", mark: "我画的向日葵像真的一样" },
  },
  NPC_PROFILE_FANG_XUEMEI = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["图书管理员", "安静", "爱读书"], mbti: "INFP", mark: "下午茶配司康最幸福" },
  },
  NPC_PROFILE_FANG_YUANSHAN = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["小学老师", "爱钓鱼", "温和"], mbti: "ISFP", mark: "周末河边钓鱼最自在" },
  },
  NPC_PROFILE_GAO_JIANJUN = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["体育老师", "爱运动", "嗓门亮"], mbti: "ESTP", mark: "生命在于运动" },
  },
  NPC_PROFILE_GAO_YANG = {
    gender: "男",
    ageGroup: "minor",
    persona: { tags: ["高三", "爱跑步", "压力大"], mbti: "ISTP", mark: "压力大的时候跑两圈就好" },
  },
  NPC_PROFILE_GU_YIFAN = {
    gender: "男",
    ageGroup: "adult",
    persona: {
      tags: ["留学生", "爱动物", "爱肉食"],
      mbti: "ESTP",
      mark: "德国猪肘一个人能干掉半个",
    },
  },
  NPC_PROFILE_GU_ZHENGPING = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["图书管理员", "安静", "爱书"], mbti: "INTP", mark: "图书馆的书我全记得位置" },
  },
  NPC_PROFILE_HAN_YAQIN = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["慈善理事", "温婉", "优雅"], mbti: "INFJ", mark: "做慈善在于用心" },
  },
  NPC_PROFILE_HE_JING = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["银行职员", "干练", "细心"], mbti: "ISTJ", mark: "账目要一厘不差" },
  },
  NPC_PROFILE_JIANG_XUE = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["音乐老师", "优雅", "爱唱歌"], mbti: "ENFP", mark: "教孩子们唱歌最开心" },
  },
  NPC_PROFILE_LIN_DAHAI = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["果园主", "黝黑", "爽朗"], mbti: "ESTP", mark: "今年的水蜜桃甜得很" },
  },
  NPC_PROFILE_LIN_MO = {
    gender: "男",
    ageGroup: "adult",
    persona: {
      tags: ["画材店主", "温和", "艺术范"],
      mbti: "INFP",
      mark: "颜料要买好的，画画才顺心",
    },
  },
  NPC_PROFILE_LIN_XIAOLU = {
    gender: "女",
    ageGroup: "adult",
    persona: {
      tags: ["插画师", "爱画画", "爱美食"],
      mbti: "INFP",
      mark: "画累了就做菜，做菜累了就画画",
    },
  },
  NPC_PROFILE_LIU_GUIFANG = {
    gender: "女",
    ageGroup: "adult",
    persona: {
      tags: ["食堂厨师", "慈爱", "手艺好"],
      mbti: "ISFJ",
      mark: "给孩子们做饭油盐要拿捏好",
    },
  },
  NPC_PROFILE_LIU_QING = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["服装店主", "优雅", "爱美"], mbti: "ESFP", mark: "甜点和漂亮衣服都是好朋友" },
  },
  NPC_PROFILE_LUO_XIUQING = {
    gender: "女",
    ageGroup: "elder",
    persona: { tags: ["药店药剂师", "唠叨", "热心"], mbti: "ESFJ", mark: "年轻人别熬夜，伤身体" },
  },
  NPC_PROFILE_SHEN_GUOHAO = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["董事长", "稳重", "讲良心"], mbti: "ENTJ", mark: "做生意要讲良心" },
  },
  NPC_PROFILE_SHEN_JIAHE = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["会计", "精打细算", "温柔"], mbti: "ISTJ", mark: "精打细算也是一种温柔" },
  },
  NPC_PROFILE_SHEN_JIAOYAN = {
    gender: "男",
    ageGroup: "adult",
    persona: {
      tags: ["资助人", "爱美食", "见多识广"],
      mbti: "ENTP",
      mark: "巴黎米其林不如街边小馆",
    },
  },
  NPC_PROFILE_SONG_XIAOYU = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["花店老板", "浪漫", "爱笑"], mbti: "ENFP", mark: "鲜花配蛋糕，节日两不误" },
  },
  NPC_PROFILE_SONG_YANAN = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["秘书", "利落", "爱草莓"], mbti: "ISTJ", mark: "流程走得顺，大家都省心" },
  },
  NPC_PROFILE_SU_JIANGUO = {
    gender: "男",
    ageGroup: "elder",
    persona: { tags: ["创始人", "老派", "爱讲古"], mbti: "ISTJ", mark: "配方要守，也要敢改" },
  },
  NPC_PROFILE_SU_LIHUA = {
    gender: "女",
    ageGroup: "elder",
    persona: { tags: ["掌勺", "退休", "疼晚辈"], mbti: "ESFJ", mark: "刚出炉的老式面包最香" },
  },
  NPC_PROFILE_SU_XIAOYA = {
    gender: "女",
    ageGroup: "minor",
    persona: { tags: ["高二", "爱学习", "自律"], mbti: "INTJ", mark: "最后一道大题好难" },
  },
  NPC_PROFILE_SU_ZHIYUAN = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["语文老师", "爱读书", "温和"], mbti: "INFJ", mark: "读书破万卷" },
  },
  NPC_PROFILE_SUN_YUMEI = {
    gender: "女",
    ageGroup: "adult",
    persona: {
      tags: ["快餐店老板", "麻利", "爽快"],
      mbti: "ESTP",
      mark: "快餐讲究快，味道不能糊弄",
    },
  },
  NPC_PROFILE_TIAN_GUANGLIN = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["菜摊主", "嗓门大", "实在"], mbti: "ESTJ", mark: "今天的青菜是清早现摘的" },
  },
  NPC_PROFILE_TIAN_TIAN = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["烘焙师", "爱东南亚菜", "热心"], mbti: "ENFP", mark: "香茅和椰浆搭配绝了" },
  },
  NPC_PROFILE_WANG_FANG = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["菜摊主", "嗓门大", "爽快"], mbti: "ESTP", mark: "今天的青菜水灵着呢" },
  },
  NPC_PROFILE_WANG_XIUYING = {
    gender: "女",
    ageGroup: "elder",
    persona: { tags: ["面点师", "慈爱", "爱说教"], mbti: "ISFJ", mark: "做点心要静得下心" },
  },
  NPC_PROFILE_WEN_SHOUREN = {
    gender: "男",
    ageGroup: "elder",
    persona: { tags: ["老中医", "沉稳", "爱讲理"], mbti: "INFJ", mark: "中西医各有各的门道" },
  },
  NPC_PROFILE_WEN_YANZHOU = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["医生", "加班", "养生"], mbti: "INTJ", mark: "熬夜全靠咖啡和甜点续命" },
  },
  NPC_PROFILE_WU_LIJUAN = {
    gender: "女",
    ageGroup: "adult",
    persona: {
      tags: ["超市店员", "细致", "疼孩子"],
      mbti: "ESFJ",
      mark: "超市的调料我闭着眼都知道在哪",
    },
  },
  NPC_PROFILE_XIAOMEI = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["水果控", "热情", "实在"], mbti: "ESFJ", mark: "自家园子种的水果最甜" },
  },
  NPC_PROFILE_XIAOTIAN = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["甜品控", "开朗", "爱尝鲜"], mbti: "ESFP", mark: "草莓蛋糕是镇上一绝" },
  },
  NPC_PROFILE_XU_DEMING = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["药剂师", "严谨", "疼孩子"], mbti: "ISTJ", mark: "配药要再三核对" },
  },
  NPC_PROFILE_XU_XIAOMAN = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["兽医", "细心", "爱日料"], mbti: "ISFP", mark: "关东煮冬天最治愈" },
  },
  NPC_PROFILE_YANG_YINUO = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["护士长", "细心", "红茶控"], mbti: "ISFJ", mark: "司康配红茶才是正经下午茶" },
  },
  NPC_PROFILE_YANG_ZHIQIANG = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["早点铺老板", "勤快", "实在"], mbti: "ESTJ", mark: "早起的客人有包子吃" },
  },
  NPC_PROFILE_YAO_JING = {
    gender: "女",
    ageGroup: "adult",
    persona: {
      tags: ["发型师", "时髦", "爱美"],
      mbti: "ESFP",
      mark: "剪头发要像做蛋糕一样看准下手",
    },
  },
  NPC_PROFILE_ZHAO_CHUNMEI = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["水果摊主", "嘴甜", "利索"], mbti: "ESFJ", mark: "卖相要好，口感更要好" },
  },
  NPC_PROFILE_ZHAO_WEIMIN = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["镇长", "稳重", "爱民"], mbti: "ESTJ", mark: "镇上多几家好店，我脸上也有光" },
  },
  NPC_PROFILE_ZHENG_HAIBO = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["修车师傅", "手巧", "爽快"], mbti: "ISTP", mark: "螺丝要拧到位" },
  },
  NPC_PROFILE_ZHENG_ZIXUAN = {
    gender: "男",
    ageGroup: "adult",
    persona: {
      tags: ["骑行队", "爱运动", "爱河粉"],
      mbti: "ESTP",
      mark: "骑行一百公里就为吃碗河粉",
    },
  },
  NPC_PROFILE_ZHOU_XIAOYUN = {
    gender: "女",
    ageGroup: "adult",
    persona: { tags: ["保育员", "温柔", "爱孩子"], mbti: "ISFP", mark: "孩子们午睡时最安静" },
  },
  NPC_PROFILE_ZHOU_ZIANG = {
    gender: "男",
    ageGroup: "adult",
    persona: { tags: ["幼儿园老师", "有耐心", "顾家"], mbti: "ISFJ", mark: "孩子笑脸就是动力" },
  },
  NPC_PROFILES_BY_ID = {
    ahe: NPC_PROFILE_AHE,
    bai_qiuqiu: NPC_PROFILE_BAI_QIUQIU,
    bai_shijie: NPC_PROFILE_BAI_SHIJIE,
    chen_hulan: NPC_PROFILE_CHEN_HULAN,
    chen_meihua: NPC_PROFILE_CHEN_MEIHUA,
    chen_xiaobei: NPC_PROFILE_CHEN_XIAOBEI,
    chen_yongfu: NPC_PROFILE_CHEN_YONGFU,
    chen_yuan: NPC_PROFILE_CHEN_YUAN,
    dabao: NPC_PROFILE_DABAO,
    du_guodong: NPC_PROFILE_DU_GUODONG,
    du_ruoxi: NPC_PROFILE_DU_RUOXI,
    duoduo: NPC_PROFILE_DUODUO,
    fang_tangtang: NPC_PROFILE_FANG_TANGTANG,
    fang_xuemei: NPC_PROFILE_FANG_XUEMEI,
    fang_yuanshan: NPC_PROFILE_FANG_YUANSHAN,
    gao_jianjun: NPC_PROFILE_GAO_JIANJUN,
    gao_yang: NPC_PROFILE_GAO_YANG,
    gu_yifan: NPC_PROFILE_GU_YIFAN,
    gu_zhengping: NPC_PROFILE_GU_ZHENGPING,
    han_yaqin: NPC_PROFILE_HAN_YAQIN,
    he_jing: NPC_PROFILE_HE_JING,
    jiang_xue: NPC_PROFILE_JIANG_XUE,
    lin_dahai: NPC_PROFILE_LIN_DAHAI,
    lin_mo: NPC_PROFILE_LIN_MO,
    lin_xiaolu: NPC_PROFILE_LIN_XIAOLU,
    liu_guifang: NPC_PROFILE_LIU_GUIFANG,
    liu_qing: NPC_PROFILE_LIU_QING,
    luo_xiuqing: NPC_PROFILE_LUO_XIUQING,
    shen_guohao: NPC_PROFILE_SHEN_GUOHAO,
    shen_jiahe: NPC_PROFILE_SHEN_JIAHE,
    shen_jiaoyan: NPC_PROFILE_SHEN_JIAOYAN,
    song_xiaoyu: NPC_PROFILE_SONG_XIAOYU,
    song_yanan: NPC_PROFILE_SONG_YANAN,
    su_jianguo: NPC_PROFILE_SU_JIANGUO,
    su_lihua: NPC_PROFILE_SU_LIHUA,
    su_xiaoya: NPC_PROFILE_SU_XIAOYA,
    su_zhiyuan: NPC_PROFILE_SU_ZHIYUAN,
    sun_yumei: NPC_PROFILE_SUN_YUMEI,
    tian_guanglin: NPC_PROFILE_TIAN_GUANGLIN,
    tian_tian: NPC_PROFILE_TIAN_TIAN,
    wang_fang: NPC_PROFILE_WANG_FANG,
    wang_xiuying: NPC_PROFILE_WANG_XIUYING,
    wen_shouren: NPC_PROFILE_WEN_SHOUREN,
    wen_yanzhou: NPC_PROFILE_WEN_YANZHOU,
    wu_lijuan: NPC_PROFILE_WU_LIJUAN,
    xiaomei: NPC_PROFILE_XIAOMEI,
    xiaotian: NPC_PROFILE_XIAOTIAN,
    xu_deming: NPC_PROFILE_XU_DEMING,
    xu_xiaoman: NPC_PROFILE_XU_XIAOMAN,
    yang_yinuo: NPC_PROFILE_YANG_YINUO,
    yang_zhiqiang: NPC_PROFILE_YANG_ZHIQIANG,
    yao_jing: NPC_PROFILE_YAO_JING,
    zhao_chunmei: NPC_PROFILE_ZHAO_CHUNMEI,
    zhao_weimin: NPC_PROFILE_ZHAO_WEIMIN,
    zheng_haibo: NPC_PROFILE_ZHENG_HAIBO,
    zheng_zixuan: NPC_PROFILE_ZHENG_ZIXUAN,
    zhou_xiaoyun: NPC_PROFILE_ZHOU_XIAOYUN,
    zhou_ziang: NPC_PROFILE_ZHOU_ZIANG,
  },
  MBTI_LABELS = {
    ISTJ: "物流师",
    ISFJ: "守卫者",
    INFJ: "提倡者",
    INTJ: "建筑师",
    ISTP: "鉴赏家",
    ISFP: "探险家",
    INFP: "调停者",
    INTP: "逻辑学家",
    ESTP: "企业家",
    ESFP: "表演者",
    ENFP: "竞选者",
    ENTP: "辩论家",
    ESTJ: "总经理",
    ESFJ: "执政官",
    ENFJ: "主人公",
    ENTJ: "指挥官",
  },
  NPC_PERSONAS = Object.fromEntries(Object.entries(NPC_PROFILES_BY_ID).map(([e, n]) => [e, n.persona])),
  DEFAULT_PERSONA = { tags: ["小镇居民", "随和", "爱热闹"], mbti: "ISFJ", mark: "镇上的日子越过越有滋味" };

function personaOf(e) {
  return NPC_PERSONAS[e] ?? DEFAULT_PERSONA;
}

function mbtiOf(e) {
  return personaOf(e).mbti;
}

const z2 = 80,
  MINOR_NPC_IDS = new Set(
    Object.entries(NPC_PROFILES_BY_ID)
      .filter(([, e]) => e.ageGroup === "minor")
      .map(([e]) => e),
  );

function isMinorNpc(e) {
  return MINOR_NPC_IDS.has(e);
}

function hashStringSeed(e, n) {
  let s = 5381;
  for (let a = 0; a < e.length; a += 1) s = ((s * 33) ^ e.charCodeAt(a)) >>> 0;
  return s % n;
}

const ELDER_NPC_IDS = new Set(
  Object.entries(NPC_PROFILES_BY_ID)
    .filter(([, e]) => e.ageGroup === "elder")
    .map(([e]) => e),
);

function ageGroupOfNpc(e) {
  return MINOR_NPC_IDS.has(e) ? "minor" : ELDER_NPC_IDS.has(e) ? "elder" : "adult";
}

const ACTION_GROUP_IDS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"],
  ACTION_GROUPS = {
    a: {
      id: "a",
      name: "集市摆摊",
      emoji: "🧺",
      desc: "在节日集市摆摊卖货，招呼顾客、收摊数钱。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "早起备货理摊",
          emoji: "🧺",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "plaza",
          activity: "在{festival}集市上摆摊卖货",
          emoji: "🧺",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "plaza",
          activity: "在{festival}集市上招呼顾客",
          emoji: "🧺",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "plaza",
          activity: "集市上忙得热火朝天",
          emoji: "🧺",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "@home",
          activity: "收摊回家数钱",
          emoji: "🧺",
          access: "private",
        },
      ],
      variants: ["帮隔壁摊主看会儿摊", "在集市上吆喝揽客"],
    },
    b: {
      id: "b",
      name: "看表演凑热闹",
      emoji: "🎭",
      desc: "跟着人群看表演、凑热闹，逛到哪儿算哪儿。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "早起收拾利索准备出门",
          emoji: "😴",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "plaza",
          activity: "在{festival}上看表演凑热闹",
          emoji: "🎭",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "street",
          activity: "在商店街闲逛看热闹",
          emoji: "🎭",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "plaza",
          activity: "在广场上看杂耍彩排",
          emoji: "🎪",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "plaza",
          activity: "晚上接着看演出",
          emoji: "🎆",
          access: "public",
        },
      ],
      variants: ["跟着锣鼓声去广场凑热闹", "和街坊挤在前排看表演"],
    },
    c: {
      id: "c",
      name: "游园赏景",
      emoji: "🌸",
      desc: "趁节日去公园逛逛，看看花看看景。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "收拾好心情出门逛逛",
          emoji: "😴",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "park",
          activity: "在公园游园赏景",
          emoji: "🌸",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "park",
          activity: "在花丛边走走停停",
          emoji: "🌸",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "river",
          activity: "在河边吹风看景",
          emoji: "🌿",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "@home",
          activity: "回家歇着",
          emoji: "🏠",
          access: "private",
        },
      ],
      variants: ["在花丛边拍照", "湖边喂锦鲤"],
    },
    d: {
      id: "d",
      name: "探亲访友",
      emoji: "🧧",
      desc: "走亲访友拜年问好，串门送礼唠家常。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "备好礼物准备出门",
          emoji: "🧧",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "residential",
          activity: "走亲访友拜年问好",
          emoji: "🧧",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "street",
          activity: "买点礼物串门",
          emoji: "🎁",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "residential",
          activity: "在亲戚家唠家常",
          emoji: "🍵",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "@home",
          activity: "和家人聚餐",
          emoji: "🍲",
          access: "private",
        },
      ],
      variants: ["提着点心盒挨家串门", "和亲戚围坐喝茶聊近况"],
    },
    e: {
      id: "e",
      name: "店里帮忙",
      emoji: "🛍️",
      desc: "节日里留在店里帮忙招呼客人。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "早起准备开店",
          emoji: "🛍️",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "street",
          activity: "在店里帮忙招呼客人",
          emoji: "🛍️",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "street",
          activity: "在店里理货补货",
          emoji: "🛍️",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "street",
          activity: "店里客人多，忙得脚不沾地",
          emoji: "🛍️",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "@home",
          activity: "回家歇着",
          emoji: "🏠",
          access: "private",
        },
      ],
      variants: ["帮店里给客人打包", "在店门口迎客揽生意"],
    },
    f: {
      id: "f",
      name: "祈福许愿",
      emoji: "🏮",
      desc: "趁着节日祈福许愿，放灯求个好兆头。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "早起洗漱准备出门",
          emoji: "😴",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "plaza",
          activity: "在{festival}上祈福许愿",
          emoji: "🏮",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "river",
          activity: "在河边放灯许愿",
          emoji: "✨",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "plaza",
          activity: "在庙会里转转求个平安",
          emoji: "🏮",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "@home",
          activity: "回家歇着",
          emoji: "🏠",
          access: "private",
        },
      ],
      variants: ["在许愿树下挂上心愿牌", "给家人求个平安符"],
    },
    g: {
      id: "g",
      name: "美食聚餐",
      emoji: "🍽️",
      desc: "采购节日美食，和伙伴们聚餐尝鲜。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "早起琢磨今天吃什么",
          emoji: "😴",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "street",
          activity: "采购{festival}美食食材",
          emoji: "🛒",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "street",
          activity: "和伙伴们聚餐尝美食",
          emoji: "🍽️",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "street",
          activity: "在夜市上边逛边吃",
          emoji: "🍢",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "@home",
          activity: "在家吃团圆饭",
          emoji: "🥟",
          access: "private",
        },
      ],
      variants: ["和伙伴拼桌尝尝各家小吃", "给聚餐的伙伴们添几道菜"],
    },
    h: {
      id: "h",
      name: "游戏竞技",
      emoji: "🎪",
      desc: "参加节日游戏竞技，套圈投壶玩个痛快。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "早起准备出门",
          emoji: "😴",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "park",
          activity: "在公园玩套圈投壶",
          emoji: "🎯",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "plaza",
          activity: "参加{festival}游戏竞技",
          emoji: "🎪",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "plaza",
          activity: "在游乐项目前排起了队",
          emoji: "🎯",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "@home",
          activity: "回家歇着",
          emoji: "🏠",
          access: "private",
        },
      ],
      variants: ["和伙伴比试踢毽子", "在灯谜区猜谜赢奖品"],
    },
    i: {
      id: "i",
      name: "工坊赶工",
      emoji: "🔨",
      desc: "节日里在工坊赶制节日货品。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "早起接着赶工",
          emoji: "🔨",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "street",
          activity: "在工坊赶制节日货品",
          emoji: "🔨",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "street",
          activity: "在工坊里打磨新货",
          emoji: "🔨",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "street",
          activity: "把赶好的货送到集市上",
          emoji: "🔨",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "@home",
          activity: "回家歇着",
          emoji: "🏠",
          access: "private",
        },
      ],
      variants: ["在工坊里赶制最后一批货", "和工友一起赶节日订单"],
    },
    j: {
      id: "j",
      name: "居家歇着",
      emoji: "🏠",
      desc: "节日里留在家里歇着，备点年货看家。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "在家睡个懒觉",
          emoji: "😴",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "@home",
          activity: "在家歇着备点年货",
          emoji: "🏠",
          access: "private",
        },
        {
          start: 12,
          end: 16,
          place: "@home",
          activity: "在家歇着收拾屋子",
          emoji: "🏠",
          access: "private",
        },
        {
          start: 16,
          end: 20,
          place: "@home",
          activity: "在家准备晚饭",
          emoji: "🍲",
          access: "private",
        },
        {
          start: 20,
          end: 24,
          place: "@home",
          activity: "在家过节",
          emoji: "🛋️",
          access: "private",
        },
      ],
      variants: ["在家包饺子蒸点心", "把家里收拾得干干净净过节"],
    },
    k: {
      id: "k",
      name: "观灯夜游",
      emoji: "✨",
      desc: "白天逛灯市，晚上看灯会观灯夜游。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "早起准备出门",
          emoji: "😴",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "street",
          activity: "在街上逛灯市",
          emoji: "🏮",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "street",
          activity: "沿街看各式花灯",
          emoji: "🏮",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "plaza",
          activity: "在{festival}灯会上观灯夜游",
          emoji: "✨",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "plaza",
          activity: "在{festival}灯会上流连忘返",
          emoji: "✨",
          access: "public",
        },
      ],
      variants: ["看放河灯许愿", "沿街赏彩灯猜灯谜"],
    },
    l: {
      id: "l",
      name: "走街串巷",
      emoji: "🚶",
      desc: "走街串巷到处转转，见见熟人。",
      slots: [
        { start: 0, end: 4, place: "@home", activity: "在家休息", emoji: "😴", access: "private" },
        {
          start: 4,
          end: 8,
          place: "@home",
          activity: "早起出门遛弯",
          emoji: "😴",
          access: "private",
        },
        {
          start: 8,
          end: 12,
          place: "street",
          activity: "走街串巷到处转转",
          emoji: "🚶",
          access: "public",
        },
        {
          start: 12,
          end: 16,
          place: "street",
          activity: "在街口和熟人唠嗑",
          emoji: "🚶",
          access: "public",
        },
        {
          start: 16,
          end: 20,
          place: "street",
          activity: "沿街看热闹看新招牌",
          emoji: "🚶",
          access: "public",
        },
        {
          start: 20,
          end: 24,
          place: "@home",
          activity: "回家歇着",
          emoji: "🏠",
          access: "private",
        },
      ],
      variants: ["从东街逛到西街", "在桥边看风景歇歇脚"],
    },
  },
  FESTIVAL_EVENT_GROUP_MAP = {
    new_year: "a",
    lantern: "k",
    new_year_solar: "b",
    valentine: "c",
    sakura: "c",
    labor: "l",
    sweet_fest: "g",
    qixi: "f",
    mid_autumn: "g",
    harvest: "a",
    national: "b",
    winter_solstice: "j",
    christmas: "k",
  },
  FESTIVAL_SECONDARY_GROUPS = {
    new_year: ["d", "g", "b"],
    lantern: ["f", "a", "h"],
    new_year_solar: ["a", "g", "k"],
    valentine: ["g", "b", "e"],
    sakura: ["h", "b", "g"],
    labor: ["b", "h", "g"],
    sweet_fest: ["a", "e", "b"],
    qixi: ["k", "c", "b"],
    mid_autumn: ["d", "f", "k"],
    harvest: ["g", "e", "l"],
    national: ["h", "k", "a"],
    winter_solstice: ["g", "d", "f"],
    christmas: ["g", "f", "a"],
  };

function buildGroupWeightTable(e, n) {
  const s = {},
    a = [];
  for (const u of ACTION_GROUP_IDS)
    u === e ? (s[u] = 0.25) : n.includes(u) ? (s[u] = 0.1) : ((s[u] = 0), a.push(u));
  const o = (1 - 0.25 - 0.1 * n.length) / a.length;
  for (const u of a) s[u] = o;
  const l = a[a.length - 1],
    c = ACTION_GROUP_IDS.reduce((u, f) => u + s[f], 0);
  return ((s[l] = Math.max(0, s[l] - (c - 1))), s);
}

const FESTIVAL_GROUP_WEIGHTS = Object.fromEntries(Object.keys(FESTIVAL_EVENT_GROUP_MAP).map((e) => [e, buildGroupWeightTable(FESTIVAL_EVENT_GROUP_MAP[e], FESTIVAL_SECONDARY_GROUPS[e] ?? [])]));

function groupWeightOf(e, n) {
  const s = FESTIVAL_GROUP_WEIGHTS[e];
  return s ? (s[n] ?? 0) : 1 / ACTION_GROUP_IDS.length;
}

function groupIdsForFestival(e, n) {
  return ACTION_GROUP_IDS.filter((s) => n || s !== "a");
}

const GROUP_CHAT_LINES = {
  a: [
    "今天摊子上的货卖得可快了，差点补不上",
    "收摊的时候数钱最开心，一天没白忙",
    "摆摊最怕下雨，还好今天天气好",
    "隔壁摊的老板人很好，边摆摊边聊天特别来劲",
  ],
  b: [
    "台上节目一个接一个，看得眼睛都不够用",
    "人太多了，我踮着脚才看清表演",
    "跟着大家一起鼓掌起哄，过节就该这样热闹",
    "看完这场我还要去另一头看看还有啥节目",
  ],
  c: [
    "花开得正好，随手一拍都是画",
    "沿着小路慢慢逛，风一吹花瓣直往身上落",
    "今天人少景美，逛着特别舒心",
    "逛累了找个长椅坐坐，看看风景歇歇脚",
  ],
  d: [
    "走了一上午亲戚，腿都细了",
    "串门就得带点礼，空手上门多不好意思",
    "好久没见的老朋友，一聊就是半天",
    "亲戚家的小孩又长高了一截，真快",
  ],
  e: [
    "节日里店里最忙，走不开呀",
    "客人一波接一波，招呼得嗓子都哑了",
    "帮店里多卖点货，过节也踏实",
    "忙归忙，看到客人满意我就高兴",
  ],
  f: [
    "我许了个愿，希望全家都平平安安",
    "灯笼一点起来，心里也跟着亮堂",
    "把愿望写在灯上放出去，盼着能实现",
    "祈福的人真多，队伍排得老长",
  ],
  g: [
    "这顿吃得太满足了，肚子都圆了",
    "大家围坐一桌，边吃边聊才有过节的样子",
    "我特意留了肚子，就等着今晚这顿",
    "吃完这顿，明天再想着减肥吧",
  ],
  h: [
    "套圈我中了两个，手气不错吧",
    "投壶看着简单，玩起来可真难",
    "输赢不重要，玩得开心就行",
    "跟熟人比试了一把，输得心服口服",
  ],
  i: [
    "节日订单多，得赶工把货备足",
    "手上活没停过，但心里踏实",
    "赶完这批货，明天就能安心过节了",
    "手艺人过节也闲不住，习惯啦",
  ],
  j: [
    "在家歇着最舒服，哪儿也不用去",
    "备了点好吃的，就等着晚上开饭",
    "外面太挤了，在家清静清静",
    "把家里收拾收拾，干干净净过节",
  ],
  k: [
    "灯一盏比一盏好看，看都看不够",
    "提着灯笼逛灯会，孩子们最开心",
    "灯影倒映在河面上，好看极了",
    "逛完灯会再买盏小花灯带回家",
  ],
  l: [
    "一条街走到头，又从另一条街绕回来",
    "路上碰到好几个熟人，边走边聊",
    "走街串巷才发现小镇变化真不小",
    "腿走酸了，回家歇歇再出来",
  ],
};

function residenceKeyOf(e) {
  var s;
  const n = ((s = NPC_RESIDENCE[e]) == null ? void 0 : s.detail) ?? "";
  return n.includes("文苑")
    ? "wenyuan"
    : n.includes("安康")
      ? "ankang"
      : n.includes("梧桐里")
        ? "wutongli"
        : n.includes("苏记")
          ? "sujizhai"
          : "residential";
}

function householdKeyOf(e) {
  var o;
  const n = (o = getPartnerRelation(e)) == null ? void 0 : o.partner;
  if (n) return [e, n].sort().join("&");
  const s = getFamilyOf(e),
    a = s ? [e, ...(s.children ?? []), ...(s.parents ?? [])] : [e];
  return [...new Set(a)].sort().join("&");
}

function streetSideOf(e) {
  return hashStringSeed(`${householdKeyOf(e)}:festival-street-v1`, 10) < 5 ? "eaststreet" : "weststreet";
}

function resolvePlaceKey(e, n) {
  return e === "@home" || e === "residential" ? residenceKeyOf(n) : e === "street" ? streetSideOf(n) : e;
}

function slotOfActionGroup(e, n) {
  const s = ACTION_GROUPS[e];
  return s ? (s.slots.find((a) => n >= a.start && n < a.end) ?? null) : null;
}

const PLACE_LABELS = {
    home: "我家",
    bakery: "蛋糕店",
    residential: "居民区",
    villa: "别墅区",
    street: "商店街",
    wenyuan: "文苑小区",
    ankang: "安康苑",
    wutongli: "梧桐里",
    sujizhai: "苏记老宅",
    eaststreet: "东商店街",
    weststreet: "西商店街",
    park: "公园",
    school: "学校",
    middleschool: "广场中学",
    highschool: "高中",
    away: "外地",
    river: "河边",
    library: "图书馆",
    shelter: "动物收容所",
    plaza: "小镇广场",
    hospital: "医院",
    market: "农贸市场",
    garden: "郊外菜园",
    orchard: "郊外果园",
    government: "市政府",
    suji: "苏记甜品面包店",
    fruit: "水果摊",
    veg: "菜市场",
    fastfood: "快餐店",
    furniture: "家具店",
    supermarket: "综合超市",
    bank: "银行",
    flower: "花店",
    clothes: "服装店",
    salon: "理发店",
    bookstore: "书店",
    fabric: "布料行",
    amusement: "游乐园",
    shangjie: "商店街",
    foodstreet: "美食街",
    streets: "小镇街道",
    binhe: "滨河路",
    xuelu: "学府路",
    zhengwu: "政务街",
    anjuan: "安居巷",
    tianyuan: "田园路",
    qingcao: "青草坡",
    zhongyang: "中央广场",
  },
  STALL_SELLER_IDS = new Set([
    "su_jianguo",
    "su_lihua",
    "wang_xiuying",
    "xiaotian",
    "ahe",
    "xiaomei",
    "zhao_chunmei",
    "lin_dahai",
    "tian_guanglin",
    "sun_yumei",
    "wang_fang",
    "song_xiaoyu",
    "liu_qing",
    "wu_lijuan",
    "bai_shijie",
    "lin_mo",
    "yao_jing",
    "chen_meihua",
    "yang_zhiqiang",
    "chen_yongfu",
    "zheng_haibo",
    "tian_tian",
  ]),
  STALL_WORK_RE = /摊|卖货|数钱/;

function isStallSeller(e) {
  return !e || isMinorNpc(e) ? !1 : STALL_SELLER_IDS.has(e);
}

function isStallWorkText(e) {
  return typeof e == "string" && STALL_WORK_RE.test(e);
}

const GROUP_EVENT_MIN = 5;

let festivalEventCache = null;

function festivalNameOf(e) {
  var n;
  return ((n = FESTIVALS.find((s) => s.id === e)) == null ? void 0 : n.name) ?? "节日";
}

function getFestivalEventForNpc(e, n, s) {
  if (!isFestivalDay(n)) return null;
  const a = `${n}-${s}`;
  return ((!festivalEventCache || festivalEventCache.key !== a) && (festivalEventCache = { key: a, ...buildFestivalEventMaps(n, s) }), festivalEventCache.map.get(e) ?? null);
}

function getFestivalEventModes(e, n) {
  if (!isFestivalDay(e)) return null;
  const s = `${e}-${n}`;
  return ((!festivalEventCache || festivalEventCache.key !== s) && (festivalEventCache = { key: s, ...buildFestivalEventMaps(e, n) }), festivalEventCache.modeMap);
}

function pickFestivalGroupEvent(e, n, s, a, o, l) {
  const c = groupIdsForFestival(e, n).filter((x) => !l.includes(x));
  if (c.length === 0) return null;
  const u = c.reduce((x, m) => x + groupWeightOf(e, m), 0);
  if (u <= 0) return null;
  const f = (hashStringSeed(`${s}:festival-draw:${a}:${o}:${l.length}`, 1e6) / 1e6) * u;
  let g = 0;
  for (const x of c) if (((g += groupWeightOf(e, x)), f < g)) return x;
  return c[c.length - 1];
}

function pickEventVariant(e, n, s, a, o, l) {
  const c = ACTION_GROUPS[e],
    u = (c == null ? void 0 : c.variants) ?? [],
    g =
      u.length > 0 && (n.access === "public" || (e === "j" && n.start >= 8))
        ? [n.activity, ...u]
        : [n.activity],
    x = hashStringSeed(`${s}:festival-variant:${a}:${o}:${e}`, g.length);
  return g[x].replaceAll("{festival}", l);
}

function buildFestivalEventMaps(e, n) {
  const s = new Map(),
    a = new Map(),
    o = isFestivalDay(e);
  if (!o) return { map: s, modeMap: a };
  const l = festivalNameOf(o),
    c = n - (n % 4),
    u = Object.keys(NPC_RUNTIME_DATA).sort(
      (x, m) => hashStringSeed(`${x}:festival-order-v2:${e}`, 1e6) - hashStringSeed(`${m}:festival-order-v2:${e}`, 1e6),
    ),
    f = new Map(),
    g = (x) => (f.get(x) ?? 0) < GROUP_EVENT_MIN;
  for (const x of u) {
    const m = isStallSeller(x),
      p = residenceAreaKeyOf(x),
      y = [];
    let j = null;
    for (;;) {
      const w = pickFestivalGroupEvent(o, m, x, e, c, y);
      if (!w) break;
      y.push(w);
      const N = slotOfActionGroup(w, n);
      if (!N) continue;
      const S = resolvePlaceKey(N.place, x);
      if (N.access === "private" || (S !== p && g(S))) {
        j = { slot: N, place: S, mode: w };
        break;
      }
    }
    if (!j) {
      (s.set(x, {
        start: n,
        end: n + 1,
        place: p,
        activity: "在家过节，晚点再出门逛逛",
        emoji: "🏠",
        access: "private",
      }),
        a.set(x, "j"));
      continue;
    }
    const v = pickEventVariant(j.mode, j.slot, x, e, c, l);
    (j.slot.access === "public" && f.set(j.place, (f.get(j.place) ?? 0) + 1),
      s.set(x, {
        start: j.slot.start,
        end: j.slot.end,
        place: j.place,
        activity: v,
        emoji: j.slot.emoji,
        access: j.slot.access,
      }),
      a.set(x, j.mode));
  }
  return { map: s, modeMap: a };
}

function residenceAreaKeyOf(e) {
  var s;
  const n = (s = NPC_RESIDENCE[e]) == null ? void 0 : s.area;
  return n === "别墅区" ? "villa" : n === "学校" ? "shelter" : residenceKeyOf(e);
}

function isFestivalDay(e) {
  const n = dayToDate(e),
    s = getLunarDate(e);
  for (const a of FESTIVALS)
    if (a.lunar) {
      if (s.month === a.month && s.day === a.day) return a.id;
    } else if (n.month === a.month && n.day === a.day) return a.id;
  return null;
}

function festivalEventGroupOf(e) {
  return FESTIVAL_EVENT_GROUP_MAP[e] ?? "b";
}

function getFestivalEventById(e, n, s) {
  return getFestivalEventForNpc(e, n, s);
}

function getFestivalEventByMode(e, n, s) {
  const a = getFestivalEventModes(n, s);
  return a ? (a.get(e) ?? null) : null;
}

const SCHOOL_PLACES = ["school", "middleschool", "highschool"];

function isNpcWorkingDay(e, n) {
  const s = typeof n == "number" ? n : 1;
  if (isWeekendDay(s)) return !1;
  const a = NPC_WORK_DAYS[e];
  return Array.isArray(a) && a.includes(weekdayOf(s));
}

function isSchoolPlace(e) {
  return SCHOOL_PLACES.includes(e);
}

function sortSchedules(e, n) {
  if (!Array.isArray(e) || e.length === 0) return e;
  const s = [...e].sort((m, p) => m.start - p.start),
    a = s[0],
    o = s[s.length - 1],
    l =
      n && o.access === "private"
        ? o.place === "residential"
          ? residenceAreaKeyOf(n)
          : o.place
        : n
          ? residenceAreaKeyOf(n)
          : "residential",
    u = o.access === "private" && /宿舍/.test(o.activity) ? "在宿舍楼串门聊天" : "在小区里串门散步",
    f = "🚶",
    g = [];
  if (
    (a.start > 6 &&
      g.push({
        start: 6,
        end: Math.min(7, a.start),
        place: l,
        activity: "起床洗漱",
        emoji: "🪞",
        access: "private",
      }),
    a.start > 7 &&
      g.push({
        start: 7,
        end: a.start,
        place: l,
        activity: "吃早餐，准备出门",
        emoji: "🥣",
        access: "private",
      }),
    o.access === "private" && /回家|在家|休息|睡觉|复习/.test(o.activity))
  ) {
    const m = Math.min(o.end, 19);
    (g.push(...s.slice(0, -1), { ...o, end: m }),
      m < 21 && g.push({ start: m, end: 21, place: l, activity: u, emoji: f, access: "public" }),
      g.push({
        start: 21,
        end: 24,
        place: l,
        activity: "洗漱睡觉",
        emoji: "😴",
        access: "private",
      }));
  } else {
    g.push(...s);
    const m = g[g.length - 1];
    m.end < 19 &&
      g.push({
        start: m.end,
        end: 19,
        place: l,
        activity: "回家休息",
        emoji: "🏠",
        access: "private",
      });
    const p = g[g.length - 1];
    (p.end < 21 &&
      g.push({
        start: Math.max(p.end, 19),
        end: 21,
        place: l,
        activity: u,
        emoji: f,
        access: "public",
      }),
      g.push({
        start: 21,
        end: 24,
        place: l,
        activity: "洗漱睡觉",
        emoji: "😴",
        access: "private",
      }));
  }
  if (n) {
    const m = residenceAreaKeyOf(n);
    return g.map((p) => (p.place === "residential" ? { ...p, place: m } : p));
  }
  return g;
}

const PUBLIC_EVENT_PLACES = ["park", "plaza", "river"],
  PRIVATE_ACTIVITY_RE = /^(?:和|带|陪|全)[\u4e00-\u9fa5]{1,4}/;

function isPublicActivity(e) {
  return !e || e.access !== "public" || PRIVATE_ACTIVITY_RE.test(e.activity)
    ? !1
    : !!(PUBLIC_EVENT_PLACES.includes(e.place) || (e.place === "street" && /逛|遛|散步|玩|兜风/.test(e.activity)));
}

function getCloseNpcIds(e) {
  const n = [],
    s = getPartnerRelation(e);
  s && s.partner && n.push(s.partner);
  const a = getFamilyOf(e);
  return (
    a &&
      (Array.isArray(a.children) && n.push(...a.children),
      Array.isArray(a.parents) && n.push(...a.parents),
      Array.isArray(a.siblings) && n.push(...a.siblings),
      Array.isArray(a.bestFriends) && n.push(...a.bestFriends),
      Array.isArray(a.friends) && n.push(...a.friends)),
    n
  );
}

const scheduleCache = new Map();

function getNpcScheduleForDay(e, n, s) {
  const o = isWeekendDay(s) ? NPC_SCHEDULES[e] : isNpcWorkingDay(e, s) ? NPC_SCHEDULES_ALL[e] : (EXTRA_SCHEDULES[e] ?? NPC_SCHEDULES_ALL[e]);
  return !Array.isArray(o) || o.length === 0
    ? null
    : (sortSchedules(o, e).find((l) => n >= l.start && n < l.end) ?? null);
}

function buildScheduleIndex(e, n) {
  var u, f;
  const s = `${e}-${n}`,
    a = scheduleCache.get(s);
  if (a) return a;
  const o = {},
    l = new Set(),
    c = Object.keys(NPC_RUNTIME_DATA).sort();
  for (const g of c) {
    if (l.has(g)) continue;
    const x = getNpcScheduleForDay(g, n, e);
    if (!(!x || !isPublicActivity(x)))
      for (const m of getCloseNpcIds(g)) {
        if (m === g || l.has(m) || !Object.prototype.hasOwnProperty.call(NPC_RUNTIME_DATA, m)) continue;
        const p = getNpcScheduleForDay(m, n, e);
        if (!p || !isPublicActivity(p) || x.place !== p.place) continue;
        const y = g < m ? g : m,
          j = g < m ? m : g,
          v = g < m ? x : p,
          w = ((u = NPC_RUNTIME_DATA[y]) == null ? void 0 : u.name) ?? "",
          N = ((f = NPC_RUNTIME_DATA[j]) == null ? void 0 : f.name) ?? "";
        ((o[y] = {
          partner: j,
          partnerName: N,
          place: v.place,
          activity: v.activity,
          emoji: v.emoji,
        }),
          (o[j] = {
            partner: y,
            partnerName: w,
            place: v.place,
            activity: v.activity,
            emoji: v.emoji,
          }),
          l.add(g),
          l.add(m));
        break;
      }
  }
  return (scheduleCache.set(s, o), o);
}
