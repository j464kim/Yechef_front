'use strict';

angular.module('main', [
	'search',
	'cfp.loadingBar',
	'configuration'
])

	.controller('MainController', [
		'$scope',
		'$rootScope',
		'AuthAPI',
		'devHelper',
		'$state',
		'sessionService',
		'$mdTheming',
		'themeProvider',
		'cfpLoadingBar',
		'config',
		'$location',
		'$window',
		function ($scope, $rootScope, AuthAPI, devHelper, $state, sessionService, $mdTheming, themeProvider, cfpLoadingBar, config, $location, $window) {

			//We need to make sure the app is running on https protocol for the best security.
			forceSsl();

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
					// https://github.com/chieffancypants/angular-loading-bar/pull/50
					// Looks like the loading bar's interceptor has sync issue with http-auth-interceptor
					// only in case refresh token fails loading bar has to be manually completed
					cfpLoadingBar.complete();
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

			function forceSsl() {
				if (config.env === 'PROD') {
					if ($location.protocol() !== 'https') {
						$window.location.href = $location.absUrl().replace(/http/g, 'https');
					}
				}
			}
		}
	]);
