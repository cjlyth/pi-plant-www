(function() {
  'use strict';

  angular
    .module('piplant')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, firebaseAuth, $state) {
    $log.debug('runBlock end');
    firebaseAuth.$onAuthStateChanged(function(firebaseUser) {
      if (!firebaseUser) {
        $state.go('home');
      }
    });
  }
})();
