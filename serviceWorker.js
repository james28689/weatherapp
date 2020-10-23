const staticWeatherApp = "weatherapp-v1";
const assets = [
	"/",
	"/index.html",
	"/main.js",
	"/main.css",
	"/bg.jpg",
	"/icons/icon512.png",
	"/icons/icon192.png",
	"/icons/iconapple.png",
]

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open(staticWeatherApp).then(cache => {
			cache.addAll(assets);
		})
	)
})

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request)
		})
	)
})