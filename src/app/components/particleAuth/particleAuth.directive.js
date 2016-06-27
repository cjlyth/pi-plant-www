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
        function ParticleAuthController($scope, $log) {
            var vm = this;
            vm.authorized = true;
            vm.testAccessToken = testAccessToken;

            $log.debug('ParticleAuthController init');
            function testAccessToken(){
                $log.debug('ParticleAuthController.testAccessToken');

            }
        }
    }

})();
