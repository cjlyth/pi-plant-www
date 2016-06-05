/* eslint-env browser */
(function() {
  'use strict';
  angular.module('phoneList').component('phoneList', {
    templateUrl: 'scripts/home/home.template.html',
    controller: function PhoneListController() {
      console.log('home controller');
      this.phones = [
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
    }
  });
})();
