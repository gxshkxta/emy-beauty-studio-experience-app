self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('emy-pwa-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/main.js',
        '/emy-bgapp.png',
        '/styles/theme.css',
        '/styles/glass.css',
        '/styles/mobile.css',
        '/components/Calendar.js',
        '/components/TimeSlots.js',
        '/components/ServiceSelector.js',
        '/components/BookingForm.js',
        '/components/Confirmation.js',
        '/data/services.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});