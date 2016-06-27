(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $rootScope, firebase, firebaseAuth, $firebaseObject) {
    var main = this;
    $rootScope.accountInfo = {};

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
          $log.debug(toState);
        });

    firebaseAuth.$onAuthStateChanged(function(user) {
      if (user) {
        $log.debug('user', user);

        var ref = firebase.database().ref().child("users").child(user.uid);
        var accountInfo = $firebaseObject(ref);
        accountInfo.$bindTo($rootScope, "accountInfo").then(function() {
          angular.extend(accountInfo, {
            'displayName': user.displayName,
            'email': user.email,
            'emailVerified': user.emailVerified,
            'isAnonymous': user.isAnonymous,
            'photoURL': user.photoURL
          });
          // accountInfo.$save();
        });



      } else {
        // $rootScope.accountInfo = undefined;
      }
    });

  }
})();
