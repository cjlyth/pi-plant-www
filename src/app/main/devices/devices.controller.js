(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('DevicesController', DevicesController);

  /** @ngInject */
  function DevicesController($log, $scope, particleApi) {
    var devices = this;
      $log.debug('DevicesController init');
    devices.getDevices = getDevices;
    devices.particleDeviceList = [];
    devices.particleAccessTokenValid = false;

    $scope.$watch('main.accountInfo.particleAccessToken', devices.getDevices);

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
