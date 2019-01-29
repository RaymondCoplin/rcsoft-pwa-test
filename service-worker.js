var dataCacheName = 'weatherData-v1';
var cacheName = 'rcsoft-pwa-v1-1';
var filesToCache = [
  '/rcsoft-pwa-test',
  '/rcsoft-pwa-test/index.html',
  '/rcsoft-pwa-test/index.js',
  '/rcsoft-pwa-test/assets/logo.png',
  '/rcsoft-pwa-test/assets/raymondcoplin.jpg',
  '/rcsoft-pwa-test/assets/business-developer.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css'
];

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(keyList => { 
      return Promise.all(keyList.map(key => {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }))
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  )
});