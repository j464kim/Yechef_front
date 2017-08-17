'use strict';

angular.module('kitchen.create', [
	'kitchen.api',
])

	.controller('KitchenCreateController', ['$state', 'KitchenAPI', 'UserAPI', 'devHelper', 'genericService', 'config', 'mapService', 'mediaService',
		function ($state, KitchenAPI, UserAPI, devHelper, genericService, config, mapService, mediaService) {

			/*********************
			 *  Private Variables
			 **********************/
			// reference to this controller


			/*********************
			 *  Public Variables
			 **********************/
			var that = this;
			this.payoutCountries = genericService.loadItems(config.payoutCountries);

			/*********************
			 *  Private Functions
			 **********************/
			function _init() {
				_checkPayout();
			}

			function _checkPayout() {
				UserAPI.checkPayout().then(
					function (response) {
						devHelper.log(response);
						if (!response) {
							genericService.showToast('You need to create a payout account to receive fund ' +
								'before opening your first kitchen :)');
							$state.go('user.profile.payout.new.address');
						}
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
			}


			function _createKitchen() {
				devHelper.log(that.kitchen.address);
				that.kitchen.lat = that.kitchen.address.geometry.location.lat();
				that.kitchen.lng = that.kitchen.address.geometry.location.lng();
				that.kitchen.address = that.kitchen.address.formatted_address;
				KitchenAPI.create(that.kitchen).then(function (response) {
					var newKitchen = response;
					devHelper.log(newKitchen);

					mediaService.uploadMedia(newKitchen);

					$state.go('kitchen.show', {'id': newKitchen.id});
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.createKitchen = _createKitchen;
			this.querySearch = genericService.querySearch;
			this.selectedCountryChange = function (country) {
				// only when a country is selected
				if (country) {
					mapService.restrictAddressByCountry(that, country.value);
				}
				// Empty address input
				if (that.kitchen) {
					that.kitchen.address = null;
				}
			};

			/*********************
			 *  Initialization
			 **********************/
			_init();
			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
