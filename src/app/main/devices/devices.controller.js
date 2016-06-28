(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('DevicesController', DevicesController);

  /** @ngInject */
  function DevicesController($log, $scope, firebaseAuth, resolvedUser, $firebaseObject, particle) {
    var devices = this;

    devices.getDevices = getDevices;
    devices.particleDeviceList = [];
    devices.particleAccessTokenValid = false;

    var ref = firebase.database().ref().child("users").child(resolvedUser.uid);
    var accountInfo = $firebaseObject(ref);
    accountInfo.$bindTo($scope, "accountInfo");
    $scope.$watch('accountInfo.particleAccessToken', function(particleAccessToken, oldValue) {
      if (particleAccessToken !== oldValue) {
        devices.getDevices(particleAccessToken);
      }
    });
    activate();
    function activate() {
      $log.debug('devices activate', particle);
    }
    function getDevices(particleAccessToken){
      if (!particleAccessToken) {
        return;
      }
      $log.debug('attempting to list devices', particleAccessToken);
      var devicesPr = particle.listDevices({ auth: particleAccessToken });

      return devicesPr.then(
          getDevicesComplete,
          getDevicesFailed
      );

    }

    function getDevicesComplete(response) {
      $scope.$apply(function(){
        devices.particleAccessTokenValid = true;
        devices.particleDeviceList = response.body;
      });
    }

    function getDevicesFailed(error) {
      $scope.$apply(function() {
        devices.particleAccessTokenValid = false;
        devices.particleDeviceList = [];
      });
    }
  }
})();
