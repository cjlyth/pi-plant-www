(function() {
  'use strict';

  angular
    .module('piplant')
    .controller('LightController', LightController);

  /** @ngInject */
  function LightController($log, particleApi, $scope, $interval) {
    var lights = this;
    lights.getLightLevel = getLightLevel;
    lights.lightLevels = {};
    lights.poller = $interval(refreshData, 3000);


    $scope.$on('$destroy', function(){
      if (angular.isDefined(lights.poller)) {
        $interval.cancel(lights.poller);
        lights.poller = undefined;
      }
    });

    return lights;

    function refreshData(){
      angular.forEach(lights.lightLevels, function(v,deviceId){
        if (v) {
          $log.debug('refreshData', deviceId, v);
          $scope.$evalAsync('lights.getLightLevel(main.accountInfo.particleAccessToken, deviceId, "analogvalue")', {
            deviceId: deviceId
          });
        }
      });
    }

    function getLightLevel(authToken, deviceId, varName){
      particleApi.getVariable({ deviceId: deviceId, name: varName, auth: authToken }).then(function(data) {
        if ('VarReturn' == data.body.cmd
         && 'analogvalue' == data.body.name) {
          $scope.$apply(function(){
            lights.lightLevels[deviceId] = data.body.result > 3500
                ? 'brightness_high' : data.body.result > 3200 ? 'brightness_medium' : 'brightness_low';
          });
        }
      }, function(err) {
        $scope.$apply(function(){
          lights.lightLevels[deviceId] = undefined;
        });
        $log.debug('An error occurred while getting attrs:', err);
      });
    }
  }

})();
