(function() {
  'use strict';

  angular
    .module('piplant')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
