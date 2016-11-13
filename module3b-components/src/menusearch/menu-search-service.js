// src/menusearch/menu-search-service.js
// NarrowItDown - Menu Search Service
(function () {
    'use strict';

    angular.module('NarrowItDownApp')
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    // Inject the $http service into the service
    MenuSearchService.$inject = ['$q', '$http', 'ApiBasePath']

    // Service function
    function MenuSearchService($q, $http, ApiBasePath) {
        var service = this;
        var menuItems = []; // array to cache the menu items received from http call

        // function to filter the menuItems array based on searchTerm
        // this method is called internally by the MenuSearchService only
        function getFilteredMenuItems(searchTerm) {
            var foundItems = [];
            for (var i = 0; i < menuItems.length; i++) {
                if (searchTerm.trim().length !== 0 &&
                    menuItems[i].description.indexOf(searchTerm) !== -1)
                    foundItems.push(menuItems[i]);
            }
            return foundItems;
        } // end of getFilteredMenuItems()

        // service function to get the menu items matching the searchTerm
        service.getMatchedMenuItems = function (searchTerm) {
            var deferred = $q.defer();
            var response = {};
            // for the first time get the menuItems from the http call
            // now the menuItems array is empty
            if (menuItems.length === 0) {
                response = $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json")
                });

                response.then(function (result) {
                    //                    console.log("service received the response : ", result.data.menu_items.length);
                    menuItems = result.data.menu_items;
                    //now filter & return all matching results
                    deferred.resolve(getFilteredMenuItems(searchTerm));
                }, function (error) {
                    deferred.reject(error);
                });
            }
            // if not for the first time, the menuItems array is already populated
            // now only filter the cached menuItems & return the foundItems
            else {
                deferred.resolve(getFilteredMenuItems(searchTerm));
            }
            return deferred.promise;
        }; // end of getMatchedMenuItems()

    } // end of service function

})();
