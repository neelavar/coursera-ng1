// src/scripts/categories.component.js
// categories component
(function () {
    'use strict';

    angular.module('MenuApp')
    .component('categories',{
      templateUrl: 'src/components/categories.component.html',
      // controller: 'CategoriesController as catCtrl',
      bindings:{
        categories: '<'
      }
    });

})();
