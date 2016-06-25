(function() {
    'use strict';

    angular
        .module('piplant')
        .factory('firebaseAuth', firebaseAuth);

    /** @ngInject */
    function firebaseAuth($log, $firebaseAuth) {
        $log.debug('firebaseAuth init');
        return $firebaseAuth();
    }
})();

