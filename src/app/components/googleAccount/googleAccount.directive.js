(function() {
  'use strict';

  angular
    .module('piplant')
    .directive('googleAccount', googleAccount);
  //TODO: convert this to link style directive
  /** @ngInject */
  function googleAccount() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/googleAccount/googleAccount.html',
      controller: GoogleAccountController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function GoogleAccountController($log, firebaseAuth) {
      var vm = this;
      vm.authorized = false;
      vm.onChange = onChange;
      firebaseAuth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
          firebaseUser.providerData.forEach(function(provider){
            vm.authorized = provider.providerId && provider.providerId === 'google.com';
          });
        } else {
          vm.authorized = false;
        }
      });
      function onChange(state){
        $log.debug('GoogleAccountController.onChange', state);
        if (state) {
          firebaseAuth.$signInWithPopup('google');
        } else {
          firebaseAuth.$signOut();
        }
      }
    }
  }
})();
