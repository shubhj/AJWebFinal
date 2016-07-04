/**
Created by: 
	Priyanshu Srivastava (psrivast@adobe.com)
	Akash Agarwal (akasagar@adobe.com)
	Shubhi Jain (shubjain@adobe.com)

Main Configuration File for Routing and handling cookies 

**/

(function() {
	// angular.module("main_module",["ngRoute", "ngCookies"]);
	angular.module("main_module").config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when("/",{
			templateUrl: 'app/page/restaurants.html',
			controller:function($scope,$rootScope) {
				// console.log("jkbfjkbn");
				$rootScope.greet = "Deliver To:  ";
				$rootScope.opr = " , ";
			}
		})
		.when("/customer", {
			templateUrl:'app/page/login.html',
			controller:function($scope,$rootScope) {
				// console.log("jkbfjkbn");

				$rootScope.greet = "Hi  ";
				$rootScope.opr = " @ ";
			}
		})
		.when("/menu/:resId", {
			templateUrl:'app/page/restaurant.html',
			controller:function($scope,$rootScope,$routeParams) {
				// console.log("jkbfjkbn");
				$scope.restaurantId = $routeParams.resId;
				$rootScope.greet = "Deliver To:  ";
				$rootScope.opr = " , ";
			}
		})
		.when("/checkout/:resId", {
			templateUrl:'app/page/checkout.html',
			controller:function($scope,$routeParams,$rootScope) {
				$scope.restaurantId = $routeParams.resId;
				//console.log($scope.restaurantId);
			}
		})
		.otherwise({
			templateUrl:'app/page/restaurants.html',
			controller:function($scope,$rootScope) {
				// console.log("jkbfjkbn");

				$rootScope.greet = "Deliver To:  ";
				$rootScope.opr = " , ";
			}
		})
	}).run(check); // runs everytime when the url is changed
	function check($cookieStore,$rootScope,$location){
		//called once when the router is registered
		
		$rootScope.$on("$locationChangeStart", 	function() {
			console.log("HereHere");
			if(localStorage.getItem("user")) {
				//Do Nothing
			}
			else {	
				$location.path("/customer");
			}
		});

	}
})();