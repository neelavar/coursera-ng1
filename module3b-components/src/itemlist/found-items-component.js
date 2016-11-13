// src/itemlist/found-items-component.js
// found-items component
(function () {
    'use strict';

    angular.module('itemlist')
        .component('foundItems', {
            templateUrl: 'src/itemlist/found-items.html',
            controller: FoundItemsComponentController,
            bindings: {
                foundItems: '<',
                showLoader: '<',
                onRemove: '&'
            }
        });

    FoundItemsComponentController.$inject = ['$element'];

    function FoundItemsComponentController($element) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            removeNothingFound();
        };

        $ctrl.$doCheck = function () {
            if ($ctrl.foundItems.length === 0) {
                displayNothingFound();
            } else {
                removeNothingFound();
            }
        };

        function displayNothingFound() {
            // Using Angluar jqLite
            var errorElem = $element.find("span");
            console.log(errorElem);
            errorElem.css('display', 'block');
        }

        function removeNothingFound() {
            // Using Angluar jqLite
            var errorElem = $element.find("span");
            errorElem.css('display', 'none');
        }

        $ctrl.remove = function (itemIndex) {
            $ctrl.onRemove({
                index: itemIndex
            });
        };
    } // end of component

})();
