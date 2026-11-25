/* App shell for the hosted version.
   1. Registers the offline cache so the prototype can be installed on a phone.
   2. On phone screens, moves the two side panels into a menu and shows the guided tour
      as a small card over the app, so the phone view is the whole screen. */
(function(){
  var QS=new URLSearchParams(location.search);
  var embed=!!QS.get('embed');

  if('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !embed){
    window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
  }
  if(embed)return;

  var mq=window.matchMedia('(max-width:480px)');
  var stage=document.querySelector('.stage');
  var journey=document.getElementById('journey');
  var ctrl=document.getElementById('ctrl');
  var phone=document.querySelector('.phone');
  if(!stage||!journey||!ctrl||!phone)return;

  var css=document.createElement('style');
  css.textContent=
   '#mmenu,#drawer,#mtour{display:none}'+
   'body.mshell #mmenu{display:grid;place-items:center;position:fixed;z-index:60;left:10px;bottom:calc(150px + env(safe-area-inset-bottom));width:42px;height:42px;border-radius:50%;background:#17171C;color:#fff;font-size:18px;box-shadow:0 3px 0 #000,0 6px 18px rgba(0,0,0,.25);border:1.5px solid #fff}'+
   'body.mshell.touring #mmenu{display:none}'+
   'body.mshell #drawer{display:block;position:fixed;inset:0;z-index:70;pointer-events:none}'+
   'body.mshell #drawer .bk{position:absolute;inset:0;background:rgba(10,10,14,.55);opacity:0;transition:opacity .2s}'+
   'body.mshell #drawer .pn{position:absolute;left:0;right:0;bottom:0;max-height:86dvh;overflow-y:auto;background:#14141A;border-radius:22px 22px 0 0;padding:10px 18px calc(24px + env(safe-area-inset-bottom));transform:translateY(100%);transition:transform .25s ease}'+
   'body.mshell #drawer .gr{width:44px;height:5px;border-radius:3px;background:#3A3945;margin:4px auto 10px}'+
   'body.mshell #drawer .x{position:sticky;top:0;float:right;color:#fff;font-weight:800;font-size:13px;padding:8px 12px;border:1px solid #33323D;border-radius:10px;background:#14141A;z-index:1}'+
   'body.mshell #drawer .side{display:block;padding:0;background:none;max-height:none}'+
   'body.mshell #drawer #ctrl{margin-top:22px;padding-top:6px;border-top:1px solid #26262F}'+
   'body.mshell.dopen #drawer{pointer-events:auto}body.mshell.dopen #drawer .bk{opacity:1}body.mshell.dopen #drawer .pn{transform:none}'+
   'body.mshell .stage>.side{display:none}'+
   'body.mshell #mtour{position:fixed;z-index:65;left:8px;right:8px;top:calc(8px + env(safe-area-inset-top))}'+
   'body.mshell.touring #mtour{display:block}'+
   'body.mshell #mtour .tour{margin:0;padding:11px 12px;box-shadow:0 4px 0 var(--or-d),0 10px 30px rgba(0,0,0,.3)}'+
   'body.mshell #mtour .tour b{font-size:14.5px}body.mshell #mtour .tour p{font-size:12.5px;color:#3D3D47;margin:0 0 9px;line-height:1.35}'+
   'body.mshell #mtour.min .tour p,body.mshell #mtour.min .tour b{display:none}'+
   'body.mshell #mtour .mn{float:right;font-weight:800;font-size:11px;color:var(--mut);padding:2px 4px;border:0;box-shadow:none}';
  document.head.appendChild(css);

  var btn=document.createElement('button');
  btn.id='mmenu';btn.setAttribute('aria-label','Tour, personas and language');btn.textContent='☰';
  var dr=document.createElement('div');
  dr.id='drawer';dr.innerHTML='<div class="bk"></div><div class="pn" role="dialog" aria-label="Prototype menu"><div class="gr"></div><button class="x">Close</button><div class="slot"></div></div>';
  var mt=document.createElement('div');mt.id='mtour';
  document.body.appendChild(btn);document.body.appendChild(dr);document.body.appendChild(mt);
  var slot=dr.querySelector('.slot');

  function open(){document.body.classList.add('dopen')}
  function close(){document.body.classList.remove('dopen')}
  btn.addEventListener('click',open);
  dr.querySelector('.bk').addEventListener('click',close);
  dr.querySelector('.x').addEventListener('click',close);
  // Close the menu after a choice that changes the phone screen. Language stays open.
  dr.addEventListener('click',function(e){
    var b=e.target.closest('[data-a]');if(!b)return;
    if(['jump','persona','mode','tour'].indexOf(b.dataset.a)>=0)setTimeout(close,60);
  });
  mt.addEventListener('click',function(e){
    if(e.target.closest('.mn')){e.stopPropagation();mt.classList.toggle('min');sync()}
  });

  function sync(){
    if(!document.body.classList.contains('mshell'))return;
    var on=typeof TI!=='undefined'&&TI>=0&&typeof tourHtml==='function';
    document.body.classList.toggle('touring',on);
    if(!on){mt.innerHTML='';mt.classList.remove('min');return}
    var h=tourHtml().replace('on the right','in the ☰ menu');
    h=h.replace('<small>','<button class="mn">'+(mt.classList.contains('min')?'Show':'Hide')+'</button><small>');
    mt.innerHTML=h;
  }

  function apply(){
    if(mq.matches){
      document.body.classList.add('mshell');
      slot.appendChild(journey);slot.appendChild(ctrl);
    }else{
      document.body.classList.remove('mshell','dopen','touring');
      stage.insertBefore(journey,phone);stage.appendChild(ctrl);
    }
    sync();
  }

  if(typeof window.renderSide==='function'){
    var orig=window.renderSide;
    window.renderSide=function(){var r=orig.apply(this,arguments);sync();return r};
  }
  if(mq.addEventListener)mq.addEventListener('change',apply);else if(mq.addListener)mq.addListener(apply);
  apply();
})();
