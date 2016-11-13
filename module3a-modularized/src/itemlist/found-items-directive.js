// src/itemlist/found-items-directive.js
// found-items directive
(function () {
    'use strict';

    angular.module('itemlist')
        .directive('foundItems', FoundItems);

    // function for FoundItems Directive
    function FoundItems() {
        var ddo = {
            restrict: 'E',
            scope: {
                foundItems: '<',
                showLoader: '<',
                onRemove: '&'
            },
            templateUrl: 'src/itemlist/found-items.html',
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

})();
