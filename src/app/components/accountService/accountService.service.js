(function() {
    'use strict';

    angular
        .module('piplant')
        .factory('accountService', accountService);

    /** @ngInject */
    function accountService($log, firebase, $firebaseObject) {
        var accountInfoRef = firebase.database().ref().child("users");
        var service = {
            getAccountInfoRef: getAccountInfoRef,
            getAccountInfo: getAccountInfo
        };

        return service;
        function getAccountInfo(resolvedUser) {
            var ref = service.getAccountInfoRef(resolvedUser);
            return $firebaseObject(ref);
        }
        function getAccountInfoRef(resolvedUser) {
            return accountInfoRef.child(resolvedUser.uid);
        }
    }
})();