(function() {
  'use strict';

  angular
    .module('piplant')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider, firebase, firebaseConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    $mdThemingProvider.theme('default-light')
        .primaryPalette('teal')
        .accentPalette('orange');
    
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('green')
        .dark();
    
    firebase.initializeApp(firebaseConfig);
  }

})();
