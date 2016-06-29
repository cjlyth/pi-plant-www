(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('WaterController', WaterController);

  /** @ngInject */
  function WaterController($log) {
    var water = this;
    $log.debug('WaterController init');

  }
})();
