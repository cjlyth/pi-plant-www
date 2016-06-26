(function() {
    'use strict';

    angular
        .module('piplant')
        .directive('particleAuth', particleAuth);

    /** @ngInject */
    function particleAuth() {
        var directive = {
            restrict: 'E',
            scope: {
                accountInfo: '='
            },
            templateUrl: 'app/components/particleAuth/particleAuth.html',
            controller: ParticleAuthController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function ParticleAuthController($log) {
            var vm = this;

            vm.authorized = false;

            activate();

            function activate() {
                // return getContributors().then(function() {
                //     $log.info('Activated Contributors View');
                // });
            }

            // function getContributors() {
            //     return githubContributor.getContributors(10).then(function(data) {
            //         vm.contributors = data;
            //
            //         return vm.contributors;
            //     });
            // }
        }
        function onChange(state){
            if (state) {
                $log.debug("todo: attempt login");
                // vm.accountInfo.particleUser = undefined;
            } else {
                $log.debug("todo: attempt logout");
            }
        }
    }

})();
