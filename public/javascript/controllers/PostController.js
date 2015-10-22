(function() {
	'use strict';
	angular.module('app')
	.controller('PostController', PostController);

	function PostController(PostFactory,$state) {
		var vm = this;
		vm.post = {};
		vm.post.tags=  ["gegr", "gfdg"];
		// vm.username = {};
		vm.postType = ["Job Offer", "Job Request"];

		vm.addNewPost = function(){ // pass in username from here? or server side?''
			PostFactory.postPostDb(vm.newpost).then(function(res){
				$state.go("AllPosts");
			});
		};

			PostFactory.getAllPostsDB().then(function(res){
				console.log(res);
				vm.post = res;
			});

			vm.deletePost = function(post){
			   PostFactory.deletePost(post._id).then(function(){ // we're calling it this because we did a get call to the server to retrieve the whole post (all of them) and mongoose had created this id. the id now lives on this level, so we're using it now go back to the server so that we can find a specific post to delete.
			      vm.post.splice(vm.post.indexOf(post), 1); // this vm.post is coming from line 21, what we're setting res equal to in the get all posts DB
			   });
			};

// ngMaterial
var originatorEv;
vm.openMenu = function($mdOpenMenu, ev) {
  originatorEv = ev;
  $mdOpenMenu(ev);
};
vm.notificationsEnabled = true;
vm.toggleNotifications = function() {
  vm.notificationsEnabled = !vm.notificationsEnabled;
};

//  TAGS
vm.tags=  [];
vm.fruitNames = [];


	}
})();
