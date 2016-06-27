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
            scope: false,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function AccountMenuController(firebaseAuth) {
            var vm = this;
            vm.firebaseAuth = firebaseAuth;
            vm.accountInfo = {};
            firebaseAuth.$onAuthStateChanged(function(firebaseUser) {
                if (firebaseUser) {
                    vm.accountInfo = {
                        'displayName': firebaseUser.displayName,
                        'email': firebaseUser.email,
                        'photoURL': firebaseUser.photoURL
                    };
                } else {
                    vm.accountInfo = {};
                }
            });

        }
    }

})();
