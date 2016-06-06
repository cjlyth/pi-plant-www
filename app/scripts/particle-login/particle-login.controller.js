/* eslint-env browser */
(function() {
  'use strict';

  angular
    .module('particleLogin')
    .controller('ParticleLoginController', [
      '$scope', '$location', '$route', '$routeParams',
      function ParticleLoginController($scope) {
        // var self = this;
        console.log('ParticleLoginController ', $scope);
      }]);
})();
