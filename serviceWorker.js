const version = '0.0.2';
const staticFlashlight = "dev_flashlight";
const assets = [
    "./",
    "./app.js",
    "./index.html",
    "./manifest.json"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticFlashlight).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("activate", activateEvent => {
    activateEvent.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== staticFlashlight)
                .map(key => chaches.delete(key)
            ));                               
        })
    );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            if(res) {
                return res;
            } else {
                return fetch(fetchEvent.request);
            }
        })
    );
});
