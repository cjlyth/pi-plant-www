(function() {
    'use strict';

    angular
        .module('piplant')
        .factory('particleApi', particleApi);
    /** @ngInject */
    function particleApi($log, Particle) {
        $log.debug('particleApi init');
        return new Particle();
    }
})();