(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('DevicesController', DevicesController);

  /** @ngInject */
  function DevicesController($log, $scope, firebaseAuth, resolvedUser, $firebaseObject, particleApi) {
    var devices = this;

    devices.getDevices = getDevices;
    devices.toggleLed = toggleLed;
    devices.accountInfo = {};
    devices.particleDeviceList = [];
    devices.particleAccessTokenValid = false;
    var ref = firebase.database().ref().child("users").child(resolvedUser.uid);
    var accountInfo = $firebaseObject(ref);
    accountInfo.$bindTo($scope, "devices.accountInfo");

    $scope.$watch('devices.accountInfo.particleAccessToken', devices.getDevices);
    
    
    
    activate();
    function activate() {
      $log.debug('devices activate', particleApi);
    }
    function getDevices(particleAccessToken){
      if (!particleAccessToken) {
        return;
      }
      $log.debug('attempting to list devices', particleAccessToken);
      var devicesPr = particleApi.listDevices({ auth: particleAccessToken });

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
    
    function toggleLed(deviceId, state){
      $log.debug('toggleLed', deviceId)
      var fnPr = particleApi.callFunction({
        auth: devices.accountInfo.particleAccessToken,
        deviceId: deviceId,
        argument: state ? 'on' : 'off',
        name: 'toggleState' });

      fnPr.then(
          function(data) {
            devices.accountInfo.particles[deviceId].selected = !!data.body.return_value;
            console.log('Function called succesfully:', data);
          }, function(err) {
            console.log('An error occurred:', err);
          });
    }
  }
})();
