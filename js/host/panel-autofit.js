
/* ===== 手写区·触摸滚动管线（v4→v21，完整修复史见事项目录《触摸系统修复史.md》） =====
   本块及全部 tm- 开头的样式/脚本是手写可读区；其余 95% 为打包压缩的框架代码，勿逐行解读，勿在其内打补丁。
   变量与函数速查：
     panState    当前手势状态对象；null=无手势。字段：took=已接管滚动、pressLock=按压锁定、
                 coasting=减速滑停中、consumed=长按转触已消费本手势、vel=当前速度、rampT0=柔性跟随起点
     glideToken  惯性令牌：每次触摸自增，旧惯性/滑停循环发现令牌不符即退场
     getScroller(doc,target)   找滚动层：先看弹窗（global-modal-root 内向上找最近可滚元素），
                               否则 .panel-area（跨 frame 时回查父层）
     dx0k(t)     落点是否在天生横滚小容器（横向可滚且横向明显→放行原生横滑）
     glideIfFresh(st,e)        松手惯性：封顶 28px/帧，摩擦系数 0.93，被新触摸/长按打断即停
     window.__tmConsumeTouch  供长按转触调用：通知管线本手势已消费，不再滚背景
     synthT/mDrag              PC 鼠标桥（v21）：无触摸设备把按住拖动合成为触摸事件喂进本管线，
                               编辑类控件（input 等）不接管
========================================================================== */
(function(){
  function fit(f){
    try{
      var d=f.contentDocument; if(!d||!d.documentElement) return;
      var h=Math.max(d.documentElement.scrollHeight, d.body?d.body.scrollHeight:0);
      if(h>0 && Math.abs((parseInt(f.style.height,10)||0)-h)>1){ f.style.height=h+'px'; }
    }catch(e){}
  }
  function watch(f){
    if(f.__tmFit) return;
    try{
      var d=f.contentDocument; if(!d) return;
      var root=d.getElementById('root');
      if(!root) return;
      f.__tmFit=true;
      fit(f);
      if('MutationObserver' in window){
        new MutationObserver(function(){fit(f);}).observe(root,{childList:true,subtree:true});
      }
      if(!d.__tmPan){ d.__tmPan=true; attachPan(d); }
      if(!d.getElementById('tm-hide-scrollbar')){
        var s=d.createElement('style'); s.id='tm-hide-scrollbar';
        s.textContent='.panel-area{scrollbar-width:none;-ms-overflow-style:none;touch-action:none;overscroll-behavior:contain;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;}.panel-area::-webkit-scrollbar{width:0;height:0;display:none;}#root{scrollbar-width:none;touch-action:none;overscroll-behavior:contain;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;}#root::-webkit-scrollbar{width:0;height:0;display:none;}html,body{overscroll-behavior:contain;}';
        d.head.appendChild(s);
      }
    }catch(e){}
  }
  function getScroller(doc, target){
    /* 手机/地图等卡片是父层弹窗：手指落在哪张卡里，就滚哪张卡自己的滚动层，不再错拿背景面板 */
    try{
      var top=window, mroot=null;
      try{
        var selfDoc=doc&&doc.getElementById?doc:document;
        mroot=selfDoc.getElementById?selfDoc.getElementById('global-modal-root'):null;
        if(mroot&&target&&mroot.contains(target)){
          var el=target;
          while(el&&el!==mroot){
            if(el.nodeType===1){
              var ovY=(el.currentStyle?el.currentStyle.overflowY:(window.getComputedStyle?getComputedStyle(el).overflowY:''));
              if((ovY==='auto'||ovY==='scroll')&&el.scrollHeight>el.clientHeight+2){ return el; }
            }
            el=el.parentNode;
          }
          return null;  /* 弹窗开着但没有可滚内容：不滚动 */
        }
      }catch(e2){}
    }catch(e){}
    try{ var s=doc.querySelector('.panel-area'); if(s) return s; }catch(e){}
    try{
      var p=window.parent;
      if(p&&p.document){ var s2=p.document.querySelector('.panel-area'); if(s2) return s2; }
    }catch(e){}
    return null;
  }
  /* 手指落点是否在天生横着滚的容器里（overflowX auto/scroll 且确实可滚） */
  function dx0k(t){
    try{
      var el=t&&t.target;
      while(el&&el.nodeType===1){
        var ovX=(el.currentStyle?el.currentStyle.overflowX:(window.getComputedStyle?getComputedStyle(el).overflowX:''));
        if((ovX==='auto'||ovX==='scroll')&&el.scrollWidth>el.clientWidth+2){ return true; }
        el=el.parentNode;
      }
    }catch(e){}
    return false;
  }
  /* ===== 混合滚动：原生（隐轴）优先，原生动了让位，原生不动则软件接管 ===== */
  try{ localStorage.removeItem('tmSwipeDirMode'); }catch(e){}
  var panState=null;
  var glideToken=0;
  function attachPan(doc){
    if(doc.__tmPanAttached) return; doc.__tmPanAttached=true;
    doc.addEventListener('touchstart', function(e){
      glideToken++;  /* 触控暂停：新触摸立刻刹停在途惯性 */
      if(e.touches.length!==1){ panState=null; return; }
      var sc=getScroller(doc, e.target); if(!sc){ panState=null; return; }
      panState={mode:null,x0:e.touches[0].clientX,y0:e.touches[0].clientY,xg:e.touches[0].clientX,yg:e.touches[0].clientY,prevY:e.touches[0].clientY,scroll0:sc.scrollTop,
                vel:0,lastY:e.touches[0].clientY,lastT:performance.now(),sc:sc,
                lastMoveT:performance.now(),startT:performance.now(),preVel:0,gestT0:performance.now(),pressLock:true,
                nativeOk:false,took:false,consumed:false};
    },{passive:true});
    doc.addEventListener('touchmove', function(e){
      if(!panState||panState.consumed){ return; }
      var t=e.touches[0];
      var now=performance.now();
      var dx=t.clientX-panState.x0, dy=t.clientY-panState.y0;
      /* 漂移守卫①：接管前统计实时速度（像素/帧），慢速漂移不算滚动意图 */
      var dts=now-panState.lastMoveT;
      if(dts>0){
        var inst=Math.abs(t.clientY-panState.lastY)/dts*16;
        panState.preVel=0.7*panState.preVel+0.3*inst;
      }
      panState.lastY=t.clientY; panState.lastMoveT=now;
      /* 漂移守卫②：长按停顿时慢速偏移持续发生，就重新锚定起点，漂移永不累积 */
      if(!panState.took && panState.preVel<0.2 && now-panState.startT>300 &&
         (Math.abs(dx)>0.5||Math.abs(t.clientY-panState.y0)>0.5) &&
         Math.abs(dx)<6 && Math.abs(t.clientY-panState.y0)<6){
        panState.x0=t.clientX; panState.y0=t.clientY;
        panState.scroll0=panState.sc.scrollTop; panState.startT=now;
      }
      if(panState.mode===null){
        var ndx=t.clientX-panState.xg, ndy=t.clientY-panState.yg;
        /* 方向定死纵向：游戏只需要上下滑；落在天生横着滚的小容器（横向可滚）内且横向明显，放行原生横滑 */
        if(dx0k(t) && Math.abs(ndx)>10 && Math.abs(ndy)<Math.abs(ndx)*0.6){ panState=null; return; }
        /* 按压即静止：未定型阶段的移动都拦下，画面保持不动 */
        e.preventDefault();
        if(Math.abs(dx)>6||Math.abs(dy)>6||Math.abs(ndx)>6||Math.abs(ndy)>6){ panState.mode='v'; }
      }
      if(panState.mode!=='v'){ return; }
      if(panState.nativeOk){ return; }
      if(!panState.took){
        /* 按压即锁定：手指落下的那一刻就是按压（短按长按都是按压），画面保持静止；全程位移变大则解除锁定转为滑动 */
        if(panState.pressLock){
          if(Math.abs(t.clientY-panState.yg)>8){
            panState.pressLock=false;
            panState.x0=t.clientX; panState.y0=t.clientY;
            panState.scroll0=panState.sc.scrollTop; panState.startT=now;
            /* 不 return：落回正常判定，慢速通道可立即接管 */
          } else {
            e.preventDefault();
            panState.x0=t.clientX; panState.y0=t.clientY;
            panState.scroll0=panState.sc.scrollTop; panState.startT=now;
            return;
          }
        }
        var slowIntent=Math.abs(t.clientY-panState.yg)>8;  /* 全程单向位移超8像素即视为滚动意图，与按压解锁边界一致：短滑动不再落进8~10px死区被当按压 */
        if(!slowIntent && Math.abs(panState.sc.scrollTop-(panState.scroll0-dy))<=2){ return; }
        var fastEnough=panState.preVel>=0.35&&Math.abs(dy)>12;
        if(!fastEnough&&!slowIntent){ return; }  /* 漂移守卫③：既不够快也不够远不接管 */
        panState.took=true;
        panState.vel=panState.preVel;
        panState.scroll0=panState.sc.scrollTop;
        /* 转换期：慢速的按压→滑动「转」都有1.5秒柔性跟随——人眼和屏幕都跟不上零时间硬切；快滑仍立即跟手 */
        if(!fastEnough){ panState.rampT0=performance.now(); }
      }
      e.preventDefault();
      var dt=Math.max(1,performance.now()-panState.lastT);
      var step=panState.prevY-t.clientY;
      panState.vel=0.75*panState.vel+0.25*(step/dt*16);
      if(panState.vel>28) panState.vel=28; if(panState.vel<-28) panState.vel=-28;
      panState.prevY=t.clientY;
      panState.lastY=t.clientY; panState.lastT=performance.now();
      panState.lastMoveT=panState.lastT;
      var rampK=1;
      if(panState.rampT0!==undefined){
        var rre=(performance.now()-panState.rampT0)/1500;
        rampK=rre>=1?1:rre;  /* 转换期内按时间比例柔性跟随：手指可以先行，画面在1.5秒内缓缓追上 */
      }
      if(panState.coasting){  /* 减速滑停中手指又动了：把锚点搬到当前位置，画面不跳变 */
        panState.coasting=false;
        panState.coastAbort=true;  /* 立刻叫停旧滑停循环：防止它本帧再补一笔，跟新写入打架 */
        panState.x0=t.clientX; panState.y0=t.clientY;
        panState.scroll0=panState.sc.scrollTop;
        dy=0; rampK=1;
      }
      var nv=panState.scroll0-dy*rampK;
      if(Math.abs(nv-panState.sc.scrollTop)>0.05){ panState.sc.scrollTop=nv; }  /* 位置没变就不重复落笔，减少无谓重绘 */
      var cst=panState;
      if(cst.coastTimer){ clearTimeout(cst.coastTimer); }
      cst.coastTimer=setTimeout(function(){ if(panState===cst){ startCoast(cst); } },160);
    },{passive:false});
    doc.addEventListener('contextmenu', function(e){ if(panState){ e.preventDefault(); } });
    function glideIfFresh(st, e){
      if(!st.took||st.coasting||Math.abs(st.vel)<0.4) return;
      var now=performance.now();
      if(now-(st.lastMoveT||now)>=120) return;
      var sc=st.sc, vel=Math.max(-28,Math.min(28,st.vel)), my=++glideToken;
      var lastG=performance.now();
      (function glide(){
        if(my!==glideToken){ return; }  /* 新触摸接管：惯性作废 */
        if(panState){ return; }  /* 滑动后转长按：任何手指按下即暂停惯性，画面立刻停住 */
        var tNow=performance.now();
        var gdt=Math.min(64,Math.max(0.1,tNow-lastG)); lastG=tNow;
        sc.scrollTop+=vel*(gdt/16.7);
        vel*=Math.pow(0.93,gdt/16.7);
        if(Math.abs(vel)>0.35){ requestAnimationFrame(glide); }
      })();
    }
    /* 长划转按压：手指停住后画面在1.5秒内减速滑停，而不是瞬间冻结（人眼和屏幕都跟不上零时间切换） */
    function startCoast(st){
      if(st.coasting||Math.abs(st.vel)<1.0){ return; }  /* 慢速爬行（速度<1）停住本身不可感，不需要滑停，也避免误触发打断柔性跟随 */
      if(performance.now()-st.lastMoveT<150){ return; }  /* 150ms内手指还有动静=仍在慢移，不是停稳 */
      st.coasting=true;
      st.coastAbort=false;
      st.coastVel=st.vel;
      st.coastT0=performance.now();
      var lastC=st.coastT0;
      (function step(){
        if(st.coastAbort){ st.coasting=false; return; }  /* 手指重新跟手：旧滑停立即退场，不再补笔 */
        if(st!==panState){ st.coasting=false; return; }
        if(performance.now()-st.lastMoveT<80){ st.coasting=false; return; }
        var now=performance.now();
        var gdt=Math.min(64,Math.max(0.1,now-lastC)); lastC=now;
        var kk=Math.min(1,(now-st.coastT0)/1500);
        var d=st.coastVel*(1-kk)*(gdt/16.7);
        if(Math.abs(d)<0.1){ st.coasting=false; return; }  /* 每帧挪不到0.1像素时提前收尾：省掉长尾的空转重绘 */
        st.sc.scrollTop+=d;
        if(kk<1){ requestAnimationFrame(step); } else { st.coasting=false; }
      })();
    }
    doc.addEventListener('touchend', function(e){
      if(!panState){ return; }
      var st=panState;
      if(st.coastTimer){ clearTimeout(st.coastTimer); st.coastTimer=null; }
      panState=null;
      glideIfFresh(st, e);
    },{passive:true});
    doc.addEventListener('touchcancel', function(e){
      if(!panState){ return; }
      var st=panState;
      if(st.coastTimer){ clearTimeout(st.coastTimer); st.coastTimer=null; }
      panState=null;
      glideIfFresh(st, e);
    },{passive:true});
    /* PC 鼠标桥：无触摸设备时把「按住拖动」映射进触摸管线 */
    if(!('ontouchstart' in doc.defaultView) && !(doc.defaultView.navigator && doc.defaultView.navigator.maxTouchPoints > 0)){
      var mDrag = null;
      function synthT(type, x, y, target){
        var ev = new Event(type, {bubbles:true, cancelable:true});
        var t = {identifier:1, target:target, clientX:x, clientY:y, pageX:x, pageY:y, screenX:x, screenY:y, radiusX:1, radiusY:1, rotationAngle:0, force:1};
        ev.touches = [t]; ev.changedTouches = [t]; ev.targetTouches = [t];
        return ev;
      }
      doc.addEventListener('mousedown', function(e){
        var t = e.target;
        if(t && t.closest && t.closest('input, textarea, select, [contenteditable]')){ return; }
        mDrag = {t: t};
        t.dispatchEvent(synthT('touchstart', e.clientX, e.clientY, t));
        e.preventDefault();
      });
      doc.addEventListener('mousemove', function(e){
        if(!mDrag){ return; }
        mDrag.t.dispatchEvent(synthT('touchmove', e.clientX, e.clientY, mDrag.t));
      });
      doc.addEventListener('mouseup', function(e){
        if(!mDrag){ return; }
        mDrag.t.dispatchEvent(synthT('touchend', e.clientX, e.clientY, mDrag.t));
        mDrag = null;
      });
    }
  }
  attachPan(document);
  window.__tmConsumeTouch=function(){ if(panState){ panState.consumed=true; } };
  function scan(){
    var fs=document.querySelectorAll('iframe[data-testid^="panel-frame-"]');
    for(var i=0;i<fs.length;i++){
      if(fs[i].style.display!=='none'){ watch(fs[i]); fit(fs[i]); }
      else if(fs[i].__tmFit){ fs[i].__tmFit=false; }
    }
  }
  setInterval(scan,400);
  window.addEventListener('resize',function(){
    var fs=document.querySelectorAll('iframe[data-testid^="panel-frame-"]');
    for(var i=0;i<fs.length;i++) fit(fs[i]);
  });
})();
