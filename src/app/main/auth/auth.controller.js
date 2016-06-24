(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController($log, $rootScope) {
    var vm = this;

    activate();

    function activate() {
      $log.debug('auth activate');
      $rootScope.currentLink = 'auth';
    }

  }
})();
