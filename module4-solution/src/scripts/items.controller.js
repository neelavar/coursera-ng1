// src/scripts/items.controller.js
// Controller to handle the menu items of selected category
(function() {
    'use strict';
    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    // inject the 'menuItems' resolved from the state router
    ItemsController.$inject = ['menuItems'];

    function ItemsController(menuItems) {
        var itemsCtrl = this;
        itemsCtrl.menuItems = menuItems;
        console.log("Received menu Items Length = ", itemsCtrl.menuItems.length);
    }
})();
