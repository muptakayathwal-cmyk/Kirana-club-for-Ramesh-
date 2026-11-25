/* Offline cache for the prototype. Bump VERSION when you change files. */
var VERSION='rfr-v3-1';
var CORE=['./','index.html','deck.html','app.js','manifest.webmanifest','icons/apple-touch-icon.png','icons/favicon.png','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','img/p1.jpg','img/p10.jpg','img/p11.jpg','img/p12.jpg','img/p14.jpg','img/p15.jpg','img/p16.jpg','img/p17.jpg','img/p18.jpg','img/p19.jpg','img/p2.jpg','img/p20.jpg','img/p21.jpg','img/p22.jpg','img/p23.jpg','img/p24.jpg','img/p25.jpg','img/p26.jpg','img/p3.jpg','img/p4.jpg','img/p5.jpg','img/p6.jpg','img/p7.jpg','img/p8.jpg','img/p9.jpg','img/shop1.jpg','img/shop3.jpg','notes/flow_ideal.webp','notes/flow_kc.webp','notes/flow_trad.webp','notes/ia.webp','notes/n_constraints.webp','notes/n_kcflow.webp','notes/n_notworking.webp','notes/n_problem.webp','notes/n_profile.webp','notes/n_tasks_all.webp','notes/n_tradflow.webp','notes/sk_detail.webp','notes/sk_home.webp','notes/sk_voice.webp'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  var req=e.request;if(req.method!=='GET')return;
  var url=new URL(req.url);
  // Google Fonts: serve cached copy, refresh in background
  if(/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){
    e.respondWith(caches.open(VERSION+'-fonts').then(function(c){return c.match(req).then(function(hit){
      var net=fetch(req).then(function(r){if(r.ok||r.type==='opaque')c.put(req,r.clone());return r}).catch(function(){return hit});
      return hit||net})}));return;
  }
  if(url.origin!==location.origin)return;
  // Pages: network first so updates show, cache when offline
  if(req.mode==='navigate'||req.destination==='document'){
    e.respondWith(fetch(req).then(function(r){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(req,cp)});return r})
      .catch(function(){return caches.match(req,{ignoreSearch:true}).then(function(h){return h||caches.match('index.html')})}));return;
  }
  // Everything else: cache first
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(function(h){return h||fetch(req).then(function(r){
    if(r.ok&&!/\.pdf$/.test(url.pathname)){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(req,cp)})}return r})}));
});
