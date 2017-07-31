'use strict';

angular.module('search', [])

	.controller('SearchController', ['config', '$q', '$timeout', 'devHelper', '$state', 'MapAPI', 'genericService',
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