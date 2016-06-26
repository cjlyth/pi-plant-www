(function() {
    'use strict';

    angular
        .module('piplant')
        .directive('particleAuth', particleAuth);

    /** @ngInject */
    function particleAuth() {
        var directive = {
            restrict: 'E',
            scope: true,
            templateUrl: 'app/components/particleAuth/particleAuth.html',
            controller: ParticleAuthController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function ParticleAuthController($log, firebaseAuth) {
            var vm = this;
            vm.authorized = false;
            activate();
            function activate() {
                firebaseAuth.$onAuthStateChanged(function(firebaseUser) {
                    vm.email = firebaseUser ? firebaseUser.email : null;
                });
            }
        }
    }

})();
