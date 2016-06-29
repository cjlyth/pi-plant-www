(function () {
  'use strict';

  angular
    .module('piplant')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state) {
    $log.debug('runBlock end');
    $rootScope.$on("$stateChangeError",
      function (event, toState, toParams, fromState, fromParams, error) {
        if (error === "AUTH_REQUIRED") {
          $state.go("home");
        }
      });
  }
})();
