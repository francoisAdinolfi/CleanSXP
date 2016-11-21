(function() {
	var module = angular.module('messages', []);

	//STILL TO BE IMPLEMENTED

	module.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
		.state('messages', {
			url: '/messages',
			templateUrl: 'messages.html',
			controller: function($scope) {
				$scope.app.configHeader({contextButton:'addMessage', title: 'Messages'});
			}
		})
		.state('addMessage', {
			url: '/messages/new',
			templateUrl: 'newMessage.html',
			controller: function($scope) {
				$scope.app.configHeader({contextButton:'', title: 'New message', back:'yes'});
			}
		});
	});
})();
