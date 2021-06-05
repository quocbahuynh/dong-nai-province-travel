self.addEventListener('install', function (event) {
    console.log('SW Installed');
    event.waitUntil(
      caches.open('static')
        .then(function (cache) {
          // cache.add('/');
          // cache.add('/index.html');
          // cache.add('/src/js/app.js');
          cache.addAll([
            '/assets/js/app.js',
            '/assets/js/custom.js',
            '/assets/js/owl.js',
            '/assets/css/templatemo-host-cloud.css',
            '/assets/css/owl.css',
            '/assets/css/flex-slider.css',
            '/assets/css/fontawesome.css',
            'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=swap',
            '/vendor/bootstrap/css/bootstrap.min.css',
            '/vendor/jquery/jquery.min.js',
            '/vendor/bootstrap/js/bootstrap.bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
            '/assets/images/banner-bg.jpg',
            '/assets/images/icon.png',
            '/assets/images/pricing-bg.jpg' 
          ]);
        })
    );
  });
  
  self.addEventListener('activate', function () {
    console.log('SW Activated');
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(res) {
          if (res) {
            return res;
          } else {
            return fetch(event.request);
          }
        })
    );
  });