/* global firebase:false, moment:false, Particle:false, jQuery:false */
(function() {
  'use strict';

  angular
    .module('piplant')
      .constant('moment', moment)
      .constant('firebase', firebase)
    .constant('jQuery', jQuery)
      .constant('Particle', Particle)
      .constant('firebaseConfig', {
        apiKey: "AIzaSyBTEGwVRrKWtz-vzAzNObA-7Q71IUzeBfU",
        authDomain: "pi-plant.firebaseapp.com",
        databaseURL: "https://pi-plant.firebaseio.com",
        storageBucket: "pi-plant.appspot.com",
      })
  ;

})();
