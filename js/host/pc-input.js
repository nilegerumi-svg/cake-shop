
/* ===== 手写区 · PC 滚轮与键盘（v32） =====
   触摸管线（tm-panel-autofit）管「手指/鼠标拖动」；本块管剩下两样：
   ① 滚轮 → 映射进当前滚动层（弹窗优先、人物志次之、可见面板面板区）
   ② 键盘 → 方向键/PageUp/PageDown/空格/Home/End 滚动当前层；
             数字键 1~9 点底部页签栏第 N 个按钮；Esc 关弹窗（a11y 块负责）或人物志面板
   挂载：外壳 + 各面板 iframe 各挂一份（事件不跨文档，不会重复触发）。
   触屏设备无滚轮无键盘，天然不受影响；编辑控件聚焦时全部让路。
   防重入标志：window.__TM_PC_INPUT__ */
(function(){
"use strict";
if(window.__TM_PC_INPUT__)return;window.__TM_PC_INPUT__=true;
var D=document;
var EDIT_SEL='input, textarea, select, [contenteditable="true"], [contenteditable=""]';

function editable(t){
  if(!t||!t.tagName)return false;
  var tag=t.tagName;
  return tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT"||t.isContentEditable===true;
}
function canScrollY(el){
  if(!el||el.nodeType!==1)return false;
  try{
    var ov=el.currentStyle?el.currentStyle.overflowY:(window.getComputedStyle?getComputedStyle(el).overflowY:"");
    return (ov==="auto"||ov==="scroll")&&el.scrollHeight>el.clientHeight+2;
  }catch(e){return false;}
}
function firstScrollable(root){          /* 弹窗内容里找第一个纵向可滚元素，广度优先 */
  if(!root)return null;
  if(canScrollY(root))return root;
  var q=[root];
  while(q.length){
    var el=q.shift();
    for(var n=el.firstElementChild;n;n=n.nextElementSibling){
      if(canScrollY(n))return n;
      q.push(n);
    }
  }
  return null;
}
function modalScroll(){                  /* 弹窗滚动层；弹窗没开返回 null */
  try{
    var mr=D.getElementById("global-modal-root");
    if(!mr)return null;
    var inner=mr.querySelector('[data-testid="modal-content"]')||mr.firstElementChild;
    return firstScrollable(inner);
  }catch(e){return null;}
}
function modalOpen(){
  try{
    var c=D.querySelector('[data-testid="modal-close"]');
    return !!(c&&c.offsetParent!==null);
  }catch(e){return false;}
}
function peopleScroll(){                 /* 人物志列表；面板没开返回 null */
  try{
    var p=D.getElementById("tm-people-panel");
    if(p&&!p.hidden)return p.querySelector(".tm-people-list")||null;
  }catch(e){}
  return null;
}
function visiblePanelDoc(){              /* 当前显示中的面板 iframe 文档 */
  try{
    var fs=D.querySelectorAll('iframe[data-testid^="panel-frame-"]');
    for(var i=0;i<fs.length;i++){
      if(fs[i].style.display==="none")continue;
      var d=fs[i].contentDocument;
      if(d&&d.body)return d;
    }
  }catch(e){}
  return null;
}
/* 统一滚动层解析：弹窗开着只滚弹窗（后面被挡住不越权），否则人物志、文案墙，否则面板 */
function scrollerFor(doc){
  if(modalOpen())return modalScroll();
  var ps=peopleScroll(); if(ps)return ps;
  try{ if(window.__TM_WALL_SCROLL__){var wl=window.__TM_WALL_SCROLL__(); if(wl)return wl;} }catch(e){} /* 【v50】文案墙滚动层：人物志之后、面板区之前 */
  if(doc&&doc.querySelector){
    try{ var pa=doc.querySelector(".panel-area"); if(canScrollY(pa))return pa; }catch(e){}
  }
  if(doc&&doc.defaultView&&doc.defaultView.parent){   /* iframe 里没有 .panel-area：回查外壳（面板 iframe 长在壳的 .panel-area 里） */
    try{
      var pd=doc.defaultView.parent.document;
      if(pd&&pd!==doc){ var pa2=pd.querySelector(".panel-area"); if(canScrollY(pa2))return pa2; }
    }catch(e){}
  }
  return null;
}
/* ---------- 滚轮 ---------- */
function attachWheel(doc){
  if(!doc||doc.__tmWheel)return; doc.__tmWheel=true;
  doc.addEventListener("wheel",function(e){
    if(e.ctrlKey||e.metaKey)return;              /* 捏合缩放放行 */
    var t=e.target;
    if(t&&t.closest&&t.closest(EDIT_SEL))return; /* 编辑控件让路 */
    var sc=scrollerFor(doc);
    if(!sc)return;
    e.preventDefault();
    var dy=e.deltaY, dx=e.deltaX;
    if(e.deltaMode===1){dy*=24;dx*=24;}          /* 按行滚动的老式设备换算成像素 */
    sc.scrollTop+=dy;
    sc.scrollLeft+=dx;                           /* 天生横滚的小容器（地图横列等）顺带照顾 */
  },{passive:false});
}
/* ---------- 键盘 ---------- */
function visibleTabBar(){                        /* 外壳优先，其次可见面板内的页签栏；页签栏是 fixed 定位，offsetParent 恒为 null，必须量尺寸 */
  try{
    var bars=D.querySelectorAll(".tab-bar");
    for(var i=0;i<bars.length;i++){
      var r=bars[i].getBoundingClientRect();
      if(r.width>0&&r.height>0)return bars[i];
    }
    var vd=visiblePanelDoc();
    if(vd){
      var bs=vd.querySelectorAll(".tab-bar");
      for(var j=0;j<bs.length;j++){
        var r2=bs[j].getBoundingClientRect();
        if(r2.width>0&&r2.height>0)return bs[j];
      }
    }
  }catch(e){}
  return null;
}
function keyAction(e){
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  var t=e.target;
  if(editable(t))return;                         /* 打字时全部让路 */
  if(e.key==="Escape"){
    if(modalOpen())return;                       /* 弹窗交给 tm-a11y 的 Esc 关闭，不重复点 */
    try{
      var p=D.getElementById("tm-people-panel");
      if(p&&!p.hidden){p.hidden=true;e.preventDefault();}
    }catch(e2){}
    return;
  }
  if(e.key>="1"&&e.key<="9"){
    try{
      var bar=visibleTabBar();
      if(!bar)return;
      var btns=[],ns=bar.children;
      for(var i=0;i<ns.length;i++){
        var c=ns[i],tid=c.getAttribute?c.getAttribute("data-testid"):"";
        if(c.offsetParent!==null&&(c.tagName==="BUTTON"||c.getAttribute("role")==="button"||(tid&&tid.indexOf("tab-")===0)))btns.push(c);
      }
      var idx=Number(e.key)-1;
      if(btns[idx]){e.preventDefault();btns[idx].click();}
    }catch(e3){}
    return;
  }
  var sc=scrollerFor(D);
  if(!sc)return;
  var H=sc.clientHeight,step=0;
  switch(e.key){
    case "ArrowDown":step=64;break;
    case "ArrowUp":step=-64;break;
    case "PageDown":step=Math.round(H*0.85);break;
    case "PageUp":step=-Math.round(H*0.85);break;
    case " ":
      if(t&&t.closest&&t.closest('button,[role="button"]'))return; /* 空格留给按钮激活 */
      step=Math.round(H*0.85);break;
    case "Home":step=-1e9;break;
    case "End":step=1e9;break;
    default:return;
  }
  var before=sc.scrollTop;
  sc.scrollTop=Math.max(0,Math.min(sc.scrollHeight,sc.scrollTop+step));
  if(sc.scrollTop!==before)e.preventDefault();
}
/* ---------- 挂载：外壳立刻挂，面板 iframe 扫描补挂 ---------- */
attachWheel(D);
D.addEventListener("keydown",keyAction,false);
setInterval(function(){
  try{
    var fs=D.querySelectorAll('iframe[data-testid^="panel-frame-"]');
    for(var i=0;i<fs.length;i++){
      var d=fs[i].contentDocument;
      if(d&&d.body){
        attachWheel(d);
        if(!d.__tmKeyPc){d.__tmKeyPc=true;d.addEventListener("keydown",keyAction,false);}
      }
    }
  }catch(e){}
},800);
})();
