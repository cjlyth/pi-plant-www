(function() {
    'use strict';

    angular
        .module('piplant')
        .factory('Profile', Profile);

    /** @ngInject */
    function Profile($log, firebase, $firebaseObject) {

        return function(username) {
            $log.debug('Profile init', username);
            var ref = firebase.database().ref().child('users');

            var profileRef = ref.child(username);

            return $firebaseObject(profileRef);
        }
    }
})();