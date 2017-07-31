'use strict';

angular.module('main', ['search'])

	.controller('MainController', ['$scope', '$rootScope', 'AuthAPI', 'devHelper', '$state', 'sessionService', '$mdTheming', 'themeProvider', 'genericService',
		function ($scope, $rootScope, AuthAPI, devHelper, $state, sessionService, $mdTheming, themeProvider, genericService) {

			var that = this;
			if (!$rootScope.currentUser) {
				$rootScope.currentUser = {};
			}

			$rootScope.previousState;
			$rootScope.previousParams;
			$rootScope.currentState;
			$rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
				$rootScope.previousState = from.name;
				$rootScope.previousParams = fromParams;
				$rootScope.currentState = to.name;
			});

			$scope.$on('event:auth-loginRequired', function (event, data) {
				devHelper.log('refreshing token...');
				AuthAPI.refreshToken().then(function () {
					devHelper.log('Token successfully refreshed');
				}, function () {
					devHelper.log('Fail to refresh token, redirecting to login page');
					sessionService.revokeSession();
					$state.go('user.login');
				});
			});

			/* Re-assigning $rootScope.currentUser variable breaks the binding in other templates.
			 Thus, angular.extend needs to be used for the purpose of updating the key-value properties or the
			 $rootScope.currentUser variable.
			 */
			$rootScope.$on('auth:currentUserChanged', function (event, currentUser) {
				angular.extend($rootScope.currentUser, currentUser);
			});

			if (_.isEmpty($rootScope.currentUser)) {
				angular.extend($rootScope.currentUser, sessionService.getCurrentUser());
			}

			this.isLoggedIn = sessionService.isLogin;

			// themeing
			$scope.$watch(angular.bind(this, function () {
				return this.themes;
			}), function (value) {
				if (value) {
					if (value.primary) {
						themeProvider.definePalette('primaryTheme', value.primary);
					}

					if (value.secondary) {
						themeProvider.definePalette('secondaryTheme', value.secondary);
					}

					if (value.ternary) {
						themeProvider.definePalette('ternaryTheme', value.ternary);
					}

					themeProvider.theme('default')
						.primaryPalette('primaryTheme')
						.accentPalette('secondaryTheme')
						.warnPalette('ternaryTheme');
					$mdTheming.generateTheme('default');
				}
			});
		}
	]);