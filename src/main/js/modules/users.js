(function() {
    var module = angular.module('app.users', []);
    module.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/"); //if someone messes up the url, go back home
        $stateProvider
            .state('subscribe', {
                url: '/subscribe',
                templateUrl: 'accounts/subscribe.html',
                controller: 'subscribe'
                    //here the description of the controller is given separately, below
            })
            .state('login', {
                url: '/login',
                templateUrl: 'accounts/login.html',
                controller: 'login'
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'accounts/logout.html',
                controller: 'logout'
            })
            .state('account', {
                url: '/account',
                templateUrl: 'accounts/account.html',
                controller: 'account'
            });
    });

    module.controller('login', function($rootScope, $scope, $state, $http) {
        //$http is to access the http services, to make GET requests.
        $scope.app.configHeader({
            title: "Login"
        });
        $scope.form = {}; //create namespace form to hold attempted credentials
        $scope.form.server = RESTAPISERVER;

        $scope.submit = function() {
            //gets called by login.html upon submit
          	$scope.errorLogin = false;
          	$scope.errorServer = false;
            RESTAPISERVER = $scope.form.server;
            var user = $scope.form.login;
            var password = $scope.form.password;
            $http.get(RESTAPISERVER + "/api/users/login?login=" + user + "&password=" + password).then(
                function(response) {
                    //if GET succeeds
                    var obj = response.data;
                    //load the answer
                    console.debug(obj);
                    //print it to the console just for debugging
                    if (obj.error) {
                    	//user feedback
                        $scope.errorLogin = true;
                    } 
                    else if(user == undefined){
                    	$scope.errorLogin = true;
                    } else {
                        $http.defaults.headers.common['Auth-Token'] = obj.token;
                        //Put the obtained authentification token in what is common to http headers
                        //so that it will always be sent with http requests from now on
                        $scope.app.userid = obj.userid;
                        //remember userid
                        
                        //affiche plus d'options dans le side-menu (ng-show="userLogged")
						//$rootScope est "le $scope principal" de l'application il "voit" tous les scopes quelque soit le state/controller...
                        isUserConnected($rootScope,$scope,$state);
                        
                        $state.go('myItemsView');
                        //go to the state that shows items
                    }

                },
                function(response) {
                	//user feedback
                	$scope.errorServer = true;
                });
        };
    });

    module.controller('account', function($rootScope, $scope, $state, $http, User) {
		isUserConnected($rootScope,$scope,$state);
        $scope.app.configHeader({
            title: "Account"
        });
        //Shows account.
        //User is defined in restApi and gets all user data form server.
        var user = User.get({
            id: $scope.app.userid
        }, function() {
            $scope.user = user;
        });
        //In the beginning user is created empty. It will be filled in as the data gets retrieved.
        //I know that is has been filled when the anonymous function gets called.
        //I can then save the result in scope.user
    });

    module.controller('logout', function($rootScope, $scope, $state, $http) {
		isUserConnected($rootScope,$scope,$state);
        $scope.app.configHeader({
            title: "logout"
        });
        $http.get(RESTAPISERVER + "/api/users/logout");
        $scope.app.setCurrentUser(null);
        $scope.app.userid = undefined;
        
        //on cache les options dans le side-menu
        $rootScope.userLogged = false;
    });

    module.controller('subscribe', function($scope, $state, $http) {
      $http.delete(RESTAPISERVER + "/api/users")
        
        $scope.app.configHeader({
            title: "Subscribe",
            back: true //display the back button
        });
        $scope.form = {};
        $scope.form.server = RESTAPISERVER;

        $scope.submit = function() {
            $scope.error = false;
            $scope.errorServer = false;
            RESTAPISERVER = $scope.form.server;
            var user = $scope.form.login;
            var password = $scope.form.password;
            $http.get(RESTAPISERVER + "/api/users/").then(
              function(response) {
                  var obj = response.data;
                  if (obj.error) {
                    $scope.errorServer = true;
                  }
                  else if(user == undefined){
                    $scope.error = true;
                  } else if(password == undefined){
                    $scope.error = true;
                  } else {
                    var flag = 1;
                    for(var i = 0; i < obj.length; i++){
                      if(obj[i].nick == user){
                        $scope.errorLogin = true;
                        flag = 0;
                      }
                    }
                    if(flag){
                      $http.get(RESTAPISERVER + "/api/users/subscribe?login=" + user + "&password=" + password).then(
                        function(response) {
                          var data = response.data;
                          $scope.app.setCurrentUser(user);
                          $http.defaults.headers.common['Auth-Token'] = data.token;
                          $scope.app.userid = data.userid;
                          $state.go("myItemsView");
                        }, function(reponse) {
                          $scope.errorServer = true;
                        });
                    }
                  }
              }, function(response) {
                $scope.errorServer = true;
              });
        };
    });

})();
