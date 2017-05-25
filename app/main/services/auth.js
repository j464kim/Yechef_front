'use strict';

angular.module('auth.api', [
	'satellizer',
	'ngCookies'
])

.config(function($authProvider, config, $cookiesProvider) {

    $authProvider.google({
      clientId: config.googleAppId,
      url: config.endpoint + 'auth/google',
    });

    $authProvider.facebook({
      clientId: config.facebookAppId,
      url: config.endpoint + 'auth/facebook',
    });

    // set cookie expiration
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + config.cookieExpirationInDays);
    $cookiesProvider.defaults.expires = expireDate;
})

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
		};

		return {
			login: login,
			logout: logout,
			socialLogin: socialLogin,
			refreshToken: refreshToken
		};
	}
])

.service('sessionService', ['$cookies',
	function($cookies){
		var token = {};

		function setSession(accessToken, refreshToken, expireIn, tokenType) {
			// storage refreshToken in cookie
			$cookies.put('refresh_token', refreshToken);
			// calculate expire time
			var expireDate = new Date (new Date().getTime() + (1000 * expireIn));
			// storage accessToken in cookie
            $cookies.put("access_token", accessToken, {'expires': expireDate});

			token = {
				accessToken: accessToken,
				refreshToken: refreshToken, 
				expireIn: expireIn, 
				tokenType: tokenType
			}
		}

		function revokeSession() {
			$cookies.remove('refresh_token');
			$cookies.remove('token_expires_at');
			token = {};
		}

		function getAccessToken() {
			if(token.accessToken && token.tokenType){
				return token.tokenType + ' ' + token.accessToken;
			}
			return null;
		}

		function isLogin() {
			if($cookies.get('refresh_token')) {
				return true;
			}
			return false;
		}

		return {
			setSession: setSession,
			revokeSession: revokeSession,
			getAccessToken: getAccessToken,
			isLogin: isLogin,
		}
	}
])

.service('AuthAPI', ['$q', 'AuthResource', 'sessionService',
	function($q, AuthResource, sessionService){

		function login(email, password) {

			return $q(function(resolve, reject) {
				AuthResource.login(email, password).then(function(response){
					var data = response.data.body;
					sessionService.setSession(
						data.access_token,
						data.refresh_token,
						data.expires_in,
						data.token_type
					);
					resolve(data);
				}, function(response) {
					reject(response);
				});
			});
		};


		function socialLogin(provider) {
			return $q(function(resolve, reject) {
				AuthResource.socialLogin(provider).then(function(response){
					var data = response.data.body;
					sessionService.setSession(
						data.access_token,
						data.refresh_token,
						data.expires_in,
						data.token_type
					);
					resolve(data);
				}, function(response) {
					reject(response);
				});
			}); 
		};


		function logout() {
			return $q(function(resolve, reject) {
				AuthResource.logout().then(function(response){
					sessionService.revokeSession();
					resolve(response.data.body);
				}, function(response) {
					reject(response);
				});
			});
		};


		function refreshToken(){
			return $q(function(resolve, reject) {
				AuthResource.refreshToken(refreshToken).then(function(response){
					console.log(response);
					resolve(response);
				}, function(response) {
					console.log(response);
					reject(response);
				});
			}); 
		};


		return {
			login: login,
			socialLogin: socialLogin,
			logout: logout,
			refreshToken: refreshToken
		};
	}
]);