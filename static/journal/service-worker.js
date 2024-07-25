const CACHE_NAME = 'my-cache-v1';

const urlsToCache = [
    '/',
    '/journal/vendor/jquery/jquery-2.2.4.min.js',
    '/journal/css/outwork_style.css',
    '/journal/js/main.js',
    '/journal/vendor/bootstrap/css3/bootstrap.min.css',
    '/journal/vendor/bootstrap/js3/bootstrap.min.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName !== CACHE_NAME;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    const prompt = event.prompts[0];

    prompt.prompt();
});
