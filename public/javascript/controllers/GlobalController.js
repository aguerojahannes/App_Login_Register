(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $state) {
		var vm = this;
		vm.isLogin = true;
		vm.user = {};
		vm.status = UserFactory.status;

		vm.registerUser = function(){
			UserFactory.registerUser(vm.user).then(function(){
				$state.go("AllPosts");
			});
		};

		vm.loginUser = function(){
			UserFactory.loginUser(vm.user).then(function(){
				$state.go("AllPosts");
			});
		};

		vm.logout = function(){
			UserFactory.logout();
			$state.go("Home");
		};

	}
})();


// REGISTER AND LOGIN BEFORE PASSPORT
// vm.registerUser = function(){
// 	UserFactory.registerUser(vm.user).then(function(){
// 		$state.go("AllPosts");
// 	});
// };
//
// vm.loginUser = function(){
// 	UserFactory.loginUser(vm.user).then(function(){
// 		$state.go("AllPosts");
// 	});
// };
//
// vm.logout = function(){
// 	UserFactory.logout();
// 	$state.go("Home");
// };
