'use strict';

angular.module('main', [])

	.controller('MainController', ['$scope', '$rootScope', 'AuthAPI', 'devHelper', '$state', 'sessionService', '$mdTheming', 'themeProvider',
		function ($scope, $rootScope, AuthAPI, devHelper, $state, sessionService, $mdTheming, themeProvider) {

			var that = this;

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
					$state.go('user.login');
				});
			});

			$rootScope.$on('currentUserChanged', function (event, currentUser) {
				$rootScope.currentUser = currentUser;
			});

			if (!$rootScope.currentUser) {
				$rootScope.currentUser = sessionService.getCurrentUser();
			}

			this.isLoggedIn = sessionService.isLogin;


			// themeing
			themeProvider.theme('default').primaryPalette('yellow').accentPalette('green');
			$mdTheming.generateTheme('default');
			themeProvider.setDefaultTheme('default');
		}
	])
	.controller('SearchCtrl', ['config', '$q', '$timeout', 'devHelper', function (config, $q, $timeout, devHelper) {
		var self = this;

		self.isDisabled = false;

		// list of `nationalities` value/display objects
		self.nationalities = loadAll();
		self.querySearch = querySearch;
		self.selectedItemChange = selectedItemChange;
		self.searchTextChange = searchTextChange;

		self.nationality = newNationality;

		function newNationality(nationality) {
			alert("Sorry! You'll need to create a Constitution for " + nationality + " first!");
		}

		// ******************************
		// Internal methods
		// ******************************

		/**
		 * Search for nationalities... use $timeout to simulate
		 * remote dataservice call.
		 */
		function querySearch(query) {
			var results = query ? self.nationalities.filter(createFilterFor(query)) : self.nationalities,
				deferred;
			deferred = $q.defer();
			$timeout(function () {
				deferred.resolve(results);
			}, Math.random() * 1000, false);
			return deferred.promise;
		}

		function searchTextChange(text) {
			devHelper.log('Text changed to ' + text);
		}

		function selectedItemChange(item) {
			devHelper.log('Item changed to ' + JSON.stringify(item));
		}

		/**
		 * Build `states` list of key/value pairs
		 */
		function loadAll() {

			return ('ALL, ' + config.nationalities).split(/, +/g).map(function (nationality) {
				return {
					value: nationality.toLowerCase(),
					display: nationality
				};
			});
		}

		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);

			return function filterFn(nationality) {
				return (nationality.value.indexOf(lowercaseQuery) === 0);
			};

		}
	}
	]);