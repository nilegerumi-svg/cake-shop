
/* ============================================================
   【手写区 · 小镇人物志（v31）】只读界面，不改任何游戏状态。
   数据来源（全部活引用，不复制数据）：
   · 名单与档案 = 框架区全镇合集 Zt（经 window.__TM_NPC__ 暴露，lN 初始化式内挂）
   · 「最爱」编号→名称 = 框架区物品对照表 ge（经 window.__TM_ITEM_MAP__ 暴露，Mv 初始化式内挂）
   · 长角色档案 = window.__TM_LONG_PROFILES__（键=档案 id，值=sections 数组）
   无长档案的人物显示短档案 + 「长档案整理中」标记，界面不空转。
   ============================================================ */
(function(){
"use strict";
/* ============================================================
   【手写块 · tm-regs】熟客登记簿面板（原生 DOM，挂 body，不进 React）
   ── 结构索引 ──────────────────────────────────────────
   样式：#tm-regs-btn 悬浮按钮（bottom 比人物志上移 44px 防遮挡）；
         .tm-regs-sheet 底部抽屉；卡片/候选/表单各自成段。
   按钮：🧾 熟客簿 → openPanel()。
   render()     每次全量重绘：统计三项 → 登记候选区 → 卡片列表。
   st()         从 __TM_STATE_GET__ 取存档；未开局显示引导文案。
   discLabel()  好感→档位文案，与 tmRegDisc 阈值一一对应（改需同步）。
   登记候选 = 全镇民（__TM_NPC__）＋ 光顾满 5 次的路人，双来源；
   登记 ¥5 扣钱包 coins；上限 70 张；重复名字不进候选。
   openForm()   编辑忌口（原料下拉）与特殊日子（月/日/叫法），保存即写回。
   注销卡片：好感保留在镇民表，仅移除卡片（可重登）。
   ============================================================ */
(function(){
"use strict";
if(window.__TM_REGS_UI__)return;window.__TM_REGS_UI__=true;
var D=document;
function el(t,c,x){var n=D.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n;}
/* 样式：沿用人物志暖色系，按钮上移避让 */
var css=D.createElement("style");
css.textContent="#tm-regs-btn{position:fixed;right:12px;bottom:calc(148px + env(safe-area-inset-bottom,0px));z-index:45;border:2px solid #6b4226;border-radius:999px;background:#fff8e1;color:#6b4226;font-size:13px;padding:8px 14px;box-shadow:0 2px 8px rgba(74,44,23,.25);cursor:pointer}#tm-regs-panel{position:fixed;inset:0;z-index:80;background:rgba(74,44,23,.45);display:flex;justify-content:center;align-items:stretch}#tm-regs-panel[hidden]{display:none}.tm-regs-sheet{width:100%;max-width:560px;background:#fff8e1;color:#4a2c17;display:flex;flex-direction:column;border-radius:14px 14px 0 0;margin-top:24px;overflow:hidden}@media(min-width:768px){.tm-regs-sheet{margin-top:32px;margin-bottom:32px;border-radius:14px;max-height:calc(100% - 64px)}}.tm-regs-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:2px solid rgba(107,66,38,.15);background:#fff}.tm-regs-head h3{margin:0;font-size:16px;flex:1;color:#6b4226}.tm-regs-close{border:1px solid rgba(107,66,38,.3);background:#fff;border-radius:8px;font-size:16px;padding:2px 10px;cursor:pointer;color:#4a2c17}.tm-regs-body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px 14px 28px}.tm-regs-stats{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}.tm-regs-stat{background:#fff;border:1.5px solid rgba(107,66,38,.2);border-radius:10px;padding:6px 10px;font-size:12.5px}.tm-regs-sec{font-weight:700;margin:10px 0 6px;color:#6b4226}.tm-regs-card{background:#fff;border:1.5px solid rgba(107,66,38,.2);border-radius:12px;padding:10px;margin-bottom:8px;font-size:13.5px}.tm-regs-card b{color:#6b4226}.tm-regs-meta{color:#8a6a4f;font-size:12.5px;margin-top:2px}.tm-regs-ops{margin-top:6px;display:flex;gap:6px;flex-wrap:wrap}.tm-regs-ops button,.tm-regs-cand button{border:1px solid rgba(107,66,38,.35);background:#fff8e1;border-radius:8px;padding:3px 10px;font-size:12.5px;cursor:pointer;color:#4a2c17}.tm-regs-cand{background:#fff;border:1.5px dashed rgba(107,66,38,.35);border-radius:12px;padding:10px;margin-bottom:8px;font-size:13.5px}.tm-regs-empty{color:#8a6a4f;font-size:13px;padding:10px 2px}.tm-regs-form{background:#fff;border:1.5px solid rgba(107,66,38,.3);border-radius:12px;padding:10px;margin-bottom:8px;font-size:13px}.tm-regs-form label{display:block;margin:6px 0 2px;color:#6b4226}.tm-regs-form input,.tm-regs-form select{border:1.5px solid rgba(107,66,38,.3);border-radius:8px;padding:4px 8px;font-size:13px;color:#4a2c17;width:100%;box-sizing:border-box}";
D.head.appendChild(css);
var btn=el("button","","🧾 熟客簿");btn.id="tm-regs-btn";btn.type="button";
btn.setAttribute("aria-label","打开熟客登记簿");btn.addEventListener("click",openPanel);
D.body.appendChild(btn);
var wrap=el("div");wrap.id="tm-regs-panel";wrap.hidden=true;
var sheet=el("div","tm-regs-sheet");
var head=el("div","tm-regs-head");
head.appendChild(el("h3","","熟客登记簿"));
var closeBtn=el("button","tm-regs-close","✕");closeBtn.type="button";
closeBtn.setAttribute("aria-label","关闭熟客登记簿");closeBtn.addEventListener("click",function(){wrap.hidden=true;});
head.appendChild(closeBtn);sheet.appendChild(head);
var body=el("div","tm-regs-body");sheet.appendChild(body);
wrap.appendChild(sheet);D.body.appendChild(wrap);
function st(){return window.__TM_STATE_GET__?window.__TM_STATE_GET__():null;}
function discLabel(a){return a>=80?"85 折（满档·以物抵账）":a>=50?"9 折":a>=20?"95 折":"无折扣（好感 <20）";}
function itemMap(){return window.__TM_ITEM_MAP__||{};}
function ingName(id){var it=itemMap()[id];return (it&&it.name)||id;}
function md(d){return d?d.month+" 月 "+d.day+" 日（"+d.label+"）":"—";}
function openPanel(){wrap.hidden=false;render();}
function render(){
  body.textContent="";
  var s=st();
  if(!s){body.appendChild(el("div","tm-regs-empty","还没开局，先开一家店吧。"));return;}
  /* 统计三项 */
  var totalSold=(s.stats&&s.stats.sold)||0,rSold=s.regularsSold||0;
  var pct=totalSold>0?Math.round((rSold/totalSold)*100):0;
  var stats=el("div","tm-regs-stats");
  [["登记张数",(s.regulars||[]).length+" / 70"],["熟客成交占比",pct+"%（累计 "+rSold+" 份）"],["熟客累计流水","¥"+(s.regularsEarned||0)]].forEach(function(p){
    var d=el("div","tm-regs-stat");d.appendChild(el("b","",p[0]+"："));d.appendChild(D.createTextNode(p[1]));stats.appendChild(d);
  });
  body.appendChild(stats);
  var rs=s.regulars||[];
  /* 登记区：镇民 + 光顾满 5 次的路人 */
  body.appendChild(el("div","tm-regs-sec","＋ 登记新熟客（¥5 / 张，上限 70）"));
  var npcs=window.__TM_NPC__||[];
  var cand=[];
  npcs.forEach(function(n){ if(n&&n.name&&!rs.some(function(r){return r.name===n.name;})) cand.push({name:n.name,id:n.id,kind:"npc"}); });
  var vis=s.regularVisits||{};
  Object.keys(vis).forEach(function(nm){
    if(vis[nm]>=5&&!rs.some(function(r){return r.name===nm;})) cand.push({name:nm,id:"rg_"+nm,kind:"street",visits:vis[nm]});
  });
  if(!cand.length)body.appendChild(el("div","tm-regs-empty","镇民和常来的街坊都登记过了。"));
  cand.slice(0,12).forEach(function(c){
    var d=el("div","tm-regs-cand");
    d.appendChild(D.createTextNode((c.kind==="npc"?"镇民 · ":"街坊 · ")+c.name+(c.visits?("（已光顾 "+c.visits+" 次）"):"")));
    var ops=el("div","tm-regs-ops");
    var b=el("button","","登记 ¥5");
    b.addEventListener("click",function(){
      var s2=st();if(!s2)return;
      if((s2.coins||0)<5)return void alert("钱包不够：登记一张卡要 ¥5。");
      if((s2.regulars||[]).length>=70)return void alert("登记簿写满了（上限 70 张）。");
      s2.coins-=5;
      s2.regulars=(s2.regulars||[]).concat([{id:c.id,name:c.name,kind:c.kind,taboo:null,specialDay:null,registerDay:s2.day,lastVisitDay:s2.day}]);
      if(s2.affection&&typeof s2.affection[c.id]!=="number")s2.affection[c.id]=0;
      render();
    });
    ops.appendChild(b);d.appendChild(ops);body.appendChild(d);
  });
  /* 卡片列表 */
  body.appendChild(el("div","tm-regs-sec","我的熟客（"+rs.length+"）"));
  if(!rs.length)body.appendChild(el("div","tm-regs-empty","还没有登记熟客。先把点心卖好，熟客自然会来。"));
  rs.forEach(function(r){
    var d=el("div","tm-regs-card");
    var aff=(s.affection&&s.affection[r.id])||0;
    d.appendChild(el("b","",r.name+(r.kind==="npc"?"（镇民）":"（街坊）")));
    d.appendChild(el("div","tm-regs-meta","好感 "+aff+" · "+discLabel(aff)));
    d.appendChild(el("div","tm-regs-meta","上次购买："+(r.lastBuy?(r.lastBuy.name+" ×"+r.lastBuy.qty):"还没买过")));
    d.appendChild(el("div","tm-regs-meta","忌口/过敏："+(r.taboo?ingName(r.taboo):"未记")));
    d.appendChild(el("div","tm-regs-meta","特殊日子："+md(r.specialDay)));
    d.appendChild(el("div","tm-regs-meta","距上次光顾："+(s.day-(r.lastVisitDay||s.day))+" 天前（超 10 天每天好感 -1）"));
    var ops=el("div","tm-regs-ops");
    var bE=el("button","","记忌口/日子");
    bE.addEventListener("click",function(){openForm(r);});
    var bD=el("button","","注销卡片");
    bD.addEventListener("click",function(){
      var s2=st();if(!s2||!confirm("注销 "+r.name+" 的熟客卡？好感度保留，卡片移除。"))return;
      s2.regulars=(s2.regulars||[]).filter(function(x){return x.id!==r.id;});render();
    });
    ops.appendChild(bE);ops.appendChild(bD);d.appendChild(ops);body.appendChild(d);
  });
}
function openForm(r){
  body.textContent="";
  var s=st();if(!s)return;
  var f=el("div","tm-regs-form");
  f.appendChild(el("b","","编辑 "+r.name));
  var lb1=el("label","","忌口/过敏（原料）");
  var sel=el("select");sel.appendChild(new Option("不记",""));
  (window.__TM_ITEM_MAP__?Object.keys(window.__TM_ITEM_MAP__):[]).slice(0,200).forEach(function(id){sel.appendChild(new Option(ingName(id),id));});
  if(r.taboo)sel.value=r.taboo;
  var lb2=el("label","","特殊日子 · 月");var mIn=el("input");mIn.type="number";mIn.min="1";mIn.max="12";mIn.value=r.specialDay?r.specialDay.month:1;
  var lb3=el("label","","特殊日子 · 日");var dIn=el("input");dIn.type="number";dIn.min="1";dIn.max="31";dIn.value=r.specialDay?r.specialDay.day:1;
  var lb4=el("label","","叫法（生日/乔迁……）");var tIn=el("input");tIn.type="text";tIn.value=r.specialDay?r.specialDay.label:"生日";
  var ops=el("div","tm-regs-ops");
  var bS=el("button","","保存");
  bS.addEventListener("click",function(){
    var s2=st();if(!s2)return;
    var t=s2.regulars.find(function(x){return x.id===r.id;});if(!t)return;
    var sv=sel.value;
    t.taboo=sv||null;
    t.specialDay={month:Math.min(12,Math.max(1,parseInt(mIn.value,10)||1)),day:Math.min(31,Math.max(1,parseInt(dIn.value,10)||1)),label:(tIn.value||"特殊日子").slice(0,12)};
    render();
  });
  var bC=el("button","","返回");bC.addEventListener("click",render);
  ops.appendChild(bS);ops.appendChild(bC);
  f.appendChild(lb1);f.appendChild(sel);
  f.appendChild(lb2);f.appendChild(mIn);
  f.appendChild(lb3);f.appendChild(dIn);
  f.appendChild(lb4);f.appendChild(tIn);
  f.appendChild(ops);body.appendChild(f);
}
window.addEventListener("tm-regs-refresh",render);
})();
if(window.__TM_PEOPLE_UI__)return;window.__TM_PEOPLE_UI__=true;
var D=document;
function escDiv(t){var d=D.createElement("div");d.textContent=t==null?"":String(t);return d;}
function el(tag,cls,text){var n=D.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}
/* 悬浮入口：右下角小圆钮，避开底部页签栏 */
var btn=el("button","","📖 人物志");btn.id="tm-people-btn";btn.type="button";
btn.setAttribute("aria-label","打开小镇人物志");btn.addEventListener("click",openPanel);
D.body.appendChild(btn);
/* 面板骨架 */
var wrap=el("div");wrap.id="tm-people-panel";wrap.hidden=true;
var sheet=el("div","tm-people-sheet");
var head=el("div","tm-people-head");
head.appendChild(el("h3","","小镇人物志"));
var closeBtn=el("button","tm-people-close","✕");closeBtn.type="button";
closeBtn.setAttribute("aria-label","关闭人物志");closeBtn.addEventListener("click",function(){wrap.hidden=true;});
head.appendChild(closeBtn);sheet.appendChild(head);
var input=el("input","tm-people-search");input.type="search";input.placeholder="搜名字、称号、关系……";
input.addEventListener("input",function(){renderList(input.value.trim());});
sheet.appendChild(input);
var listBox=el("div","tm-people-list");sheet.appendChild(listBox);
wrap.appendChild(sheet);D.body.appendChild(wrap);
wrap.addEventListener("click",function(e){if(e.target===wrap)wrap.hidden=true;});
/* 夜间主题跟随游戏容器（容器由 React 后渲染，打开面板时补挂观察器） */
var nightOb=null;
function watchNight(){
  if(nightOb)return;
  var cont=D.getElementById("container");
  if(cont&&window.MutationObserver){nightOb=new MutationObserver(function(){
    wrap.classList.toggle("night",cont.classList.contains("night"));
  });nightOb.observe(cont,{attributes:true,attributeFilter:["class"]});}
}
function itemName(id){if(!id)return"";var it=window.__TM_ITEM_MAP__&&window.__TM_ITEM_MAP__[id];return (it&&it.name)||id;}
function openPanel(){watchNight();wrap.hidden=false;input.value="";renderList("");}
function renderList(q){
  var npcs=window.__TM_NPC__||[];
  listBox.textContent="";
  var pcTip="";
try{if(!("ontouchstart" in window)&&(navigator.maxTouchPoints||0)<=0)pcTip="PC 上：滚轮/方向键翻看，数字键 1~5 切页签，Esc 关面板。";}catch(e){}
listBox.appendChild(el("div","tm-people-empty","数据接自游戏档案库，共 "+npcs.length+" 人；带 ♥ 标记的已有长档案。"+pcTip));
  if(!npcs.length){listBox.appendChild(el("div","tm-people-empty","镇民数据还没接上：框架注入锚点缺失，请核对 window.__TM_NPC__。"));return;}
  var long=window.__TM_LONG_PROFILES__||{};
  npcs.forEach(function(p){
    var hay=(p.name+" "+p.title+" "+(p.intro||"")+" "+(p.rels||[]).join(" ")).toLowerCase();
    if(q&&hay.indexOf(q.toLowerCase())<0)return;
    var item=el("div","tm-people-item");
    var row=el("button","tm-people-row");row.type="button";
    /* v31：人物 emoji 加上 .emoji 类，缺彩色字体时走线性图标降级，
       而不是被裸文本规则换成黑菱形（列表里满屏 ◆ 像项目符号）。 */
    row.appendChild(el("span","emoji",p.emoji||"🙂"));
    row.appendChild(el("span","nm",p.name));
    row.appendChild(el("span","tt",p.title||""));
    if(long[p.id])row.appendChild(el("span","dot","♥"));
    row.appendChild(el("span","",p._open?"▾":"▸"));
    item.appendChild(row);
    var det=el("div","tm-people-detail");det.hidden=true;
    var dl=el("dl");
    function drow(k,v){if(!v)return;dl.appendChild(el("dt","",k));dl.appendChild(el("dd","",v));}
    drow("称号",p.title);drow("生日",p.birthday?(p.birthday.month+" 月 "+p.birthday.day+" 日"):"");
    drow("最爱",itemName(p.likes));drow("常去",p.place);
    /* ============================================================
       【手写块 · tm-people 档案行渲染】（2026-11-13 v41 注释加固）
       普通行四连：工作 / 住处 / 关系 / 隐秘关系——
       1) 工作与住处：读 p.work / p.homeArea+homeDetail，字段缺失时整行不渲染
          （渲染函数 drow 见下，if(!v)return）；
       2) 关系：p.rels 数组用「；」拼接。这三行在 v31 搭面板时就写好了，
          但投影白名单直到 2026-11-13 才放行字段——此前对全部镇民都是死代码；
       3) 隐秘关系：见下个注释块，机制独一份——按好感门槛显隐。
       ============================================================ */
    drow("工作",p.work?(p.work.emoji+" "+p.work.activity):"");
    drow("住处",p.homeArea?(p.homeArea+" · "+(p.homeDetail||"")):"");
    if(p.rels&&p.rels.length)drow("关系",p.rels.join("；"));
    /* ============================================================
       【手写块 · tm-secret-rels 渲染】隐藏关系（2026-11-13 新增）
       数据：档案挂 hiddenRels=[{at:门槛,text:文案}]（示例见 Zt 韩雅琴条）。
       判定：好感经 window.__TM_AFF_GET__（根组件每次渲染刷新的桥，见主组件
       Pe.current 附近）取活值，达到 at 才进结果；桥未挂上时 catch 静默跳过，
       宁可隐藏勿误显。
       隐私设计三点：
       1) 不达门槛时整条不渲染——不是显示「？？？」，而是查无此事；
       2) 搜索串 hay 只拼 name/title/intro/rels，不含 hiddenRels——
          隐私线连「按图索骥」都搜不到；
       3) 面板每次打开/搜索都重新 renderList，好感过线后重开面板即见。
       ============================================================ */
    try{
      var affs=(window.__TM_AFF_GET__&&window.__TM_AFF_GET__())||{};
      var hRs=(p.hiddenRels||[]).filter(function(h){return h&&h.text&&(affs[p.id]||0)>=(h.at||0);});
      if(hRs.length)drow("隐秘关系",hRs.map(function(h){return h.text;}).join("；"));
    }catch(e){/* 好感桥未挂上时静默跳过：隐藏条目保持隐藏，宁缺勿泄 */}
    det.appendChild(dl);
    if(p.intro){var ib=escDiv(p.intro);ib.className="intro";det.appendChild(ib);}
    var secs=long[p.id];
    if(secs&&secs.length){secs.forEach(function(sec){
      det.appendChild(el("h4","","【"+sec.heading+"】"));
      det.appendChild(el("p","",sec.text));
    });}else{det.appendChild(el("div","tm-people-empty","✎ 长档案整理中，先看上面的短档案。"));}
    item.appendChild(det);
    row.addEventListener("click",function(){det.hidden=!det.hidden;});
    listBox.appendChild(item);
  });
}
})();
