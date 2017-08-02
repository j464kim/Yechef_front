'use strict';

angular.module('search', ['ngMaterial'])


	.controller('SearchCtrl', ['config', '$q', '$timeout', 'devHelper', '$state', 'MapAPI', '$stateParams', function (config, $q, $timeout, devHelper, $state, MapAPI, $stateParams) {
		var self = this;

		self.isDisabled = false;

		// list of `nationalities` value/display objects
		self.nationalities = loadAll();
		self.querySearch = querySearch;
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
			if (self.city.geometry) {
				self.lat = self.city.geometry.location.lat();
				self.lng = self.city.geometry.location.lng();
				self.ne_lat = self.city.geometry.viewport.getNorthEast().lat();
				self.ne_lng = self.city.geometry.viewport.getNorthEast().lng();
				self.sw_lat = self.city.geometry.viewport.getSouthWest().lat();
				self.sw_lng = self.city.geometry.viewport.getSouthWest().lng();
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
				ne_lat: self.ne_lat,
				ne_lng: self.ne_lng,
				sw_lat: self.sw_lat,
				sw_lng: self.sw_lng,
				lat: self.lat,
				lng: self.lng
			});
		}
	}
	]);