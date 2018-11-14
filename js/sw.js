console.log('Service Worker: Registered');

const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
]

self.addEventListener('install', function(e) {
    e.waitUntil(
        addToCache()
    );
})

const addToCache = async() => {
    await caches
        .open('v1')
        .then((cache) => cache.addAll(cacheFiles))
        .catch(err => console.error(err))
}

const updateCache = (res) => {
    console.log('here')
    return caches
        .open('v1')
        .put(e.req, res)
}

const fetchCache = async() => {
    console.log("Couldn't find ", e.request, ' in cache. Fetching...');
    return await fetch(e.request)
        .then(updateCache(res))
        .catch(err => console.error(err))
}

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches
            .match(e.request)
            .then((res) => {
                res
                ?  (res => {
                    console.log('Found', e.request, ' in cache');
                    return res
                })
                : fetchCache()
            })
    )
})