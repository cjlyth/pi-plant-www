(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, firebaseAuth) {
      var main = this;
      main.firebaseAuth = firebaseAuth;
      $log.debug('MainController init');
  }
})();
