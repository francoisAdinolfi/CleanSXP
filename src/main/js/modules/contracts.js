(function() {
	var module = angular.module('app.contracts',[]);

	module.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
		.state('contracts', {
			url: '/contracts',
			templateUrl: 'contracts.html',
			controller: function($scope) {
				$scope.app.configHeader({contextButton:'addContract', title: 'Contracts'});
			}
		})
		.state('addContract', {
			url: '/contracts/add',
			templateUrl: 'newContract.html',
			controller: function($scope) {
				$scope.app.configHeader({back: true, title: 'New Contract'});
			}
		});
	});
})();
