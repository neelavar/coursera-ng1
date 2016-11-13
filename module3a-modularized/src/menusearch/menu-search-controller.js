// src/menusearch/menu-search-controller.js
// NarrowItDown controller
(function () {
    'use strict';

    angular.module('NarrowItDownApp')
        .controller('NarrowItDownController', NarrowItDownController);

    // Inject the service into the controllers
    NarrowItDownController.$inject = ['MenuSearchService'];

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
