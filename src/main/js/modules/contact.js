(function() {
	var module = angular.module('app.contact', []);

	//This declares states, their routes, their appeareance, and gives the name of their controller
	module.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('contact', {
				url: '/contact',
				templateUrl: 'contact.html',
				controller: 'contact'
			})
	});

	// 'about' state controller function
	module.controller('contact', function($rootScope, $scope, Item) {
		//isUserConnected($rootScope, $scope);
		$scope.app.configHeader({
            title: "Contact",
            back: false,
            contextButton: null
        });
		console.log("cfg head: "+$scope.app.configHeader);
		
		
		
		$scope.submit = function() {
			var nom = $scope.form.nom;
			var mailFrom = $scope.form.mail;
			var msg = $scope.form.message;
			
			console.log("submit = nom:"+nom+" mail:"+mailFrom+" msg:'"+msg+"'");
		}
		
		
	});
	
})();

