/* eslint-env browser */
(function() {
  'use strict';

  angular.module('piPlant', [
    'ngRoute'
  ]).controller('ParticleAuthTokenController', [
    '$scope', '$routeParams', '$location', '$rootScope',
    function($scope, $routeParams, $location, $rootScope) {
      $scope.name = 'ParticleAuthTokenController';
      if (!$rootScope.tokens) {
        $rootScope.tokens = {};
      }
      if ($location.hash() && $location.hash().startsWith('token=')) {
        $rootScope.tokens.particle = $location.hash().split('=')[1];
        $location.path('/').replace();
        $location.hash('');
      } else {
        console.log('Error parsing auth token');
      }
    }]).controller('MainController', [
      '$scope', '$routeParams', '$location', '$rootScope',
      function($scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
      }
    ]).config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.when('/particle/login', {
        templateUrl: 'scripts/particle-login/particle-login.template.html'
      }).when('/particle/auth/token', {
        controller: 'ParticleAuthTokenController',
        template: '<h1>TOKEN</h1>'
      }).otherwise('/login');
    }]);
})();
