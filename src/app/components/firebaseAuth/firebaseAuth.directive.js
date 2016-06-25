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
    function FirebaseAuthController($log, $firebaseAuth) {
      var vm = this;
      vm.authorized = false;
      vm.firebaseAuth = $firebaseAuth()
      vm.onChange = onChange;
      
      function onChange(state){
        if (state) {
          $log.debug("todo: attempt login", vm.firebaseAuth);
          vm.firebaseAuth.$signInWithPopup('google').then(function(firebaseUser) {
            console.log('Signed in as:', firebaseUser);
          }).catch(function(error) {
            console.log('Authentication failed:', error);
          });
        } else {
          $log.debug("todo: attempt loout");
          vm.firebaseAuth.$signOut();
        }
      }
    }
  }

})();
