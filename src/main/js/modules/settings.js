(function() {
  var module = angular.module('app.settings', []);

	//STILL TO BE IMPLEMENTED

  module.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings/settings.html',
      controller: 'settings'
    })
    .state('password', {
      url: '/password',
      templateUrl: 'settings/password.html',
      controller: 'password'
    });
  });

  module.controller('settings', function($rootScope,$scope,$state, User) {
	isUserConnected($rootScope, $scope, $state);
	$scope.app.configHeader({contextButton:'', title: 'Settings', back:null});
	var user = User.get({
            id: $scope.app.userid
        }, function() {
            $scope.user = user;
    });

	
  });
  
  module.controller('password', function($rootScope,$scope,$state, User) {
	isUserConnected($rootScope, $scope, $state);
	$scope.app.configHeader({contextButton:'', title: 'Settings : change password', back:true});
	var user = User.get({
            id: $scope.app.userid
        }, function() {
            $scope.user = user;
    });
    
    $scope.submit = function() {
		//check passwords
		if($scope.form.pass1 != $scope.form.pass2){
			$scope.error = true;
			$scope.changed = false;
		}
		else if($scope.form.pass1.length > 0){
			$scope.error = false;
			$scope.changed = true;
			//new pass = $scope.form.pass1 
			/*insert request/function to change the password in the DB*/
		}
	}

	
  });

})();
