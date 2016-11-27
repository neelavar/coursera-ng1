(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'UserService'];

    function SignUpController(MenuService, UserService) {
        var $ctrl = this;
        $ctrl.user = {};
        $ctrl.inValidMenu = false;
        $ctrl.saved = false;

        $ctrl.submit = function () {
            // First check whether the provided favorite menu item is valid
            var promise = MenuService.getSpecificMenuItem($ctrl.user.favmenuitem);
            promise.then(function (result) {
                // valid menu item - hence save user preferences
                $ctrl.user.savedmenuitem = result.data;
                UserService.saveUser($ctrl.user);
                $ctrl.saved = true;
                $ctrl.inValidMenu = false;
            }, function (error) {
                // invalid menu item - hence show error
                UserService.saveUser(null);
                $ctrl.saved = false;
                $ctrl.inValidMenu = true;
            });
        }
    }

})();
