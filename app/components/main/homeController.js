'use strict';

angular.module('home', [])

	.controller('HomeController', ['$scope', '$rootScope', 'AuthAPI', 'devHelper', '$state', 'sessionService',
		function ($scope, $rootScope, AuthAPI, devHelper, $state, sessionService) {

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
		}
	])
	.controller('SearchCtrl', ['config', '$q', '$timeout', 'devHelper', '$state', 'uiGmapGoogleMapApi', function (config, $q, $timeout, devHelper, $state, uiGmapGoogleMapApi) {
		var self = this;

		self.isDisabled = false;

		// list of `nationalities` value/display objects
		self.nationalities = loadAll();
		self.querySearch = querySearch;
		self.selectedItemChange = selectedItemChange;
		self.searchTextChange = searchTextChange;

		self.nationality = newNationality;

		uiGmapGoogleMapApi.then(function (maps) {
			// write your code here
			// (google is defined)
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					function (position) {
						self.currentLocation = position;
						var latlng = new maps.LatLng(position.coords.latitude, position.coords.longitude);
						var geocoder = new maps.Geocoder();
						geocoder.geocode({'latLng': latlng}, function (results, status) {
							// Do something with result
							if (!self.city) {
								self.city = results[1];
							}
						});
					});
			} else {
				console.error("Geolocation is not supported by this browser.");
			}
		});

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
			console.log(self.city);
			if (!self.selectedNationality) {
				self.nationality = 'all';
			} else {
				self.nationality = self.selectedNationality.value;
			}
			if (!self.sortBy) {
				self.sortBy = 'hottest';
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
			});
		}
	}
	]);