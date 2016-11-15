// src/scripts/routes.js
// Routes js file to define App ui routes
(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'src/templates/home.html'
        })

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
