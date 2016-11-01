//./app.js
//Main app js file to define angular module and controller
(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    // Inject the service into the controllers
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    // Service function
    function ShoppingListCheckOffService() {
        var service = this;

        // toBuyItems - array holds the data for shopping list items to buy
        var toBuyItems = [
            {
                name: 'cookies',
                quantity: 25
            }, {
                name: 'chips',
                quantity: 5
            }, {
                name: 'soda',
                quantity: 10
            }, {
                name: 'cheese blocks',
                quantity: 4
            }, {
                name: 'donuts',
                quantity: 12
            }
        ]; // loaded with 5 items into toBuy List

        // boughtItems - array holds the data for shopping list items that are bought
        var boughtItems = []; // initialized with no items to start with

        // checkOff() - function to remove the item from toBuyItems and
        // add the same item into boughtItems array
        service.checkOff = function (index) {
            // momentarily hold the 'item' on which checkOff is called for
            var item = toBuyItems[index];
            toBuyItems.splice(index, 1); // remove the item from toBuyItems
            boughtItems.push(item); // add into boughtItems
        };

        // function to expose toBuyItems array
        service.getToBuyItems = function () {
            return toBuyItems;
        };

        // function to expose boughtItems array
        service.getAlreadyBoughtItems = function () {
            return boughtItems;
        };

    }; // end of service function

    // ToBuyContoller function
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        // obtain the items list from the service
        toBuy.itemList = ShoppingListCheckOffService.getToBuyItems();

        // utilize the checkOff function from the service
        toBuy.checkOff = function (index) {
            return ShoppingListCheckOffService.checkOff(index);
        };

    }; // end of ToBuyController

    // AlreadyBoughtController function
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        // obtain the items list from the service
        alreadyBought.itemList = ShoppingListCheckOffService.getAlreadyBoughtItems();

    }; // end of AlreadyBoughtController

})();
