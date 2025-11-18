const CACHE_NAME = 'tailorpro-cache-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
  // add other static files if you separate CSS/JS/assets
];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    fetch(evt.request).catch(()=>caches.match(evt.request))
  );
});