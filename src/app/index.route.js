(function() {
  'use strict';

  angular
    .module('piplant')
    .config(routerConfig);


    /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .state('home.auth', {
            url: '/auth',
            templateUrl: 'app/main/auth/auth.html',
            controller: 'AuthController',
            controllerAs: 'auth'
        })
        .state('home.devices', {
            url: '/devices',
            templateUrl: 'app/main/devices/devices.html',
            controller: 'DevicesController',
            controllerAs: 'devices'
        });

    $urlRouterProvider.otherwise('/home/auth');
  }

})();
