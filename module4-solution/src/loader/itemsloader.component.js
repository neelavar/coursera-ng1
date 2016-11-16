// src/loader/itemsloader.component.js
// Component to manage the Loader indicator
(function () {
    'use strict';

    angular.module('loader')
        .component('itemsLoader', {
            templateUrl: 'src/loader/itemsloaderindicator.template.html',
            controller: LoaderController
        });


    LoaderController.$inject = ['$rootScope']

    function LoaderController($rootScope) {
        var $ctrl = this;
        var cancellers = [];

        // Turn on the loader indicator when the state transition starts
        // and turn it off when the state change is completed with success or error
        $ctrl.$onInit = function () {
            var cancel = $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams, options) {
                    $ctrl.showLoader = true;
                });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    $ctrl.showLoader = false;
                });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeError',
                function (event, toState, toParams, fromState, fromParams, error) {
                    $ctrl.showLoader = false;
                });
            cancellers.push(cancel);
        };

        // on destroy of the view, cancel all listeners for loader indicator
        $ctrl.$onDestroy = function () {
            cancellers.forEach(function (item) {
                item();
            });
        };

    };

})();
