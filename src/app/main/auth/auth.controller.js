(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController($log, $rootScope, $scope) {
    var vm = this;
    activate();
    $rootScope.accountInfo = {'test':'test'};
    function activate() {
      $log.debug('auth activate');
      $rootScope.currentLink = 'auth';
    }
  }
})();
