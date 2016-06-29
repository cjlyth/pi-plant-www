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
