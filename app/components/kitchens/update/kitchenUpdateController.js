'use strict';

angular.module('kitchen.update', [
	'kitchen.api'
])

	.controller('KitchenUpdateController', ['$stateParams', 'KitchenAPI', '$state', 'devHelper', 'genericService', 'MapAPI', 'mediaService', 'mapService',
		function ($stateParams, KitchenAPI, $state, devHelper, genericService, MapAPI, mediaService, mapService) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			var kitchenId = $stateParams.id;

			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/
			function _init() {
				_showKitchen();
			}

			function _showKitchen() {
				KitchenAPI.show(kitchenId).then(function (response) {
					devHelper.log(response);
					that.kitchen = response;
					that.address = {
						formatted_address: that.kitchen.address
					};
					mapService.restrictAddressByCountry(that, that.kitchen.country);
					if (response.medias.length) {
						that.media = response.medias[0].url;
					}
					mediaService.previewUploadedMedia(that.kitchen);
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
			}

			function _updateKitchen() {
				if (that.address.formatted_address !== that.kitchen.address) {
					that.kitchen.lat = that.address.geometry.location.lat();
					that.kitchen.lng = that.address.geometry.location.lng();
					that.kitchen.address = that.address.formatted_address;
				}
				KitchenAPI.update(that.kitchen, that.kitchen.id)
					.then(function (response) {
						var updatedKitchen = response;
						devHelper.log(updatedKitchen);
						mediaService.uploadMedia(updatedKitchen);
						$state.go('user.kitchen.general.view', {'myCurrentKitchenId': updatedKitchen.id});
					}, function (response) {
						//     TODO handle error state
						devHelper.log(response, 'error');
					});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.updateKitchen = _updateKitchen;


			/*********************
			 *  Initialization
			 **********************/
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
