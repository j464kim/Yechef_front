'use strict';

angular.module('main', [])

	.controller('MainController', ['$scope', '$rootScope', 'AuthAPI', 'devHelper', '$state', 'sessionService', '$mdTheming', 'themeProvider', 'genericService',
		function ($scope, $rootScope, AuthAPI, devHelper, $state, sessionService, $mdTheming, themeProvider, genericService) {

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
					sessionService.revokeSession();
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
			$scope.$watch(angular.bind(this, function () {
				return this.themes;
			}), function (value) {
				if(value) {
					if(value.primary) {
						themeProvider.definePalette('primaryTheme', value.primary);
					}

					if(value.secondary) {
						themeProvider.definePalette('secondaryTheme', value.secondary);
					}

					if(value.ternary) {
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
	])
	.controller('SearchCtrl', ['config', '$q', '$timeout', 'devHelper', '$state', 'MapAPI', function (config, $q, $timeout, devHelper, $state, MapAPI) {
		var self = this;

		self.isDisabled = false;

		// list of `nationalities` value/display objects
		self.nationalities = loadAll();
		self.querySearch = querySearch;
		self.selectedItemChange = selectedItemChange;
		self.searchTextChange = searchTextChange;
		self.nationality = newNationality;

		self.distance = 0;

		if ($state.is('home')) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					function (position) {
						self.currentLocation = position;
						MapAPI.rgeocode(position.coords.latitude, position.coords.longitude).then(
							function (result) {
								self.city = result[1];
							}
						);
					});
			} else {
				devHelper.log("Geolocation is not supported by this browser.", 'error');
			}
		}

		this.autocompleteOptions = {
			types: ['(regions)']
		}

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

		this.searchDish = function () {
			if (!self.selectedNationality) {
				self.nationality = 'all';
			} else {
				self.nationality = self.selectedNationality.value;
			}
			if (!self.sortBy) {
				self.sortBy = 'newest';
			}
			$state.go('dish.list', {
				q: self.q,
				vegan: self.vegan,
				vegetarian: self.vegetarian,
				gluten_free: self.gluten_free,
				min_price: self.min_price,
				max_price: self.max_price,
				nationality: self.nationality,
				sortBy: self.sortBy,
				city: self.city.formatted_address,
				distance: self.distance,
			});
		}
	}
	]);