(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('DevicesController', DevicesController);

  /** @ngInject */
  function DevicesController($log, $scope, resolvedUser, $firebaseObject, particleApi) {
    var devices = this;

    devices.getDevices = getDevices;
    devices.accountInfo = {};
    devices.particleDeviceList = [];
    devices.particleAccessTokenValid = false;

    var ref = firebase.database().ref().child("users").child(resolvedUser.uid);
    $firebaseObject(ref).$bindTo($scope, "devices.accountInfo");

    $scope.$watch('devices.accountInfo.particleAccessToken', devices.getDevices);

    function getDevices(particleAccessToken){
      if (!particleAccessToken) {
        return;
      }
      return particleApi.listDevices({ auth: particleAccessToken })
          .then(getDevicesComplete, getDevicesFailed);
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
