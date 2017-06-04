'use strict';

angular.module('auth.api', [
	'satellizer',
	'ngCookies'
])

	.config(function ($authProvider, config, $cookiesProvider) {

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
		function ($resource, config, $http, $auth) {
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
		function ($cookies) {
			var token = {};

			function setSession(accessToken, refreshToken, expireIn, tokenType) {
				// storage refreshToken in cookie
				$cookies.put('refresh_token', refreshToken);
				// calculate expire time
				var expireDate = new Date(new Date().getTime() + (1000 * expireIn));
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
				if (token.accessToken && token.tokenType) {
					return token.tokenType + ' ' + token.accessToken;
				}
				return null;
			}

			function getRefreshToken() {
				return $cookies.get('refresh_token');
			}

			function isLogin() {
				if ($cookies.get('refresh_token')) {
					return true;
				}
				return false;
			}

			return {
				setSession: setSession,
				revokeSession: revokeSession,
				getAccessToken: getAccessToken,
				getRefreshToken: getRefreshToken,
				isLogin: isLogin,
			}
		}
	])

	.service('AuthAPI', ['$q', 'AuthResource', 'sessionService', 'authService',
		function ($q, AuthResource, sessionService, authService) {

			function login(email, password) {

				return $q(function (resolve, reject) {
					AuthResource.login(email, password).then(function (response) {
						var data = response.data.body;
						sessionService.setSession(
							data.access_token,
							data.refresh_token,
							data.expires_in,
							data.token_type
						);
						resolve(data);
					}, function (response) {
						reject(response);
					});
				});
			};


			function socialLogin(provider) {
				return $q(function (resolve, reject) {
					AuthResource.socialLogin(provider).then(function (response) {
						var data = response.data.body;
						sessionService.setSession(
							data.access_token,
							data.refresh_token,
							data.expires_in,
							data.token_type
						);
						authService.loginConfirmed();
						resolve(data);
					}, function (response) {
						authService.loginCancelled();
						reject(response);
					});
				});
			};


			function logout() {
				return $q(function (resolve, reject) {
					AuthResource.logout().then(function (response) {
						sessionService.revokeSession();
						resolve(response.data.body);
					}, function (response) {
						reject(response);
					});
				});
			};


			function refreshToken() {
				return $q(function (resolve, reject) {
					var refreshToken = sessionService.getRefreshToken()
					AuthResource.refreshToken(refreshToken).then(function (response) {
						var data = response.data.body;
						sessionService.setSession(
							data.access_token,
							data.refresh_token,
							data.expires_in,
							data.token_type
						);
						authService.loginConfirmed();
						resolve(data);
					}, function (response) {
						authService.loginCancelled();
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
	])

	.service('PasswordResource', ['$resource', 'config', '$http',
		function ($resource, config, $http) {
			var api_endpoint = config.endpoint;

			function showResetForm(email, token) {
				return $http({
					method: 'GET',
					url: api_endpoint + 'password/reset/' + token,
					params: {
						email: email,
					}
				});
			};

			function sendResetLinkEmail(email) {
				console.log('will send POST');

				return $http({
					method: 'POST',
					url: api_endpoint + 'password/email',
					params: {
						email: email,
					}
				});
			};

			function resetPassword(token, email, password, password_confirmation) {
				return $http({
					method: 'POST',
					url: api_endpoint + 'password/reset',
					params: {
						token: token,
						email: email,
						password: password,
						password_confirmation: password_confirmation,
					}
				})
			};

			return {
				showResetForm: showResetForm,
				sendResetLinkEmail: sendResetLinkEmail,
				resetPassword: resetPassword,
			};
		}
	])

	.service('PasswordAPI', ['$q', 'PasswordResource',
		function ($q, PasswordResource) {

			function showResetForm(email, token) {

				return $q(function (resolve, reject) {
					PasswordResource.showResetForm(email, token).then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function sendResetLinkEmail(email) {

				return $q(function (resolve, reject) {
					PasswordResource.sendResetLinkEmail(email).then(function (response) {
						console.log('API succeeded');
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function resetPassword(token, email, password, password_confirmation) {

				return $q(function (resolve, reject) {
					PasswordResource.resetPassword(token, email, password, password_confirmation).then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};


			return {
				showResetForm: showResetForm,
				sendResetLinkEmail: sendResetLinkEmail,
				resetPassword: resetPassword,
			};
		}
	])
;