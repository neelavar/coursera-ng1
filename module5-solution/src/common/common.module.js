(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://neelavar-rest-server.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
