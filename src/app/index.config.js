(function() {
  'use strict';

  angular
    .module('piplant')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $mdThemingProvider, firebase) {
    // Enable log
    $logProvider.debugEnabled(true);

    $mdThemingProvider.theme('default').dark();

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    var config = {
      apiKey: "AIzaSyBTEGwVRrKWtz-vzAzNObA-7Q71IUzeBfU",
      authDomain: "pi-plant.firebaseapp.com",
      databaseURL: "https://pi-plant.firebaseio.com",
      storageBucket: "pi-plant.appspot.com",
    };
    firebase.initializeApp(config);
  }

})();
