
/* [a11y-shim v3] 语音兜底+空点提示+close按钮中文标签 */
(function(){
  try{
    var clean=function(t){
      try{
        var x=String(t||'');
        x=x.replace(/[a-z]{3,}/g,function(w){
          return /^(close|open|of|the)$/i.test(w)?w:'';
        });
        return x.replace(/\s{2,}/g,' ').trim()||String(t||'');
      }catch(e){return String(t||'')}
    };
    if(typeof window.playTTS!=='function'){
      window.playTTS=function(text,opts){
        try{
          if(!('speechSynthesis' in window))return Promise.resolve({success:false});
          var u=new SpeechSynthesisUtterance(clean(text));
          u.lang=(opts&&opts.lang)||'zh-CN';
          var sp=(opts&&opts.speed)||'slow';
          u.rate=sp==='fast'?1.25:(sp==='normal'?1:0.85);
          try{window.speechSynthesis.cancel()}catch(e){}
          window.speechSynthesis.speak(u);
          return Promise.resolve({success:true});
        }catch(e){return Promise.resolve({success:false})}
      };
      window.stopAllTTS=function(){try{window.speechSynthesis.cancel()}catch(e){}return{success:true}};
    }
    window.addEventListener('message',function(e){
      try{
        var d=e.data||{};
        if(d.type==='flash-app-bridge'&&d.kind==='tts:speak'&&typeof window.playTTS==='function'){
          window.playTTS(d.text,{lang:d.lang,voiceType:d.voiceType,speed:'slow'});
        }else if(d.type==='flash-app-bridge'&&d.kind==='tts:stop'&&typeof window.stopAllTTS==='function'){
          window.stopAllTTS();
        }
      }catch(err){}
    });
    /* --- v2: close 图标按钮补中文标签 --- */
    var fixClose=function(root){
      try{
        var btns=(root||document).querySelectorAll('button,[role=button]');
        for(var i=0;i<btns.length;i++){
          var b=btns[i];
          if(!b.getAttribute('aria-label')&&/^close$/i.test((b.innerText||'').trim())){
            b.setAttribute('aria-label','关闭');
            b.setAttribute('role','button');
          }
        }
      }catch(e){}
    };
    var moClose=new MutationObserver(function(){fixClose(document)});
    try{moClose.observe(document.documentElement,{subtree:true,childList:true})}catch(e){}
    fixClose(document);
    /* --- v2: 盲人模式下空点语音提示 --- */
    var blindOn=function(){
      try{return window.localStorage&&window.localStorage.getItem('sweet-blind-mode')==='1'}
      catch(e){return false}
    };
    var lastHint=0;
    var isInteractive=function(el){
      for(var i=0;i<9&&el&&el!==document;i++,el=el.parentElement){
        try{
          var tag=el.tagName;
          if(tag==='BUTTON'||tag==='A'||tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA'||tag==='LABEL')return true;
          var r=el.getAttribute&&el.getAttribute('role');
          if(r==='button'||r==='tab'||r==='switch'||r==='checkbox'||r==='radio'||r==='link')return true;
          if(el.onclick){var _s=String(el.onclick).replace(/^function[^{]*\{/,'').replace(/[\s};]/g,'');if(_s)return true;}
          for(var k in el){
            if(k.indexOf('__reactProps')===0){
              var pr=el[k];
              if(pr&&(pr.onClick||pr.onPointerDown||pr.onPointerUp||pr.onTouchStart||pr.onTouchEnd))return true;
            }
          }
          var tid=el.getAttribute&&el.getAttribute('data-testid');
          if(tid&&/^(tab-|btn-)/.test(tid))return true;
        }catch(e){}
      }
      return false;
    };
    window.__a11yBlindTap=function(evt){
      try{
        if(!blindOn())return;
        var t=evt.target;
        if(!t||!t.tagName)return;
        if(isInteractive(t))return;
        var now=Date.now();
        if(now-lastHint<3000)return;
        lastHint=now;
        if('speechSynthesis' in window){
          var u=new SpeechSynthesisUtterance('这里是说明文字，点不了。请摸索旁边的按钮。');
          u.lang='zh-CN';u.rate=0.85;
          window.speechSynthesis.speak(u);
        }
      }catch(e){}
    };
    document.addEventListener('click',window.__a11yBlindTap,true);
    /* 给后续出现的 iframe 挂上（游戏主体在 iframe 里）——三重保障 */
    var patchFrames=function(){
      try{
        for(var i=0;i<window.frames.length;i++){
          try{
            var w=window.frames[i], d=w.document;
            if(!d||!d.body)continue;
            if(d.__a11yMounted)continue;
            d.__a11yMounted=true;
            d.addEventListener('click',window.__a11yBlindTap,true);
            fixClose(d);
          }catch(e){}
        }
      }catch(e){}
    };
    /* ① 游戏框就绪消息 */
    window.addEventListener('message',function(e){
      try{if(e&&e.data&&e.data.type==='frame:ready')setTimeout(patchFrames,200)}catch(err){}
    });
    /* ② 顶层每次交互惰性挂载（弱开销：已挂则 WeakSet 秒跳） */
    document.addEventListener('pointerdown',patchFrames,true);
    document.addEventListener('click',patchFrames,true);
    /* ③ 定时器兜底 */
    setInterval(patchFrames,1500);
  }catch(e){}
})();
