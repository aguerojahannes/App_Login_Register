(function() {
	'use strict';
	angular.module('app')
	.factory('PostFactory', PostFactory);

	function PostFactory($http, $q) {
		var o = {};

		o.postPostDb = function(newPost){
			var q = $q.defer();
			$http.post("/api/post", newPost).then(function(){ // newPos becomes req.body
				q.resolve();
			});
			return q.promise;
		};

		o.getAllPostsDB = function(){
			var q = $q.defer();
			$http.get("/api/post").then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.getPostById = function(postId){
			console.log("From the factory")
			var q = $q.defer();
			$http.get("/api/post/" + postId).then(function(res){ // why +? because we're adding it as a parameter to our route /api/post/postId
				q.resolve(res.data);
			});
			return q.promise;
		};

		// o.editPost = function(edittedPostObj){
		// 	var q = $q.defer();
		// 	$http.put("/api/post", edittedPostObj).then(function(res){
		// 		q.resolve(res.data);
		// 	});
		// 	return q.promise;
		// };

o.deletePost = function(id){
	var q = $q.defer();
	$http.delete("/api/post/" + id).then(function(){
		q.resolve();
	});
	return q.promise;
};

// COMMENTS
o.createResponse = function(response, postId){
	var q = $q.defer();
	$http.post("/api/post/" + postId + "/response", response).then(function(res){
		q.resolve(res.data);
	});
	return q.promise;
};


		return o;
	}
})();


// PREVIOUSLY USED GET AUTH() BEFORE AUTHINTERCEPTOR
// function getAuth(){
// 	return {
// 		headers: {
// 			Authorization: 'Bearer' + localStorage.getItem("token")
// 		}
// 	};
// }
// then we used getAuth: 	$http.post("/api/post/" + postId + "/response", response, getAuth()).then(function(res){
