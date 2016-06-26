(function() {
    'use strict';

    angular
        .module('piplant')
        .directive('accountMenu', accountMenu);

    /** @ngInject */
    function accountMenu() {
        var directive = {
            restrict: 'E',
            scope: {
                accountInfo: '='
            },
            templateUrl: 'app/components/accountMenu/accountMenu.html',
            controller: AccountMenuController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function AccountMenuController($log, authentication) {
            var vm = this;
            vm.signout = signout;

            activate();

            function activate() {
                $log.info('Activated AccountMenu', vm.accountInfo);
            }

            function signout(){
                authentication.signout();
            }
        }
    }

})();
