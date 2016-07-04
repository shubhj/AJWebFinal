/**
Created by: 
	Priyanshu Srivastava (psrivast@adobe.com)
	Akash Agarwal (akasagar@adobe.com)
	Shubhi Jain (shubjain@adobe.com)
	*	@version:1.0
	*	Service code to interact with REST endpoints
**/

(function(){
	angular.module("service_module",[]);
	angular.module("service_module").service("RootService", function($http, $q) {
		this.join = function(str1, str2, opr){
			// console.log("Service Function called");	
			return str1+opr+str2;
		};
		this.getDetails = function() {
				var userDetails = JSON.parse(localStorage.getItem('user'));
				return userDetails;
		}
		this.getRestaurants = function() {
			var deferred= $q.defer();
			$http.get("http://localhost:8000/restaurant").then(
				function(data) {
					deferred.resolve(data);
				},
				function(data) {
					deferred.reject(data);
				}
			);
			// console.log(deferred);
			return deferred.promise;
		};
		this.getRestaurant = function(id) {
			var deferred= $q.defer();
			$http.get("http://localhost:8000/restaurant/"+id).then(
				function(data) {
					deferred.resolve(data);
				},
				function(data) {
					deferred.reject(data);
				}
			);
			// console.log(deferred);
			return deferred.promise;
		};
	});
})();
