(function() {
  var module = angular.module('app.settings', []);

	//STILL TO BE IMPLEMENTED

  module.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings/settings.html',
      controller: 'settings'
    });
  });

  module.controller('settings', function($rootScope,$scope,$state) {
	isUserConnected($rootScope, $scope, $state);
    $scope.machin = "truc";
  });

})();
