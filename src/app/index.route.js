(function() {
  'use strict';

  angular
    .module('piplant')
    .config(routerConfig);


    /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
        var home = {
            name: 'home',
            url: '/home',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        };
        var homeAuth = {
            name: 'home.auth',
            url: '/auth',
            templateUrl: 'app/main/auth/auth.html',
            controller: 'AuthController',
            controllerAs: 'auth'
        };
        var homeDevices = {
            name: 'home.devices',
            url: '/devices',
            templateUrl: 'app/main/devices/devices.html',
            controller: 'DevicesController',
            controllerAs: 'devices'
        };

        $stateProvider
            .state(home)
            .state(homeAuth)
            .state(homeDevices)
        ;

    $urlRouterProvider.otherwise('/home/auth');
  }

})();
