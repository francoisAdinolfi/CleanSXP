(function() {
	var module = angular.module('app.contracts',[]);

	module.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
		
		.state('contracts', {
			url: '/contracts',
			templateUrl: 'contracts.html',
			controller: function($rootScope, $scope, $state) {
				isUserConnected($rootScope,$scope,$state);
				$scope.app.configHeader({contextButton:'addContract', title: 'Contracts'});
			}
		})
		
		.state('addContract', {
			url: '/contracts/add',
			templateUrl: 'newContract.html',
			controller: function($http, $rootScope, $scope, $state, User, Item) {
				isUserConnected($rootScope,$scope,$state);
				$scope.app.configHeader({back: true, title: 'New Contract'});
				var user = User.get({
            		id: $scope.app.userid
        		}, function() {
            		$scope.user = user;
        		});
        		
        		RESTAPISERVER = "http://localhost:8081";
        		$http.get(RESTAPISERVER + "/api/items/").then(
        			function(response){
        				$scope.items = response.data;
        				var list = document.getElementById("items-list");
        				for(i=0; i<$scope.items.length; i++){
        					var item = document.createElement("option");
        					item.value = $scope.items[i].title;
        					item.text = $scope.items[i].title;
        					list.appendChild(item);
        				}
        			});
        			
        		$http.get(RESTAPISERVER + "/api/users/").then(
        			function(response){
        				var userList = response.data;
        				$scope.userList = [];

        				for(i=0; i<userList.length; i++){
        					$scope.userList[i] = { 'name' : userList[i].nick };
        				}
			 
				// saisie du nom de la carte
				$scope.trader = null;
        			}
        		);
			}
		});
	});
})();
