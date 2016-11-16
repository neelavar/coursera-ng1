// src/scripts/routes.js
// Routes js file to define App ui routes
(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Default route & any other cases would be /home
        $urlRouterProvider.otherwise('/home');

        // The route /home
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'src/templates/home.html'
        })

        // The route /categories
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/templates/categories.html',
            controller: 'CategoriesController as catCtrl',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        // The route /items
        .state('items', {
            url: '/items/{categoryShortName}',
            templateUrl: 'src/templates/items.html',
            controller: 'ItemsController as itemsCtrl',
            resolve: {
                menuItems: ['$stateParams', 'MenuDataService',
                    function($stateParams, MenuDataService) {
                      console.log("Router categoryShortName = ",$stateParams.categoryShortName);
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }
                ]
            }
        });
    }

})();
