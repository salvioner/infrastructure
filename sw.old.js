importScripts('/components/sw-toolbox/sw-toolbox.min.js');

/*
  With the service worker registered, the first time a user hits the page an "install" event is triggered.
  This event is where the page assets are cached
 */
 
 toolbox.options.debug = true;

importScripts('/components/sw-toolbox/cache-polyfill.min.js');

self.addEventListener('install', function(e){

 e.waitUntil(
   caches.open('static').then(function(cache){
     return cache.addAll([
      
       /*
          One important thing about the "addAll" operation: it's all or nothing!
          If one of the files is not present or fails to be fetched, the entire operation fails.
        */
      
      // root
       '/sw.js',
       '/index.html',
      // app
       '/app/js/app.js',
       '/app/js/app.directives.js',
       '/app/js/functions.min.js',
       '/app/css/main.css',
      // app - views
       '/app/core/views/view-home.html',
       '/app/core/views/view-andrea.html',
      // components
       '/components/angular/angular.min.js',
       '/components/angular-ui-router/angular-ui-router.min.js',
       '/components/angularfire/angularfire.min.js',
       '/components/firebase/firebase.min.js',
       '/components/jquery/jquery.min.js',
      // components - sw
       '/components/sw-toolbox/sw-toolbox.min.js',
       '/components/sw-toolbox/cache-polyfill.min.js'
     ]);
   })
 );

});

/*
  One powerful feature of service workers is that, once it controls a page, it can intercept every request that the page makes
  and decide what to do with the request.
  The first step is to attach an event handler to the fetch event, which is triggered for every request that is made.
 */

self.addEventListener('fetch', function(event){
  
  /*
    event.respondWith(
      caches.match(event.request).then(function(response){
        return response || fetch(event.request);
      })
    );
  */
  
});
