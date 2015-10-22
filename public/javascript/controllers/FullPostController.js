(function() {
	'use strict';
	angular.module('app')
	.controller('FullPostController', FullPostController);

	function FullPostController(PostFactory, $state, $stateParams) {
		var vm = this;
      vm.response = {};
      vm.rating = [1,2,3,4,5];

      if($stateParams.id){
      PostFactory.getPostById($stateParams.id).then(function(res){
         console.log("bck from the Controller" + res);
         vm.fullPost = res;
      });
   }

   vm.addResponse = function(){
      PostFactory.createResponse(vm.response, $stateParams.id).then(function(res){
         vm.response = res;
         console.log(res);
      });
   };



	}
})();
