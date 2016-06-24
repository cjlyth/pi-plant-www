(function() {
  'use strict';

  angular
    .module('piplant')
    .directive('firebaseAuth', firebaseAuth);

  /** @ngInject */
  function firebaseAuth() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/firebaseAuth/firebaseAuth.html',
      scope: {
          creationDate: '='
      },
      controller: FirebaseAuthController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FirebaseAuthController($log) {
      var vm = this;
      vm.authorized = false;
      vm.firebaseAuth = {};
      
      vm.onChange = onChange;
      
      function onChange(state){
        if (state) {
          $log.debug("todo: attempt login");
        } else {
          $log.debug("todo: attempt loout");
          vm.firebaseAuth = undefined;
        }

      }
    }
  }

})();
