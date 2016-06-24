(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $rootScope) {
    var vm = this;
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
          $log.debug('$stateChangeSuccess', toState, toParams, fromState, fromParams);
          // $rootScope.currentLink = toState.controllerAs;
          // transitionTo() promise will be rejected with
          // a 'transition prevented' error
          // vm.currentLink = current;
        })


    // toastr.options.preventDuplicates = false;

  }
})();
