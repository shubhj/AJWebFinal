/*
Created by: 
	Priyanshu Srivastava (psrivast@adobe.com)
	Akash Agarwal (akasagar@adobe.com)
	Shubhi Jain (shubjain@adobe.com)
*/

(function() {
	var ng = angular.module("main_module",["service_module", "ngRoute", "ngCookies", "custom_directive"]);

	ng.controller("RootController", function($scope, $rootScope, $window, RootService) {
			$rootScope.user = {
				'name':'Customer', 'address':'Home'
			};
			$rootScope.options = [
				'Chinese', 'Indian', 'Thai', 'Vegetarian'
			];
			$rootScope.optionValues = {'Chinese':false, 'Indian':false, 'Thai':false, 'Vegetarian':false}
			$scope.first=  $scope.second = $scope.brand = "";
			$scope.userLt = localStorage.getItem('user');
			$rootScope.detailsInLS = ($scope.userLt == null)?false:true;
			$window.onload = function() {	
				if(!$rootScope.detailsInLS) {
					$("#changeDetailsBtn").click();
				}
			};
			if($rootScope.detailsInLS) {
					$rootScope.user = RootService.getDetails();
			}
			
		});


	ng.controller("SecondBarController",function($scope, $rootScope,RootService){

		$scope.join = function(str1, str2, opr) {
			// console.log("controller Function called");	
			return RootService.join(str1, str2, opr);
		};

		$scope.submitDetails = function(name, address) {
			localStorage.removeItem('user');
			localStorage.setItem('user', JSON.stringify({'name':name, 'address':address}));
			$rootScope.user = RootService.getDetails();
		};

	});

	ng.controller("RestaurantListController", function($scope, $rootScope,RootService) {
		$scope.filteredRestaurants = $scope.restaurants = [];
		RootService.getRestaurants().then(function(result){
			$scope.filteredRestaurants = $scope.restaurants = result.data;
		},function(){console.log("Error in getting Restaurant List");});
		$scope.range = function(n) {
      		return new Array(n);
    	};
    	$scope.filterRestaurants = function(option) {
    		$anySelected = false;
    		$rootScope.options.forEach(function(option) {
    			if($rootScope.optionValues[option])
    				$anySelected = true;
    		});
    		console.log('anySelected'+$anySelected);
    		console.log($scope.restaurants);
    		if(!$anySelected) {
    			$scope.filteredRestaurants = $scope.restaurants;
    		}
    		else {
    			$result = [];
    			$scope.restaurants.forEach(function(restaurant){
    				$selectable = false;
    				$rootScope.options.forEach(function(option) {
    					if($rootScope.optionValues[option] && restaurant.cuisine.toUpperCase() == option.toUpperCase()) {
    						$selectable = true;
    					}
    				});
    				if($selectable)
    					$result.push(restaurant);
    			});
    			$scope.filteredRestaurants = $result;
    		}
    	};
	});
	
	ng.controller("RestaurantController",function($scope,RootService) {
		$scope.price = 0;
		$scope.menuChosen = {};
		RootService.getRestaurant($scope.restaurantId).then(function(result){
				$scope.restaurant = result.data;
				
			});
		function loadData(){

			var price = localStorage.getItem('price');
			if(price != null){
				$scope.price = parseInt(price);
			}
			var menuChosen = JSON.parse(localStorage.getItem('menuChosen'));
			if(menuChosen != null){
				$scope.menuChosen = menuChosen;
			}
			console.log($scope.menuChosen);			
		}
		loadData();
		$scope.setMenu=function(){
			localStorage.removeItem('price');
			localStorage.removeItem('menuChosen');

			localStorage.setItem('price',$scope.price);
			localStorage.setItem('menuChosen',$scope.menuChosen);
			console.log($scope.menuChosen);


			localStorage.setItem('menuChosen',JSON.stringify($scope.menuChosen));
			//console.log(localStorage.getItem('menubar'));
			//var userDetails = JSON.parse(localStorage.getItem('menubar'));
			//console.log(userDetails);
		};


		$scope.addItem = function(item) {
			if($scope.menuChosen[item.name])
				$scope.menuChosen[item.name][0] = $scope.menuChosen[item.name][0] + 1;
			else
				$scope.menuChosen[item.name] = [1,item.price];
			$scope.price = $scope.price + item.price;
			$scope.price = Math.round($scope.price*100)/100;
		}
		$scope.deleteItem = function(item) {
			$scope.menuChosen[item.name][0] = $scope.menuChosen[item.name][0] - 1;
			$scope.price = $scope.price - item.price;
			$scope.price = Math.round($scope.price*100)/100;
		}
	});


	ng.controller("checkoutController", function($scope){
		$scope.paymentSuccess = false;
		$scope.finalmenu = JSON.parse(localStorage.getItem('menuChosen'));
		$scope.totalPrice=localStorage.getItem('price');

		$scope.printSucessMsg = function(){
			$scope.paymentSuccess = true;

			localStorage.removeItem('price');
			localStorage.removeItem('menuChosen');
		};

		console.log($scope.finalmenu);
	});


})();