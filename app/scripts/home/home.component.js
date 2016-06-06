/* eslint-env browser */
(function() {
  'use strict';
  angular.module('phoneList').factory('particle', ['', function() {}]).component('phoneList', {
    templateUrl: 'scripts/home/home.template.html',
    controller: ['$scope', 'particle',
    function PhoneListController($scope, particle) {
      var self = this;
      $scope.user = {
        particleUser: '',
        particlePass: ''
      };
      $scope.particles = [];



      $scope.doLogin = function doLogin() {
        if (this.user === null ||
          this.user.particleUser === null ||
          this.user.particlePass === null) {
          console.log('Cant login to particle. Credentials not found.');
          return;
        }
        particle.login({
          username: this.user.particleUser,
          password: this.user.particlePass
        }).then(
          function(data) {
            console.log('API call completed on promise resolve: ',
              data.body.access_token);
            var token = data.body.access_token;
            particle.listDevices({ auth: token }).then(
              function(devices){
                $scope.particles = devices.body;
                console.log('Devices: ', devices.body);
              },
              function(err) {
                console.log('List devices call failed: ', err);
              }
            );


          },
          function(err) {
            console.log('API call completed on promise fail: ', err);
          }
        );
        console.log('clicked doLogin ', this.user);
      };

      self.phones = [
        {
          name: 'Nexus S',
          snippet: 'Fast just got faster with Nexus S.'
        }, {
          name: 'Motorola XOOM™ with Wi-Fi',
          snippet: 'The Next, Next Generation tablet.'
        }, {
          name: 'MOTOROLA XOOM™',
          snippet: 'The Next, Next Generation tablet.'
        }
      ];
    }]
  });
})();
