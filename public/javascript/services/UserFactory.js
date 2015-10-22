(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);

	function UserFactory($http, $q) {
		var o = {};
		o.status = {};

		o.registerUser = function(user){
			var q = $q.defer();
			$http.post("/api/user/register", user).then(function(res){
				setToken(res.data); // Token is not yet parsed into JSON obj
				setUser();
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.loginUser = function(user){
			var q = $q.defer();
			$http.post("/api/user/login", user).then(function(res){
				setToken(res.data);
				setUser();
				q.resolve(res.data);
			});
			return q.promise;
		};

		function setUser(){
			var user = JSON.parse(urlBase64Decode(getToken().split(".")[1]));
			o.status.username = user.username;
			o.status._id = user._id;
		}

		function removeUser(){
			o.status.username = null;
			o.status._id = null;
		}

		o.logout = function(){
			removeToken();
			removeUser();
		};

		function setToken(token){
			return localStorage.setItem("token", token);
		}

		function getToken(){
			return localStorage.getItem("token");
		}

		function removeToken(){
			return localStorage.removeItem("token");
		}

// THIS DECODES BASE64 - TAKES JSONWEBTOKEN AND CONVERTS IT TO JSON OBJ
		function urlBase64Decode(str) {
	        var output = str.replace(/-/g, '+').replace(/_/g, '/');
	        switch (output.length % 4) {
	          case 0: { break; }
	          case 2: { output += '=='; break; }
	          case 3: { output += '='; break; }
	          default: {
	            throw 'Illegal base64url string!';
	          }
	        }
	        return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
	      }

			o.getUser = function(){
				return JSON.parse(urlBase64Decode(getToken().split(".")[1]));
			};

			var token = getToken();
			o.status = {};
			if(token){
				var user = o.getUser();
				o.status.username = user.username;
				o.status._id = user._id;
			}

		if(getToken()) setUser(); // if we hae the token, go ahead and log the user in
		return o;
	}
})();



// REGISTER AND LOGIN BEFORE PASSPORT		o.registerUser = function(user){
		// 	var q = $q.defer();
		// 	$http.post("/api/user/register", user).then(function(res){
		// 		q.resolve(res.data);
		// 	});
		// 	return q.promise;
		// };
		//
		// o.loginUser = function(user){
		// 	var q = $q.defer();
		// 	$http.post("/api/user/login", user).then(function(res){
		// 		o.setToken(res.data);
		// 		var user = o.getUser();
		// 		o.status.username = user.username;
		// 		o.status._id = user._id;
		// 		q.resolve(res.data);
		// 	});
		// 	return q.promise;
		// };
		//
		// o.logout = function(){
		// 	o.removeToken();
		// 	o.status.username = null;
		// 	o.status._id = null;
		// };
		//
		// o.setToken = function(token){
		// 	localStorage["token"] = token;
		// };
		//
		// o.getToken = function(){
		// 	return localStorage["token"];
		// };
		//
		// o.removeToken = function(){
		// 	localStorage.removeItem("token");
		// };
