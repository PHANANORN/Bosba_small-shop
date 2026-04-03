const CACHE_NAME = 'shop-pro-v4';
const FILES = [
    './',
    './index.html',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Noto+Serif+Khmer:wght@400;700&display=swap'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
    self.skipWaiting(); // ← Activate ភ្លាមដោយមិនរង់ចាំ Tab ចាស់
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim(); // ← គ្រប់គ្រង Tab ទាំងអស់ភ្លាម
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});