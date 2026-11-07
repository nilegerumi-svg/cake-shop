
(function(){
  try{
    var proto=location.protocol||"";
    if(proto==="http:"||proto==="https:") return;
    var touch=false;
    try{ touch=("ontouchstart" in window)||navigator.maxTouchPoints>0; }catch(e){}
    if(!touch) return;
    var hide=false;
    try{ hide=window.localStorage.getItem("tmOpenTipDismissed")==="1"; }catch(e){}
    if(hide) return;
    var el=document.getElementById("tm-open-tip");
    if(!el) return;
    el.classList.add("show");
    var x=document.getElementById("tm-open-tip-x");
    if(x) x.addEventListener("click",function(){ el.classList.remove("show"); try{ window.localStorage.setItem("tmOpenTipDismissed","1"); }catch(e){} });
  }catch(e){}
})();
