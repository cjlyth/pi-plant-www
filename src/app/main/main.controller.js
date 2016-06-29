(function () {
  'use strict';

  angular
    .module('piplant')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $scope, $state, firebaseAuth, accountService) {
    var main = this;
    main.firebaseAuth = firebaseAuth;
    main.state = $state;
    main.accountInfo = {};

    main.firebaseAuth.$onAuthStateChanged(function (firebaseUser) {
      $log.debug('accountInfo$onAuthStateChanged', firebaseUser);
      if (firebaseUser) {
        accountService.getAccountInfo(firebaseUser).$bindTo($scope, "main.accountInfo");
      } else {
        main.state.go("home");
      }
    });

    $scope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) {
        main.currentNavItem = toState.name;
      });
    $scope.$on("$stateChangeError",
      function (event, toState, toParams, fromState, fromParams, error) {
        if (error === "AUTH_REQUIRED") {
          $state.go("home");
        }
      });
    $log.debug('MainController init');
  }
})();
