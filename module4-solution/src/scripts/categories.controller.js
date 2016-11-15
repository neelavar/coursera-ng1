// src/scripts/CategoriesController.js
// Controller to handle the categories
(function() {
    'use strict';
    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);

    // inject the 'categories' resolved from the state router
    CategoriesController.$inject = ['categories'];

    function CategoriesController(categories) {
        var catCtrl = this;
        // console.log(categories);
        catCtrl.categories = categories;
        console.log("Received Categories Length = ", catCtrl.categories.length);
    }
})();
