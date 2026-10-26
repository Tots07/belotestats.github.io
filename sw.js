const V="belote-v2";
const SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png"];
const EXT=["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(V).then(async c=>{
    await c.addAll(SHELL);
    for(const u of EXT){try{await c.add(new Request(u,{mode:"no-cors"}))}catch(x){}}
  }).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET")return;
  const u=new URL(r.url);
  // les données Firebase ne doivent jamais passer par le cache
  if(u.origin!==self.location.origin&&!/(^|\.)(cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.hostname))return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
    const net=fetch(r).then(res=>{
      if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}
      return res;
    }).catch(()=>hit);
    if(hit){e.waitUntil(net);return hit}
    return net;
  }));
});
