'use strict';

angular.module('main', [])

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
			*/$rootScope.$on('auth:currentUserChanged', function (event, currentUser) {
				angular.extend($rootScope.currentUser , currentUser);
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
	])
	.controller('SearchCtrl', ['config', '$q', '$timeout', 'devHelper', '$state', 'MapAPI', 'genericService',
		function (config, $q, $timeout, devHelper, $state, MapAPI, genericService) {
			var self = this;

			self.isDisabled = false;

			// list of `nationalities` value/display objects
			self.nationalities = genericService.loadItems('ALL, ' + config.nationalities);
			self.querySearch = genericService.querySearch;
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