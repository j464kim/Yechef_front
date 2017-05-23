'use strict';

angular.module('user.api', [
	'configuration',
	'satellizer',
])

.config(function($authProvider, config) {

    $authProvider.google({
      clientId: config.googleAppId,
      url: config.endpoint + 'auth/google',
    });

    $authProvider.facebook({
      clientId: config.facebookAppId,
      url: config.endpoint + 'auth/facebook',
    });
})

.factory('UserResource', ['$resource', 'config', 
	function($resource, config) {
		var api_endpoint = config.endpoint + 'users/';

		return $resource(api_endpoint + ':id', {id: '@id'},{
			list: {
				method: 'GET'
			},
		});
	}
])

.service('AuthResource', ['$resource', 'config', '$http', '$auth', 
	function($resource, config, $http, $auth) {
		var api_endpoint = config.endpoint;

		function login(email, password) {
			return $http({
				method: 'POST',
				url: api_endpoint + 'login',
				params: {
					email: email,
					password: password
				}
			})
		};

		function logout() {
			return $http({
				method: 'POST',
				url: api_endpoint + 'logout'
			})
		};

		function socialLogin(provider) {
			return $auth.authenticate(provider)
		}



		return {
			login: login,
			logout: logout,
			socialLogin: socialLogin
		};
	}
])

.service('UserAPI', ['$q', 'UserResource', 'AuthResource', 
	function($q, UserResource, AuthResource){

		function login(email, password) {

			return $q(function(resolve, reject) {
				AuthResource.login(email, password).then(function(response){
					resolve(response.data.body);
				}, function(response) {
					reject(response)
				});
			});
		};


		function logout() {
			return $q(function(resolve, reject) {
				AuthResource.logout().then(function(response){
					resolve(response.data.body);
				}, function(response) {
					reject(response)
				});
			});
		};

		function socialLogin(provider) {
			return $q(function(resolve, reject) {
				AuthResource.socialLogin(provider).then(function(response){
					resolve(response.data.body);
				}, function(response) {
					reject(response)
				});
			}); 
		}


		return {
			login: login,
			logout: logout,
			socialLogin: socialLogin
		};
	}
]);