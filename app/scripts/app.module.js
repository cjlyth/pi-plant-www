/* eslint-env browser */
(function() {
  'use strict';

  angular.module('piPlant', [
    // Angular modules.
    'ngRoute',
    // Third party modules.
    'firebase',
    // Custom modules.
    'phoneList'
  ]).factory('particle', function() {
    return new Particle();
  });
  console.log('app module');
})();
