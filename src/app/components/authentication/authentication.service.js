(function() {
    'use strict';

    angular
        .module('piplant')
        .service('authentication', authentication);

    /** @ngInject */
    function authentication($log, firebaseAuth) {
        var providers = [
            {
                'title': 'Google',
                'url': 'https://angularjs.org/',
                'description': '',
                'logo': 'angular.png'
            }
        ];

        this.getProviders = getProviders;
        this.signout = signout;


        function signout(){
            $log.info('Signing out of firebase');
            firebaseAuth.$signOut();
        }
        function getProviders() {
            return providers;
        }
    }

})();
