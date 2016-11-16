// src/scripts/categories.component.js
// categories component with categories binding
(function () {
    'use strict';

    angular.module('MenuApp')
    .component('categoriesList',{
      templateUrl: 'src/components/categories.component.html',
      bindings:{
        categories: '<'
      }
    });

})();
