/* eslint-env browser */
(function() {
  'use strict';

  angular.module('piPlant', [
    'ngRoute',
    'ui.router',
    'firebase'
  ]).factory('particleService', [
    '$rootScope',
    function($rootScope) {
      return {
        isReady: function isReady() {
          return Boolean($rootScope.tokens && $rootScope.tokens.particle);
        }
      };
    }])
    .controller('HeaderController',
      ['$scope', '$routeParams', 'particleService', '$firebaseAuth',
        function($scope, $routeParams, particleService, $firebaseAuth) {
          $firebaseAuth().$onAuthStateChanged(function(user) {
            $scope.$apply(function(_scope) {
              _scope.user = user;
            });
          });
          $scope.signOut = function signOut() {
            var auth = $firebaseAuth();
            auth.$signOut();
          };
          $scope.signIn = function signIn() {
            var auth = $firebaseAuth();
            console.log('signIn');
            auth.$signInWithPopup('google').then(function(firebaseUser) {
              console.log('Signed in as:', firebaseUser);
            }).catch(function(error) {
              console.log('Authentication failed:', error);
            });
          };
        }
      ])
    .controller('ParticleAuthTokenController',
      ['$scope', '$routeParams', '$location', '$rootScope',
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
        }
      ])
    .controller('MainController',
      ['$scope', '$routeParams', '$location', '$rootScope', '$firebaseObject',
        function($scope, $route, $routeParams, $location, $firebaseObject) {
          var ref = firebase.database().ref().child('data');
          var syncObject = $firebaseObject(ref);
          syncObject.$bindTo($scope, 'data');
          $scope.$route = $route;
          $scope.$location = $location;
          $scope.$routeParams = $routeParams;
        }
      ])
    .directive('menuClose', function() {
      return {
        restrict: 'AC',
        link: function($scope, $element) {
          $element.bind('click', function() {
            var drawer = angular.element(document.querySelector('.mdl-layout__drawer'));
            var obfuscator = angular.element(document.querySelector('.mdl-layout__obfuscator'));

            if(obfuscator) {
              obfuscator.removeClass('is-visible');
            }
            if(drawer) {
              drawer.toggleClass('is-visible');
            }
          });
        }
      };
    })
    .config(['$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider',
      function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/state1");
        //
        // Now set up the states
        $stateProvider
          .state('state1', {
            url: "/state1",
            templateUrl: "partials/state1.html"
          })
          .state('state1.list', {
            url: "/list",
            templateUrl: "partials/state1.list.html",
            controller: function($scope) {
              $scope.items = ["A", "List", "Of", "Items"];
            }
          })
          .state('state2', {
            url: "/state2",
            templateUrl: "partials/state2.html"
          })
          .state('state2.list', {
            url: "/list",
            templateUrl: "partials/state2.list.html",
            controller: function($scope) {
              $scope.things = ["A", "Set", "Of", "Things"];
            }
          });

        // $locationProvider.hashPrefix('!');
        // $routeProvider.when('/particle/login', {
        //   templateUrl: 'scripts/particle-login/particle-login.template.html'
        // }).when('/particle/auth/token', {
        //   controller: 'ParticleAuthTokenController',
        //   template: '<h1>TOKEN</h1>'
        // }).otherwise('/login');
      }
    ]);
})();
