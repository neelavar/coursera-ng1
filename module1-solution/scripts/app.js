//./app.js
//Main app js file to define angular module and controller
(function(){
  'use strict';

  angular.module('LunchChecker',[])
        .controller('LunchCheckController', LunchCheckController)
        .$inject = ['$scope'];

//Controller function
  function LunchCheckController($scope){
    $scope.menuItems = ""; // holds the data for menu items entered by the user
    $scope.response = ""; // holds the response message
    $scope.alertState = ""; // holds the alert state to style the response message
    $scope.icon = ""; // glyphicon icon to associate with the response message

//function to split the lunch menu text and count the no. of items
    function getMenuItemsCount(string){
      var itemCount = 0;
      var stringArray = string.split(',');
      for (var i = 0; i < stringArray.length; i++) {
        stringArray[i] = stringArray[i].replace(/ /g,'');
        if(stringArray[i].length >0) itemCount++;
      }
      return itemCount;
    };

//function to set the response message based on the menu item count
// if no items entered (0) - case 0
// for any values between 1 & 3 (inclusive) - Enjoy!
// otherwise - for values more than 3 - Too much!
     $scope.checkIfTooMuch = function(){
       switch (getMenuItemsCount($scope.menuItems)){
         case 0:
           $scope.response = 'Please enter data first';
           $scope.alertState = 'danger';
           $scope.icon = 'exclamation-sign';
           break;
         case 1:
         case 2:
         case 3:
           $scope.response = 'Enjoy!';
           $scope.alertState = 'success';
           $scope.icon = 'ok';
           break;
         default:
           $scope.response = 'Too much!';
           $scope.alertState = 'warning';
           $scope.icon = 'flag';
       }
    };

  };
})();
