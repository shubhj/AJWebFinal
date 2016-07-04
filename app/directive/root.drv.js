/*
Created by: 
	Priyanshu Srivastava (psrivast@adobe.com)
	Akash Agarwal (akasagar@adobe.com)
	Shubhi Jain (shubjain@adobe.com)
*/
(function(){

	var ang = angular.module("custom_directive", ["service_module"]);

	ang.directive("topBar", function(){
		x={};
		x.restrict='EA';
		x.templateUrl='app/template/topbar.html';

		x.scope = {
			first:"=",
			second:"=",
			brand:"="
		};
		return x;
	});
	
	ang.directive("secondBar", function(RootService){
		x={};
		x.restrict='EA';
		x.templateUrl='app/template/secondbar.html';
		x.scope = {
			brand:"="
		};
		return x;
	});
	
})();
