(function() {
    'use strict';

    angular
        .module('piplant')
        .factory('particleData', particleData);

    /** @ngInject */
    function particleData($log, firebase, authentication) {
        var ref = firebase.database().ref();
        var service = {
            'getParticleUser': getParticleUser
        };

        return service;

        function getParticleUser() {
            return $firebaseObject(ref);
            // authentication.waitForSignIn().then(function(currentUser){
            //     $log.debug('currentUser', currentUser);
            // }, function (error) {
            //     $log.error(error);
            // });
        }
    }
})();
