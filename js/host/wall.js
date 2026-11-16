
/* ============================================================
   【手写区 · 文案墙（v50）】只读界面，不改任何游戏状态。
   数据来源：本块内 WALL_* 数组（v50 首批，随每轮猎虫补挂）；
   小传内容只收录公开档案信息，隐秘关系内容仍按人物志的
   门槛规则留在档案侧，墙面不剧透。
   PC 滚轮：经 window.__TM_WALL_SCROLL__ 挂进 tm-pc-input
   的 scrollerFor 解析链（弹窗 > 人物志 > 文案墙 > 面板区）。
   ============================================================ */
(function(){
"use strict";
if(window.__TM_WALL_UI__)return;window.__TM_WALL_UI__=true;
var D=document;
function el(tag,cls,text){var n=D.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}
/* ---------- 数据区：v50 首批，随每轮猎虫顺手补挂 ---------- */
var WALL_PROFILES=[
  {name:"韩雅琴",tag:"义卖摊常客",text:"广场的慈善义卖摊前，气质温婉的女士正把义卖款放进捐款箱，抬头对你一笑：「你好呀，我是韩雅琴，嘉言和嘉禾的妈妈。两个孩子一个满世界跑、一个守着账本，都是好孩子——收容所的事，还请你多费心啦。」"}
];
var WALL_EGGS=[
  "两个节日撞在同一天时，只有头一个发加成——现实里也有国庆撞中秋，就当店主少忙一天。",
  "镇上的第一日是正月初一，春节从初一到初七放足七天。",
  "夜市摊主晚上十点收摊回家；赶上雨天，客人稀稀拉拉，进账打八五折——「雨天，客人少了些。」",
  "捞金鱼和散步一样，都算轻活动——玩一下午也不占肚子的容量。"
];
var WALL_LOG=[
  "【第一夜】天气路对社交路。社交路的报告经复核证伪作废，双方 0:0——天气路白得开门一胜。",
  "【第二夜】事件路 3:1 力克植物路；加赛疑似证伪再下 5:4，连赢两城。植物路三条疑似全真、零假报告，领走「最诚实选手」。",
  "【第三夜】厨房路对夜市路，实锤 2:2 平；加赛四条疑似全真，厨房路 6:4 逆转，封「加赛之王」。夜市路那一刀最狠——营业弹窗里居然开着没删干净的开发注释，全店都看见了。",
  "【第四夜】人物志路 1:0 存档路，店主改判平局。实锤：读档会把阳台花计数和散步上限抹平，这扇门已经修好。存档路把整个赛区翻了个底朝天，一根虫毛都没漏掉，获「最干净赛区」。愿望墙开张：一面文案墙、一场回滚重赛，都已记账。",
  "【第五夜 · UI 体检】四档实拍逐帧量过：右下三块牌子原按 104/148/152px 排布，熟客簿与文案墙几乎完全叠在一起，盲模式的语音钮又横压三者；现改 104/148/192 三级阶梯，语音钮挪去左下，合盖外屏则收进 ☰ 菜单。顶栏照旧常驻——九个状态数与「休息一天」都是玩法，不能收进设置；只在宽屏改成单行不堆叠。主底栏第三格改叫「手机」，它打开的本来就是整部手机，不单是通讯录。手册与引导里漏给玩家的「主线 / 系统」字样已抹去，主线仍只在系统内部推进；镇长那处「市政厅」也按镇上实际地名统一成「市政府」。成就页两组正交筛选改成「全部类别 / 全部状态」，一个没删。文案墙按店主意思保留，从此明确当开发日志用。",
  "【第六夜 · 胶囊不再列队】店主指着手机界面视图问：那九个胶囊为什么非要竖在同一列，旁边一小段店名字反倒比九个胶囊加起来还占地？这话问到根上了——顶栏第一行写死成 justify-between 三块（店名文字 | 胶囊 | 收起钮），胶囊块又带 flex-1 + flex-wrap + justify-end，宽度被店名一挤就换行，窄到 320 时干脆塌成一列；短店名独占一整列，信息量更大的九个数值反倒排队挤在角落。不是谁刻意列队，是「按元素类型分两列 + 自动换行」的连锁退化。改法：店名压成一行（店名 13px / 店主 11px，仍分得出主次），胶囊拆出来独占整行、改成 repeat(auto-fit, minmax(86px,1fr)) 网格，任何宽度都横向铺满，绝不塌成一列；楼层总览的 grid-cols-5 同样换成自适应列，心情卡片的短句不再竖排。特大字体 + 320 窄窗实测：九个胶囊由「一长列」变 3×3 网格，顶栏 440px → 253px，楼层文字不再每字一行。v26 全量 33/33 回归、五档 0 报错照旧通过。",
  "【第七夜 · 给没有表情的浏览器换一套图标】店主问：那些不支持 emoji 的浏览器，就不能换点别的当图标吗？问得实在——四档实拍里九宫格状态、时间胶囊、几百个食材图标全是空白方框，偏偏项目自带一份 126KB 的 Material Icons 字体，一直在工具行和页签上好好用着。于是从字体的 GSUB ligature 表反查出 2234 个图标的真实码位（不靠猜图标名，写错就会退化成显示一串英文单词），给运行时真实出现的 emoji 做了 292 条精准映射 + 13 类区段兜底。检测用 canvas 像素法：把 🎉🏅🍓💰 画上去数彩色像素，全灰阶就判缺字体；document.fonts.check 在这环境明明返回 true 却满屏豆腐块，靠不住。最费周折的是「怎么把原 emoji 弄掉」：起初想用 CSS font-size:0 藏起来，被 iframe 自己的字体放大体系压过，图标和方框并排站着；改成只改文本节点的 nodeValue 把字符摘掉、原值存在节点对象上，切回彩色表情时完整写回，既不搬节点也不与 React 打架，「🍬甜味」这类混合内容的中文也自然留下。还踩了第二次同一个坑：CSS 注释里写 pages/*/index.html，那个 */ 提前闭合注释，把紧随其后的基础规则整段吞掉，只剩 content 生效、字体丢失——改成「pages 各帧的 index.html」才补齐。裸文本的装饰前缀（🌙 关灯、💰30）先换成菱形，满屏 ◆ 比方框还吵，最后改成直接删掉，只在纯图标位置留一个。设置中心加了「自动 / 彩色表情 / 线性图标」三档，能纠正误判也能主动挑风格。三态 × 五档 30/30、v26 全量 33/33，图标字号用 1em 跟着原字走，顶栏 410px 一分没变。",
  "【第八夜 · 一个月的实玩账】这回不靠单帧截图，用渲染模式真把游戏过了 30 天，逐日量顶栏、弹窗、手册、数值。九处问题浮出来，最狠的一处是上一夜自己埋的：状态表情会随数值变脸（😄→🙂→🥱、💪→🤒、🍙→💫），降级标注却停在首次渲染那张脸，于是文字残留 emoji、图标还画着旧语义——心情低落画笑脸、健康告急画肌肉，第 15 天起六个胶囊「线性图标 + 空方框」双份站着。根子在 React 复用同一个 span 只换文本、不换属性；改成每次文本里重新冒出 emoji 就把原文刷新、按新脸重算码位，D15 的 mismatch 由 6 归零。其余账目一并清：每日结算窗从 220px 硬折字的窄框放宽到 min(86vw,320px)、6 秒自动收起（原来 30 天得手点 30 次关）；顶栏「休息一天」其实不睡觉、还扣健康，跟 2F 卧室的睡眠入口正好相反，改名「跳过今天」并在提示里指路，健康/饱食/卫生/心情掉到 20 以下给红框警示、title 写清去哪补；成就弹窗的关闭键与事件窗ID不统一，改成同一个 modal-close，Esc 也就能关了；手册那条「可下滑查看更多」只有一条通知时也常年挂着，改成按条数显示，系统还会在每 7 天和节日往手册投一条周记/节日通知——一个月不再一片死水；时辰「下午 13 点」改成 12 小时制的「下午 1 点」；底栏成就角标外挑 4px 的溢出收了回来；顶栏「第 43 天」写明成「春季第 43 天 · 惊蛰」，不再和成就的「经营满 30 天」打架。八处都是长玩才现形、静态体检抓不到的；这一个月没删任何一个功能。",
  "【第九夜 · 死亡系统】店主下令：超过一周不吃饭，自动死亡。先纠了个方向——这不是「饿晕」，是真死，没有「咬牙复活」这回事。于是立成一个正经系统：日计数器 hungryDays 跨天累加、进食清零，满 7 天判死；「吃没吃」在统一的 commit 层认饱食度上升，做简餐/吃成品/快餐/美食街/随机事件一处覆盖。真死的规矩是「死者不能自救」——弹窗默认只有一个「读档」，回到死亡前的存活存档；「重新开店」藏进冷静期，停留满 6 秒才浮现，防的是手一滑把整店赔进去。要让读档真能回去，得改存档时机：原先每次操作都写盘，死那一瞬也会把 dead=true 存进去，读档读出来还是死人；改成只在每天跨天时存档，而且判死那天不写盘——磁盘上永远留着最近一次活着的档。两个藏得深的坑照旧补：存档只把 satiety 写进 home，三个新字段压根没落盘，补齐序列化；读档后当天第一顿饭会被「首次只记基准不判断」漏判，把读档时饱食度喂给 commit，第一顿也算数。三套验证：核心 15/15（含真死无复活、6 秒冷静期、读档精确回到死亡前、不吃饭再跨天仍死）、存档往返 8/8、进食重置 6/6，加上 v26 33/33、v28 30/30、v29 13/13 全绿、全程 0 报错。九夜下来，一个功能都没删。",
  "【第十夜 · 心境也会收人】死亡系统添了第二条路：店主下令，中度抑郁每天结束固定 3% 死亡率，重度抑郁 5%，双相在 3%～10% 之间浮动。翻出现有的心理系统一看，dep 早就分了 0～3 级（连续心情低落三天转轻度，再熬转中度，深陷八天转重度），bipolar 也立着牌子，只是从没真正索过命——这回让它说话。判定放在跨天里、心理 tick 之前，用「当天的心境」掷骰，而不是 tick 算完后的等级：中度就是 3%、重度就是 5%，语义钉死不漂移；双相每天在区间里取一个费率再判。双相优先于抑郁等级（它本就是独立且更重的诊断），饿死优先于心境骰（都轮到死了不再补一刀）。死因写进 deathCause，弹窗据此换文案：饿死是「店主饿死了」，心境离世是「店主没能醒来」——同一套真死规矩：读档是唯一即时出路，重开仍要等 6 秒冷静期。店主特别叮嘱：测试不许靠真实随机碰运气，要用修改器。于是给游戏留了个 __CAKE_DEATH_TEST 钩子（可覆盖判定随机数与双相费率），配存档种子注入心境，25 个用例把 3%、5%、10% 三道边界连同 0.029/0.031、0.049/0.051、0.099/0.101 这些擦边球逐个钉死，轻度与正常心境 roll=0 也安然无恙，读档后抑郁还在——读档不治病，想活就得治疗。历史回归 v26 33/33、v28 30/30、v29 13/13、死亡三套 15/15·8/8·6/6，全程 0 报错。十夜下来，仍是一个功能都没删。",
  "【第十一夜 · 10 天实玩的 8 笔账】店主说，别再看单帧截图了，进游戏里实打实过 10 天。于是照做：每天跨天、关结算窗、做一碗米饭煎蛋保命（不然第 7 天就饿死，观察直接中断），十天下来记了 8 笔。最刺眼的是右下三块牌子——文案墙、熟客簿、人物志，常年横在正文上，320 宽时干脆把「我的小家」整个盖住；它们又不是时时刻刻要用的入口，于是收进一颗「工具」圆钮，点开才向上摊开，选完即收，滚动时淡出，合盖外屏照旧走 ☰ 菜单。楼层卡「1F 店面·厨房·工坊」被拆成三行，是因为楼层号和名字挤在同一个文本节点里，拆开各占一行就齐了；它上方那条 144px 的空灰胶囊原来只有一个箭头，谁看都以为是加载条，补上「收起」二字才像个按钮。「我的小家」和「本层 5 件 · 共 9 件」互相挤成两行，根子是标题没写字号，继承到 32px；三格统计的「家具等级」「Lv.0/10」也在临界处折行，一并收进 10/15px 两档。成就页更热闹：标题、统计、三颗操作钮、两颗切换钮全在折行，统计独占一行、操作钮改两列（重启独占一整行）才松开。「常用搜索」前那个方框，是裸 emoji 没进 .emoji 节点、降级脚本够不着，包进去就好。厨房最后一行被 104px 底栏切掉、跨天后首张卡被顶栏压掉半截，都是滚动区没留垫、自动滚动没算顶栏高度；顺手挖出一个老坑——iframe 的高度按「当前高度」量自己，只会越长越高，实测被撑到 3004px，滚到底一片空条纹，改成按 body 与 #root 实测才缩得回来。最后三处对比度：深红条纹上的橙棕提示 2.4:1、金币金字的 2.9:1、粉底白字语音钮的 2.7:1，全部提到 4.5:1 以上。v26 33/33、v28 30/30、v29 13/13、死亡三套 15/15·8/8·6/6、心境 25/25 全绿，0 报错。十一夜，一个功能都没删。"
];
/* ---------- 入口：人物志按钮正上方一块奶油告示牌 ---------- */
var btn=el("button","","🥄 文案墙");btn.id="tm-wall-btn";btn.type="button";
btn.className="tm-wall-cream";
btn.setAttribute("aria-label","文案墙：一块被奶油糊住一半的告示牌，点一下擦开奶油");
var creamWiped=false;
btn.addEventListener("click",function(){
  if(creamWiped){openPanel();return;}
  creamWiped=true;btn.classList.remove("tm-wall-cream");btn.classList.add("tm-wall-wiping");
  btn.textContent="🧽 擦奶油…";
  setTimeout(function(){btn.classList.remove("tm-wall-wiping");btn.textContent="📋 文案墙";openPanel();},450);
});
D.body.appendChild(btn);
/* ---------- 面板骨架（复用人物志样式类） ---------- */
var wrap=el("div");wrap.id="tm-wall-panel";wrap.hidden=true;
var sheet=el("div","tm-people-sheet");
var head=el("div","tm-people-head");
head.appendChild(el("h3","","文案墙 · 小镇拾遗"));
var closeBtn=el("button","tm-people-close","✕");closeBtn.type="button";
closeBtn.setAttribute("aria-label","关闭文案墙");
closeBtn.addEventListener("click",function(){wrap.hidden=true;});
head.appendChild(closeBtn);sheet.appendChild(head);
var tabs=el("div","tm-wall-tabs");
var content=el("div","tm-people-list");
var tabBtns=[];
["小传","彩蛋罐","日志"].forEach(function(label,i){
  var b=el("button","tm-wall-tab",label);b.type="button";
  b.setAttribute("aria-label","文案墙·切换到"+label);
  b.addEventListener("click",function(){show(i);});
  tabBtns.push(b);tabs.appendChild(b);
});
sheet.appendChild(tabs);sheet.appendChild(content);
wrap.appendChild(sheet);D.body.appendChild(wrap);
wrap.addEventListener("click",function(e){if(e.target===wrap)wrap.hidden=true;});
/* 夜间主题跟随游戏容器（同人物志做法） */
var nightOb=null;
function watchNight(){
  if(nightOb)return;
  var cont=D.getElementById("container");
  if(cont&&window.MutationObserver){nightOb=new MutationObserver(function(){
    wrap.classList.toggle("night",cont.classList.contains("night"));
  });nightOb.observe(cont,{attributes:true,attributeFilter:["class"]});}
}
/* ---------- 三栏渲染 ---------- */
function entry(title,tag,text){
  var d=el("div","tm-wall-entry");
  if(title){d.appendChild(el("b","",title));if(tag)d.appendChild(el("span","tm-wall-tag"," · "+tag));d.appendChild(D.createElement("br"));}
  if(text)d.appendChild(D.createTextNode(text));
  return d;
}
function renderProfiles(){
  WALL_PROFILES.forEach(function(p){content.appendChild(entry(p.name,p.tag,p.text));});
  content.appendChild(el("div","tm-people-empty","小传随每轮猎虫顺手补挂，不一次堆满。"));
}
function renderEggs(){
  WALL_EGGS.forEach(function(t){content.appendChild(entry("",null,t));});
  content.appendChild(el("div","tm-people-empty","彩蛋罐收集散落的幕后设定与文案，罐子永远不封口。"));
}
function renderLog(){
  WALL_LOG.forEach(function(t){content.appendChild(entry("",null,t));});
  content.appendChild(el("div","tm-people-empty","——开发日志：记录每轮体检与修复，选手们只负责抓虫。"));
}
function show(i){
  tabBtns.forEach(function(b,j){b.classList.toggle("on",j===i);});
  content.textContent="";
  if(i===0)renderProfiles();else if(i===1)renderEggs();else renderLog();
}
function openPanel(){watchNight();wrap.hidden=false;show(0);}
/* PC 滚轮挂钩：面板开着时返回自己的滚动层 */
window.__TM_WALL_SCROLL__=function(){
  try{ if(!wrap.hidden)return content; }catch(e){}
  return null;
};
/* ============================================================
   【v31 · 工具抽屉】10 天实玩发现：右下的文案墙 / 熟客簿 / 人物志
   三块牌子全局悬浮，390 宽下横压正文、320 宽下直接盖住「我的小家」
   卡片和底部统计。三者又都不是每时每刻要用的入口，于是收进一颗
   「工具」圆钮：默认只占 52×52，点开才向上摊开三项，选完即收。
   只加一层壳，不动任何既有按钮的 DOM 与事件。
   ============================================================ */
(function(){
  if(window.__TM_TOOLS_DOCK__)return;window.__TM_TOOLS_DOCK__=true;
  var DD=document,root=DD.documentElement;
  var fab=DD.createElement("button");
  fab.id="tm-tools-fab";fab.type="button";
  fab.setAttribute("aria-label","工具：文案墙 / 熟客簿 / 人物志");
  fab.setAttribute("aria-expanded","false");
  fab.setAttribute("data-testid","btn-tools-dock");
  var ico=DD.createElement("span");ico.className="tm-tools-ico material-icons";ico.textContent="handyman";
  ico.setAttribute("aria-hidden","true");
  var txt=DD.createElement("span");txt.className="tm-tools-txt";txt.textContent="工具";
  fab.appendChild(ico);fab.appendChild(txt);
  DD.body.appendChild(fab);
  function setOpen(v){
    if(v)root.setAttribute("data-tm-tools-open","");else root.removeAttribute("data-tm-tools-open");
    fab.setAttribute("aria-expanded",v?"true":"false");
    fab.classList.toggle("on",v);
  }
  fab.addEventListener("click",function(){setOpen(!root.hasAttribute("data-tm-tools-open"));});
  /* 选中任意入口后自动收起；延后一点，别让文案墙的「擦奶油」动画断在半截 */
  ["tm-wall-btn","tm-regs-btn","tm-people-btn"].forEach(function(id){
    var b=DD.getElementById(id);
    if(b)b.addEventListener("click",function(){setTimeout(function(){setOpen(false);},300);},true);
  });
  /* 点空白处收起 */
  DD.addEventListener("click",function(e){
    if(!root.hasAttribute("data-tm-tools-open"))return;
    var t=e.target;
    if(t===fab||(t&&fab.contains(t)))return;
    if(t&&t.id&&/^tm-(wall|regs|people)-btn$/.test(t.id))return;
    setOpen(false);
  },true);
  /* 面板打开时也收起，避免浮在面板边缘 */
  ["tm-wall-panel","tm-regs-panel"].forEach(function(id){
    var el2=DD.getElementById(id);
    if(el2&&window.MutationObserver)new MutationObserver(function(){if(!el2.hidden)setOpen(false);}).observe(el2,{attributes:true,attributeFilter:["hidden"]});
  });
  /* 滚动时淡出，停手 1.1 秒再回来：悬浮球与语音钮不再长时间挡住正文/按钮 */
  var dimT=0;
  DD.addEventListener("scroll",function(e){
    var t=e.target;
    if(!t||!t.classList||!t.classList.contains("panel-scroll"))return;
    fab.classList.add("tm-fab-dim");
    var vc=DD.querySelector(".voice-command-fixed");
    if(vc)vc.classList.add("tm-fab-dim");
    clearTimeout(dimT);
    dimT=setTimeout(function(){
      fab.classList.remove("tm-fab-dim");
      var v2=DD.querySelector(".voice-command-fixed");
      if(v2)v2.classList.remove("tm-fab-dim");
    },1100);
  },true);
})();
})();
