const staticFlashlight = "dev_flashlight";
const assets = [
    "/",
    "/app.js",
    "/index.html"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticFlashlight).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.responseWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    );
});