// src/scripts/items.component.js
// items component with menuItems binding
(function () {
    'use strict';

    angular.module('MenuApp')
    .component('itemsList',{
      templateUrl: 'src/components/items.component.html',
      bindings:{
        menuItems: '<'
      }
    });

})();
