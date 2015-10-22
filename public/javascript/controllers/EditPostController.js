(function() {
	'use strict';
	angular.module('app')
	.controller('EditPostController', EditPostController);

	function EditPostController(PostFactory,$state,$stateParams) {
		var vm = this;
      // vm.post = {};
      // vm.postToEdit ={};
      vm.edittedPost ={};
      vm.postType = ["Job Offer",  "Job Request"];

      PostFactory.getPostById($stateParams.id).then(function(res){
         console.log(res);
         // vm.postToEdit = res;
         vm.edittedPost = res;
         console.log(edittedPost);
      });

      // vm.editPost = function(postId){
      //    PostFactory.editPost({IDofPostToEdit: postId, postEditted: vm.edittedPost}).then(function(res){
      //       console.log("Made it back to the controller.");
      //    });
      // };

// vm.editPost = function(postId){
//    console.log("This is the post is: " + postId);
//    console.log("vm.editedPost");
// };




	}
})();
