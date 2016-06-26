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
      scope: {
        accountInfo: '='
      },
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
          $log.debug('firebaseUser login', firebaseUser);
          firebaseUser.providerData.forEach(function(provider){
            $log.debug("provider", provider)
            vm.authorized = provider.providerId && provider.providerId === 'google.com';
          });
          vm.accountInfo.firebaseUser = {
            'displayName': firebaseUser.displayName,
            'email': firebaseUser.email,
            'emailVerified': firebaseUser.emailVerified,
            'isAnonymous': firebaseUser.isAnonymous,
            'photoURL': firebaseUser.photoURL
          };
        } else {
          $log.debug('firebaseUser logout');
          vm.authorized = false;
          vm.accountInfo.firebaseUser = undefined;
        }
      });
      function onChange(state){
        if (state) {
          $log.debug("todo: attempt login", firebaseAuth);
          firebaseAuth.$signInWithPopup('google').then(function(accountInfo) {
            $log.debug('Account info:', accountInfo);
          }).catch(function(error) {
            $log.debug('Authentication failed:', error);
          });
        } else {
          firebaseAuth.$signOut();
        }
      }
    }
  }
})();
