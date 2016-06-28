/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('piplant')
      .constant('moment', moment)
      .constant('firebase', firebase)
      .constant('particle', new Particle())
      .constant('firebaseConfig', {
        apiKey: "AIzaSyBTEGwVRrKWtz-vzAzNObA-7Q71IUzeBfU",
        authDomain: "pi-plant.firebaseapp.com",
        databaseURL: "https://pi-plant.firebaseio.com",
        storageBucket: "pi-plant.appspot.com",
      })
  ;

})();
