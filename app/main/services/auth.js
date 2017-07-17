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
	.service('AuthResource', ['$resource', 'config', '$http', '$auth', 'devHelper',
		function ($resource, config, $http, $auth, devHelper) {
			var api_endpoint = config.endpoint;

			function sendVerifyLink(email) {
				return $http({
					method: 'POST',
					url: api_endpoint + 'register/verify',
					params: {
						email: email,
					}
				});
			}

			function confirmEmail(token) {
				return $http({
					method: 'GET',
					url: api_endpoint + 'register/confirm/' + token
				});
			}

			function register(newUser) {
				devHelper.log(newUser);
				return $http({
					method: 'POST',
					url: api_endpoint + 'register',
					params: newUser,
				})
			}

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

			function getLoggedInUser() {
				return $http({
					method: 'GET',
					url: api_endpoint + 'logged-in'
				})
			};

			return {
				sendVerifyLink: sendVerifyLink,
				confirmEmail: confirmEmail,
				register: register,
				login: login,
				logout: logout,
				socialLogin: socialLogin,
				refreshToken: refreshToken,
				getLoggedInUser: getLoggedInUser,
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
				$cookies.put("access_token", tokenType + ' ' + accessToken, {'expires': expireDate});

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
				$cookies.remove('current_user');
				token = {};
			}

			function getAccessToken() {
				var accessToken = $cookies.get('access_token');
				if (accessToken) {
					return accessToken;
				} else {
					// revokeSession();
					return null;
				}
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

			function setCurrentUser(currentUser) {
				$cookies.putObject('current_user', currentUser);
			}

			function getCurrentUser() {
				return $cookies.getObject('current_user');
			}

			return {
				setSession: setSession,
				revokeSession: revokeSession,
				getAccessToken: getAccessToken,
				getRefreshToken: getRefreshToken,
				isLogin: isLogin,
				setCurrentUser: setCurrentUser,
				getCurrentUser: getCurrentUser,
			}
		}
	])
	.service('AuthAPI', ['$q', 'AuthResource', 'sessionService', 'authService', '$rootScope',
		function ($q, AuthResource, sessionService, authService, $rootScope) {

			function sendVerifyLink(email) {
				return $q(function (resolve, reject) {
					AuthResource.sendVerifyLink(email).then(function (response) {
						resolve(response.data);
					}, function (response) {
						reject(response)
					});
				});
			}

			function confirmEmail(token) {
				return $q(function (resolve, reject) {
					AuthResource.confirmEmail(token).then(function (response) {
						resolve(response.data);
					}, function (response) {
						reject(response)
					});
				});
			}

			function register(newUser) {
				return $q(function (resolve, reject) {
					AuthResource.register(newUser).then(function (response) {
						var data = response.data.body;
						resolve(data);
					}, function (response) {
						reject(response)
					});
				});
			};

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
						for (var property in $rootScope.currentUser) {
							delete $rootScope.currentUser[property];
						}
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

			function setCurrentUser() {
				return $q(function (resolve, reject) {
					AuthResource.getLoggedInUser().then(function (response) {
						var currentUser = response.data.body;
						sessionService.setCurrentUser(currentUser);
						$rootScope.$broadcast('auth:currentUserChanged', currentUser);
						resolve(currentUser);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				sendVerifyLink: sendVerifyLink,
				confirmEmail: confirmEmail,
				register: register,
				login: login,
				socialLogin: socialLogin,
				logout: logout,
				refreshToken: refreshToken,
				setCurrentUser: setCurrentUser,
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

			function updatePassword(oldPassword, newPassword, newPassword_confirmation) {
				return $http({
					method: 'POST',
					url: api_endpoint + 'password/update',
					params: {
						oldPassword: oldPassword,
						newPassword: newPassword,
						newPassword_confirmation: newPassword_confirmation
					}
				})
			};

			return {
				sendResetLinkEmail: sendResetLinkEmail,
				resetPassword: resetPassword,
				updatePassword: updatePassword,
			};
		}
	])
	.service('PasswordAPI', ['$q', 'PasswordResource',
		function ($q, PasswordResource) {

			function sendResetLinkEmail(email) {

				return $q(function (resolve, reject) {
					PasswordResource.sendResetLinkEmail(email).then(function (response) {
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

			function updatePassword(oldPassword, newPassword, newPassword_confirmation) {

				return $q(function (resolve, reject) {
					PasswordResource.updatePassword(oldPassword, newPassword, newPassword_confirmation).then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			return {
				sendResetLinkEmail: sendResetLinkEmail,
				resetPassword: resetPassword,
				updatePassword: updatePassword,
			};
		}
	]);