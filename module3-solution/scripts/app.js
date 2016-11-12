//./scripts/app.js
//Main app js file to define angular module and controller
(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    // Inject the service into the controllers
    NarrowItDownController.$inject = ['MenuSearchService'];

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

    // -----------------------------------------------------------------------

    // function for FoundItems Directive
    function FoundItems() {
        var ddo = {
            restrict: 'E',
            scope: {
                foundItems: '<',
                showLoader: '<',
                onRemove: '&'
            },
            templateUrl: 'partials/found-items.html',
            link: FoundItemsDirectiveLink
        };
        return ddo;
    } // end of directive function

    function FoundItemsDirectiveLink(scope, element, attrs, controller) {
        scope.$watch('foundItems.length === 0', function (newValue, oldValue) {
            if (newValue === true) {
                displayNothingFound();
            } else {
                removeNothingFound();
            }
        });

        function displayNothingFound() {
            // Using Angluar jqLite
            var errorElem = element.find("span");
            console.log(errorElem);
            errorElem.css('display', 'block');
        }


        function removeNothingFound() {
            // Using Angluar jqLite
            var errorElem = element.find("span");
            errorElem.css('display', 'none');
        }
    } // end of directive link
    // ---------------------------------------------------------------------------

    // NarrowItDownController function
    function NarrowItDownController(MenuSearchService) {
        var self = this;
        self.searchTerm = '';
        self.found = {};
        self.showLoader = false;
        // show loader only when the searchMenu() is called till results are obtained

        self.searchMenu = function () {
            // get the promise from MenuSearchService
            var promise = MenuSearchService.getMatchedMenuItems(self.searchTerm);
            self.showLoader = true;
            promise.then(function (result) {
                self.found = result;
                self.showLoader = false;
            }, function (error) {
                console.log("Error in getting the searched Menu Items", error);
            });
        };

        self.removeItem = function (index) {
            self.found.splice(index, 1);
        }; // end of removeItem()

    }; // end of NarrowItDownController

})();
