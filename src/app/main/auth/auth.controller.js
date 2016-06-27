(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController($log, firebaseAuth) {
    var vm = this;
    vm.firebase = firebaseAuth;
    
    
    activate();

    function activate() {
      $log.debug('auth activate');
      // TODO: look for tokens
    }
 
  }
})();
