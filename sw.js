/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["app/core/views/view-home.html","dc7748e820c80856297f32cefaf9d35b"],["app/core/views/view-supermarketlist.html","d6793a500a60aecbf7846df15e25891e"],["app/core/views/view-weather.html","8d3ad0f0e0cdbd7d61f22b859b595998"],["app/css/main.css","b5ee2ca880ae128742858b24a98516a8"],["app/css/main.css.map","2739d5dfc6f0a85cd6718908cc2a84c6"],["app/images/teamlogo.png","7bbeb566f09f68c84885f3e91801c9f2"],["app/images/teamlogo.svg","015a66ccd0c94cc4be65d3319d832d1f"],["app/js/app.directives.js","9094546a5ef67ab1fe8db9a581e2c021"],["app/js/app.js","b82b9d13c5ace388a17509987675b72a"],["app/js/functions.js","27224886fcb486ac603a500fa09b8bfa"],["app/js/functions.min.js","f36dd4408bf613a752fd8699d7cb76a5"],["app/styl/main.styl","d4d714ad41430d02526fb647cb9ce719"],["app/styl/views/general.styl","d41d8cd98f00b204e9800998ecf8427e"],["components/angular-ui-router/angular-ui-router.js","7bc040184c8a8b39cb5eed856f620415"],["components/angular-ui-router/angular-ui-router.min.js","6fc32e732b7478ea830d1de1ffd0d6a1"],["components/angular/angular.js","fea945437030dbaf178cc608f8cf24ff"],["components/angular/angular.min.js","47cccd7cf9cefd37fc0e2745124eb541"],["components/angularfire/angularfire.js","826a4d189e1ef9f3e94890393d13d81d"],["components/angularfire/angularfire.min.js","e89e08342ed2e3edac66ecda87312f56"],["components/dexie/dexie.js","9f4c341ff993ef2c3dc22927790dfbd9"],["components/dexie/dexie.min.js","016e7503a29e0d6485453774e6f8aca4"],["components/firebase/firebase.js","3f0a5c5fb1b528e053473d037ec4cedd"],["components/firebase/firebase.min.js","2d8da7565a4775a85ea964c3417090c2"],["components/jquery/jquery.min.js","05e51b1db558320f1939f9789ccf5c8f"],["components/jquery/jquery.slim.min.js","d686d334c873495693faa62c04355019"],["components/sugar/sugar.js","36ca1ebcd6e75fd85bcac3edd1aac3a8"],["components/sugar/sugar.min.js","8cf4e1bc7fd78b7eba6cc1aa3ba23b11"],["components/sw-toolbox/cache-polyfill.js","4341fd180fa89f4363af767edd04a472"],["components/sw-toolbox/cache-polyfill.min.js","d5b54c03e3533f5c27b60c0a091475da"],["components/sw-toolbox/sw-toolbox.js","66531e5962e4dccb0526a2b4cd6364a4"],["components/sw-toolbox/sw-toolbox.min.js","da4f974b18e37d64c59f81055f5efc1e"],["components/weather/weather.js","a75b1a5f650bd22014bf117708af4645"],["components/weather/weather.min.js","11be00713bc085f41ebd17123841181d"],["config.codekit","14ce5b77fede98e0fd2a2e7a8316c00d"],["index.html","ddff86c3a4be0a45a239f3624c27e9e5"],["sw.old.js","b2f43d51ac909a54984028ac462beed9"]];
var cacheName = 'sw-precache-v2-v0.0.29-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      return self.clients.claim();
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url));
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







