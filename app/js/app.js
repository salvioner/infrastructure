(function() {

  var firebaseConfig = {
    apiKey: "AIzaSyBZzaVs62aynKTs5c55bFpAsmpqsQg0_M8",
    authDomain: "hackathon-549ff.firebaseapp.com",
    databaseURL: "https://hackathon-549ff.firebaseio.com",
    storageBucket: "hackathon-549ff.appspot.com",
  };
  firebase.initializeApp(firebaseConfig);

  angular
    .module('clientApp', ['ui.router', 'firebase'])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/404');
      $stateProvider
        .state('home', {
          url: '/',
          template: '<main view-home></main>'
        })
        .state('weather', {
          url: '/weather',
          template: '<main view-weather></main>'
        })
        .state('supermarketlist', {
          url: '/supermarketlist',
          template: '<main view-supermarketlist></main>'
        })
        .state('transport', {
          url: '/transport',
          template: '<main view-transport></main>'
        }); ///
    })
    .controller('clientCntrl', function($scope) {

      ///

      ///

    })
    .controller('clientCntrl_viewHome', function($scope) {

      ///

      var rootRef = firebase.database().ref('/');
      var IFDB = document.getElementById('demoIFDB');
      db.content.get('demo').then(function(cnt) {
        document.getElementById('demoIFDB').innerText = cnt.content
      })

      // HOME

      // Install & update

      rootRef.on('value', function(snapshot) {

        /*
          snapshot.forEach(function(childSnapshot){ function(childSnapshot){ console.log( snapshot.val() + ': ' + childSnapshot.val()) } );
        */

        /*
          obj[Object.keys(obj)[0]]
        */

        snapshot.forEach(function(childSnapshot) {

          /// canalization [ FIREBASE --> INDEXED_DB ]

          var pr_nb = childSnapshot.val().pr_nb
          var pshdID = Object.keys(snapshot.val()).slice(pr_nb, pr_nb + 1).toString()
          var cnt = childSnapshot.val().cnt

          db.content.add({
            id: pshdID,
            content: cnt,
            index: pr_nb
          }).catch(
            db.content.update(pshdID, {
              content: cnt,
              index: pr_nb
            })
          )

          /*
          console.log(
            'pushedID: ' + pshdID
          );
          console.log(
            snapshot.child(
              Object.keys( snapshot.val() ).slice(
                pr_nb,
                pr_nb + 1
              ).toString()
            ).val()
          );
          */

          ///

          ///
        });

        ///

        var FDB = document.getElementById('demoFDB');
        var IDB = document.getElementById('demoIDB');

        rootRef.child('demo').on('value', function(snapshot) {
          FDB.innerText = snapshot.child('cnt').val()
        });

        db.content.get('demo', function(cnt) {
          IDB.innerText = cnt.content;
        });

      });

      /*
      var IFDB = document.getElementById('demoIFDB');
      db.content.get('demo').then(function(cnt){document.getElementById('demoIFDB').innerText = cnt.content})
      */

      ///

    })
    .controller('clientCntrl_viewWeather', function($scope) {

      ///

      ///

    })
    .controller('clientCntrl_viewTransport', function($scope) {
      var viewTransport = function() {
        // ottenere dati da Firebase o da una tabella locale dei trasporti
        var transports = [];
        var rootRef = firebase.database().ref('/');
        rootRef.child("/Trasporti").on('value', function(snap) {
          snap.forEach(function(ch) {
            var label = ch.key;
            var dest = ch.val().dest;
            var part = ch.val().part;
            var availableSeats = ch.val().s_free;
            var obj = {
              label,
              dest,
              part,
              availableSeats
            };
            // filtro i Bus completamente occupati
            if (ch.val().s_occ < availableSeats)
              transports[transports.length] = obj;
          })
        });

        // mostrare dati come lista nel documento HTML
        var BusList = document.getElementById("BusList");
        if (transports.length <= 0) {
          BusList.innerHTML = "No available buses :(";
        } else {
          for (var i = 0; i < transport.length; i++) {
            BusList.innerHTML += "<li> " + /* testo + */ " </li>";
            //  // OPPURE:
            //     var entry = document.createElement("li");
            //     entry.innerText = transports[i];
            //     BusList.appendChild(entry);
          }
        }
      };
    
    })

  ; ///

}());


/*
  var rjs = $.ajax({
    type: 'Get',
    url: 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=d34ac7f565a2054559b5068119dc73f9&lat=-32.282828&lon=28.855305'
  });
*/

// JSON.parse( rjs.responseText ).list.forEach(function(index){console.log(index)})