(function() {
    'use strict';

    angular
        .module('piplant')
        .directive('accountMenu', accountMenu);

    /** @ngInject */
    function accountMenu() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/accountMenu/accountMenu.html',
            controller: AccountMenuController,
            scope: {
                accountInfo: '='
            },
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function AccountMenuController($log, firebaseAuth) {
            var vm = this;
            vm.signOut = signOut;

            function signOut(){
                firebaseAuth.$signOut();
            }
        }
    }

})();
