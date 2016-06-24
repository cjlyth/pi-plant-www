(function() {
  'use strict';

  angular
    .module('piplant')
    .directive('googleAuth', googleAuth);

  /** @ngInject */
  function googleAuth() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/googleAuth/googleAuth.html',
      scope: {
          creationDate: '='
      },
      controller: GoogleAuthController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function GoogleAuthController($log) {
      var vm = this;
      vm.authorized = false;
      vm.googleAuth = {};
      
      vm.onChange = onChange;
      
      function onChange(state){
        if (state) {
          $log.debug("todo: attempt login");
        } else {
          $log.debug("todo: attempt loout");
          vm.googleAuth = undefined;
        }

      }
    }
  }

})();
