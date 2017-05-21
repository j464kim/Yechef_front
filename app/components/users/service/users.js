'use strict';

angular.module('user.api', [
	'configuration',
	'satellizer',
	'LocalStorageModule'
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
			});
		};

		function logout() {
			return $http({
				method: 'POST',
				url: api_endpoint + 'logout'
			});
		};

		function socialLogin(provider) {
			return $auth.authenticate(provider)
		};

		function refreshToken(refreshToken) {
			return $http({
				method: 'POST',
				url: api_endpoint + 'refresh-token',
				params: {
					refresh_token: refreshToken
				}
			})
		}

		return {
			login: login,
			logout: logout,
			socialLogin: socialLogin,
			refreshToken: refreshToken
		};
	}
])

.service('AuthAPI', ['$q', 'UserResource', 'AuthResource', 'localStorageService',
	function($q, UserResource, AuthResource, localStorageService){

		function login(email, password) {

			return $q(function(resolve, reject) {
				AuthResource.login(email, password).then(function(response){
					var data = response.data.body;
					// get current seconds
					var seconds = new Date().getTime() / 1000;
					// calculate expire time
					var expireAt = seconds + data.expires_in;
					var authHeader = data.token_type + ' ' + data.access_token;
					//set access token
					localStorageService.set('access_token', authHeader);
					localStorageService.set('refresh_token', data.refresh_token);
					localStorageService.set('expires_at', expireAt);
					resolve(data);
				}, function(response) {
					console.log(seconds, expireAt);
					reject(response)
				});
			});
		};


		function logout() {
			return $q(function(resolve, reject) {
				AuthResource.logout().then(function(response){
					//remove access token
					localStorageService.remove('access_token');
					localStorageService.remove('refresh_token');
					localStorageService.remove('expires_at');
					resolve(response.data.body);
				}, function(response) {
					reject(response)
				});
			});
		};

		function socialLogin(provider) {
			return $q(function(resolve, reject) {
				AuthResource.socialLogin(provider).then(function(response){
					var data = response.data.body;
					// get current seconds
					var seconds = new Date().getTime() / 1000;
					// calculate expire time
					var expireAt = seconds + data.expires_in;
					var authHeader = data.token_type + ' ' + data.access_token;
					//set access token
					localStorageService.set('access_token', authHeader);
					localStorageService.set('refresh_token', data.refresh_token);
					localStorageService.set('expires_at', expireAt);
					resolve(data);
				}, function(response) {
					reject(response)
				});
			}); 
		};

		function refreshToken(){
			var refreshToken = localStorageService.get('refresh_token');

			return $q(function(resolve, reject) {
				AuthResource.refreshToken(refreshToken).then(function(response){
					console.log(response);
					resolve(response);
				}, function(response) {
					reject(response)
				});
			}); 
		};


		return {
			login: login,
			logout: logout,
			socialLogin: socialLogin,
			refreshToken: refreshToken
		};
	}
]);