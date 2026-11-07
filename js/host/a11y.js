
(function(){
  var FALLBACK={'modal-close':'关闭','btn-start':'开始游戏','btn-continue':'继续游戏'};
  var PREFIX_RE=/^(btn-|tab-|sec-toggle-)/;
  function labelFor(el){
    var tid=el.getAttribute('data-testid')||'';
    if(FALLBACK[tid]) return FALLBACK[tid];
    var t=(el.textContent||'').replace(/\\s+/g,' ').trim();
    return t?t.slice(0,24):tid;
  }
  function enhance(doc){
    var els;
    try{ els=doc.querySelectorAll('[data-testid]'); }catch(e){ return; }
    for(var i=0;i<els.length;i++){
      var el=els[i], tid=el.getAttribute('data-testid')||'';
      if(el.__a11y) continue; el.__a11y=true;
      var tag=el.tagName;
      if(tag==='BUTTON'||tag==='A'||tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA'){
        if(tag==='BUTTON'&&!el.getAttribute('aria-label')){
          var raw=(el.textContent||'').replace(/^\s*[a-z_]+\s*/,'');
          var lab=raw.replace(/\s+/g,' ').trim();
          el.setAttribute('aria-label',lab?lab.slice(0,24):(tid||'按钮'));
        }
        continue;
      }
      if(el.hasAttribute('role')) continue;
      if(!PREFIX_RE.test(tid)) continue;
      el.setAttribute('role','button');
      el.setAttribute('tabindex','0');
      el.setAttribute('data-a11y-btn','1');
      var lab=labelFor(el);
      if(lab) el.setAttribute('aria-label',lab);
    }
    try{
      var ins=doc.querySelectorAll('input,textarea,select');
      for(var k=0;k<ins.length;k++){
        var inp=ins[k]; if(inp.__a11y) continue; inp.__a11y=true;
        if(inp.getAttribute('aria-label')||inp.id&&doc.querySelector('label[for="'+inp.id+'"]')) continue;
        var ph=inp.getAttribute('placeholder')||'';
        if(ph) inp.setAttribute('aria-label',ph);
      }
    }catch(e){}
  }
  function ensureLive(doc){
    if(doc.getElementById('tm-a11y-live')) return;
    var d=doc.createElement('div');
    d.id='tm-a11y-live'; d.setAttribute('aria-live','polite'); d.className='tm-sr-only';
    (doc.body||doc.documentElement).appendChild(d);
  }
  function announce(doc,msg){
    var d=doc.getElementById('tm-a11y-live');
    if(!d) return; d.textContent='';
    setTimeout(function(){ d.textContent=msg; },60);
  }
  function watchModal(doc){
    try{
      new MutationObserver(function(){
        var mask=doc.querySelector('[data-testid="modal-mask"]');
        if(mask&&!mask.__a11ySeen){
          mask.__a11ySeen=true;
          var box=doc.querySelector('[data-testid="modal-content"]')||mask;
          announce(doc,'弹窗：'+(box.textContent||'').replace(/\\s+/g,' ').trim().slice(0,30));
          var close=doc.querySelector('[data-testid="modal-close"]');
          var unsee=function(){ mask.__a11ySeen=false; };
          if(close){ close.addEventListener('click',unsee,{once:true}); setTimeout(unsee,10000); }
        }
      }).observe(doc.body||doc.documentElement,{childList:true,subtree:true});
    }catch(e){}
  }
  function keyHandler(e){
    if(e.key==='Escape'){
      var close=doc_ref(document).querySelector('[data-testid="modal-close"]');
      if(close&&close.offsetParent!==null){ close.click(); return; }
    }
    var t=e.target;
    if(!t||!t.getAttribute||t.getAttribute('data-a11y-btn')!=='1') return;
    if(e.key==='Enter'||e.key===' '||e.key==='Spacebar'){ e.preventDefault(); t.click(); }
  }
  function doc_ref(d){ return d; }
  function attach(doc){
    if(doc.__a11yAttached) return; doc.__a11yAttached=true;
    enhance(doc);
    doc.addEventListener('keydown',keyHandler,false);
    ensureLive(doc); watchModal(doc);
  }
  attach(document);
  setInterval(function(){
    enhance(document);
    var fs=document.querySelectorAll('iframe[data-testid^="panel-frame-"]');
    for(var i=0;i<fs.length;i++){
      try{
        var d=fs[i].contentDocument;
        if(d&&d.body){ attach(d); enhance(d); }
      }catch(e){}
    }
  },800);
})();
