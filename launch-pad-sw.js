const CACHE="lpm-v2";
const FILES=["launch-pad-manifest.json","lpm-icon-192.png","lpm-icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE);for(const f of FILES){try{await c.add(f)}catch(x){}}try{await c.add("./")}catch(x){}await self.skipWaiting()})())});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==self.location.origin)return;
 // online: newest copy. offline: saved copy.
 e.respondWith(fetch(r).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy));return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match("./"))))});
