const CACHE_NAME = 'carpeta-virtual-v2';

const ARCHIVOS_OFFLINE = [
  './',
  './index.html',
  './manifest.json',
  './fondo-carnet.png',
  './cedula.jpg',
  './pasaporte.jpg',
  './vouchers.pdf',
  './contrarecibos.pdf',
  './contratos.pdf',
  './nda.pdf',
  './cis.pdf',
  './w8.pdf',
  './ddr.pdf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        ARCHIVOS_OFFLINE.map(url => {
          return cache.add(url).catch(err => console.log('Omitido:', url));
        })
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
