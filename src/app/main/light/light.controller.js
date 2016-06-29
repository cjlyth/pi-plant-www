(function () {
  'use strict';

  angular
    .module('piplant')
    .controller('LightController', LightController);

  /** @ngInject */
  function LightController($log, particleApi, $scope, $interval) {
    var lights = this;
    lights.getLightLevel = getLightLevel;
    lights.toggleLights = toggleLights;
    lights.initDevice = initDevice;

    lights.lightLevels = {};
    lights.poller = $interval(refreshData, 2000);


    $scope.$on('$destroy', function () {
      if (angular.isDefined(lights.poller)) {
        $interval.cancel(lights.poller);
        lights.poller = undefined;
      }
    });

    return lights;

    function initDevice(authToken, deviceId) {
      //  lights.lightLevels[deviceId] = deviceInfo.enabled && 'update'
      $log.debug('initDevice', deviceId);
      lights.lightLevels[deviceId] = {};
      lights.getLightLevel(authToken, deviceId);
    }

    function toggleLights(authToken, deviceId, ledState) {
      $log.debug('toggleLights', deviceId, ledState, (ledState ? 'off' : 'on'));

      particleApi.callFunction({
        deviceId: deviceId,
        name: 'led',
        auth: authToken,
        argument: (ledState ? 'off' : 'on')
      }).then(function (data) {
        $scope.$apply(function () {
          angular.extend(lights.lightLevels[deviceId], {
            ledState: data.body.return_value || 0
          });
        });
      }, function (err) {
        $scope.$apply(function () {
          lights.lightLevels[deviceId] = undefined;
        });
        $log.debug('An error occurred while getting attrs:', err);
      });
    }

    function refreshData() {
      angular.forEach(lights.lightLevels, function (v, deviceId) {
        if (v) {
          $scope.$evalAsync('main.accountInfo.particles[deviceId].enabled && lights.getLightLevel(main.accountInfo.particleAccessToken, deviceId)', {
            deviceId: deviceId
          });
        }
      });
    }

    function getLightLevel(authToken, deviceId) {
      particleApi.getVariable({deviceId: deviceId, name: 'analogvalue', auth: authToken}).then(function (data) {
        if ('VarReturn' == data.body.cmd && 'analogvalue' == data.body.name) {
          $scope.$apply(function () {
            angular.extend(lights.lightLevels[deviceId], {
              iconName: 'brightness_' + data.body.result,
              lightValue: data.body.result
            });
          });
        }
      }, function (err) {
        $scope.$apply(function () {
          lights.lightLevels[deviceId] = undefined;
        });
        $log.debug('An error occurred while getting attrs:', err);
      });
    }
  }

})();
