'use strict';

angular.module('kitchen.create', [
	'kitchen.api',
])

	.controller('KitchenCreateController', ['$state', 'KitchenAPI', 'devHelper', 'genericService', 'config', 'mapService',
		function ($state, KitchenAPI, devHelper, genericService, config, mapService) {

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
			function _createKitchen() {
				this.kitchen.country = this.selectedCountry.display;
				devHelper.log(that.address);
				that.kitchen.lat = that.address.geometry.location.lat();
				that.kitchen.lng = that.address.geometry.location.lng();
				that.kitchen.address = that.address.formatted_address;
				KitchenAPI.create(that.kitchen).then(function (response) {
					var newKitchen = response;
					devHelper.log(newKitchen);

					_uploadKitchenMedia(newKitchen);

					$state.go('kitchen.show', {'id': newKitchen.id});
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
			}

			function _uploadKitchenMedia(response) {

				// instantiate Dropzone
				var dropzoneInstance = Dropzone.forElement("#dropzone");

				// figure out the model type to pass into dropzone controller
				var mediableInfo = genericService.getModelType($state);

				dropzoneInstance.on("sending", function (file, xhr, formData) {
					formData.append('mediable_id', response.id);
					formData.append('mediable_type', mediableInfo['type']);
				});

				dropzoneInstance.processQueue();
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
					that.address = null;
				}
			};

			/*********************
			 *  Initialization
			 **********************/


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
