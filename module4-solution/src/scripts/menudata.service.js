// src/scripts/menudata.module.js
// data module - MenuDataService
(function() {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    // Inject the $http service into the service
    MenuDataService.$inject = ['$q', '$http', 'ApiBasePath']

    function MenuDataService($q, $http, ApiBasePath) {
        var service = this;
        var categories = [];

        service.getAllCategories = function() {
                var deferred = $q.defer();
                var response = {};
                // for the first time get the categories from the http call
                // now the categories array is empty
                if (categories.length === 0) {
                    response = $http({
                        method: "GET",
                        url: (ApiBasePath + "/categories.json")
                    });
                    // https://davids-restaurant.herokuapp.com/categories.json

                    response.then(function (result) {
                       console.log("service received the response : ", result.data.length);
                        categories = result.data;
                        //now return all categories through deferred resolution
                        deferred.resolve(categories);
                    }, function (error) {
                        deferred.reject(error);
                    });
                }
                // if not for the first time, the categories array is already populated
                else {
                    deferred.resolve(categories);
                }
                return deferred.promise;
            }; // end of getAllCategories()


        service.getItemsForCategory = function(categoryShortName) {
            // https://davids-restaurant.herokuapp.com/menu_items.json?category=
            var deferred = $q.defer();
            console.log("MenuDataService for Items, categoryShortName = ",categoryShortName);
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params:{
                  category:categoryShortName
                }
            });
            response.then(function(result){
              deferred.resolve(result.data.menu_items);
            }, function (error) {
              deferred.reject(error);
            });
            return deferred.promise;
        };

    }
})();
