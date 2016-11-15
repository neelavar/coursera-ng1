// src/scripts/items.component.js
// items component
(function () {
    'use strict';

    angular.module('MenuApp')
    .component('items',{
      templateUrl: 'src/components/items.component.html',
      bindings:{
        menuItems: '<'
      }
    });

})();
