(function() {
	'use strict';
	angular.module('app', ['ui.router', "ngMaterial"])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider,$httpProvider) { // added $httpProvider because we're using AuthInterceptor
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('Login',{
			url: '/login',
			templateUrl: 'views/login.html'
		}).state('AllPosts',{
			url: '/allPosts',
			templateUrl: 'views/allPosts.html'
		}).state('CreatePost',{
			url: '/createPost',
			templateUrl: 'views/createPost.html'
		}).state('EditPost', {
			url: '/editPost/:id',
			templateUrl: 'views/editPost.html'
		}).state('FullPost', {
			url: '/post/:id',
			templateUrl: 'views/fullPost.html'
		});
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push("AuthInterceptor");
	}
})();
