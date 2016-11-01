//./app.js
//Main app js file to define angular module and controller
(function () {
    'use strict';

    angular.module('CheckOffApp', [])
        .controller('CheckOffController', CheckOffController);

    //    CheckOffController.$inject = ['$scope'];

    //Controller function
    function CheckOffController() {
        var shoppingList = this;

        // toBuyItems - array holds the data for shopping list items to buy
        shoppingList.toBuyItems = [
            {
                name: 'cookies',
                quantity: 10
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
        ]; // loaded with 5 items

        // boughtItems - array holds the data for shopping list items that are bought
        shoppingList.boughtItems = [

        ]; // initialized with no items to start with

        // checkOff() - function to remove the item from toBuyItems and
        // add the same item into boughtItems array
        shoppingList.checkOff = function (index) {
            // momentarily hold the 'item' on which checkOff is called for
            var item = shoppingList.toBuyItems[index];
            shoppingList.toBuyItems.splice(index, 1); // remove the item from toBuyItems
            shoppingList.boughtItems.push(item); // add into boughtItems
        };
    };


})();
