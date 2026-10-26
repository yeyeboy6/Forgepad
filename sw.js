const C='forgepad-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
const keep=n=>{if(n.ok||n.type==='opaque'){const c=n.clone();caches.open(C).then(x=>x.put(r,c))}return n};
if(new URL(r.url).origin===location.origin){
e.respondWith(fetch(r).then(keep).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))}
else{e.respondWith(caches.match(r).then(m=>m||fetch(r).then(keep)))}});
