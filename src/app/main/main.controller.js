(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $scope, firebaseAuth, $state) {
      var main = this;
      main.firebaseAuth = firebaseAuth;
      // main.state = $state;
      $scope.$on('$stateChangeSuccess',
          function(event, toState, toParams, fromState, fromParams){
              main.currentNavItem = toState.name;
          });
      //
      $log.debug('MainController init');
  }
})();
