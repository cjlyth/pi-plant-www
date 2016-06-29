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
        var homeDevices = {
            name: 'home.devices',
            url: '/devices',
            templateUrl: 'app/main/devices/devices.html',
            controller: 'DevicesController',
            controllerAs: 'devices',
            resolve: {
                "resolvedUser": ["firebaseAuth", function(firebaseAuth) {
                    return firebaseAuth.$requireSignIn();
                }]
            }
        };
        var homeLight = {
            name: 'home.light',
            url: '/light',
            templateUrl: 'app/main/light/light.html'
        };
        var homeWater = {
            name: 'home.water',
            url: '/water',
            templateUrl: 'app/main/water/water.html'
        };
        $stateProvider
            .state(home)
            .state(homeWater)
            .state(homeLight)
            .state(homeDevices)
        ;

    $urlRouterProvider.otherwise('/home');
  }

})();
