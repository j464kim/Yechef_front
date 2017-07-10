'use strict';

angular.module('kitchen.show', [
	'kitchen.api', 'ngMaterial', 'share',
])

	.controller('KitchenShowController', ['$stateParams', 'KitchenAPI', 'devHelper', '$mdDialog', '$rootScope', 'MapAPI',
		function ($stateParams, KitchenAPI, devHelper, $mdDialog, $rootScope, MapAPI) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			var kitchenId = $stateParams.id;
			/*********************
			 *  Public Variables
			 **********************/
			this.isMine = false;
			this.map = MapAPI.getMapOption();
			this.map.options.gestureHandling = 'none';
			this.map.zoom = 20;
			this.mapCtrl = {};
			this.marker = {id: 0};
			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_showKitchen();
				_getKitchenAdmins();
				_getDishes();
			}

			function _showKitchen() {
				KitchenAPI.show(kitchenId).then(function (response) {
					devHelper.log(response);
					that.kitchen = response;
					that.media = response.medias[0].url;
					_locateKitchen(that.kitchen.address);
				}, function (response) {
					// TODO handle error state
					devHelper.log(response, 'error');
				});
			}

			function _locateKitchen(address) {
				MapAPI.geocode(address).then(function (result) {
						if (result) {
							that.map.center.latitude = result[0].geometry.location.lat();
							that.map.center.longitude = result[0].geometry.location.lng();
							that.marker.coords = {
								latitude: result[0].geometry.location.lat(),
								longitude: result[0].geometry.location.lng()
							};
							that.mapCtrl.refresh();
						}
					}
				);
			}

			function _getKitchenAdmins() {
				KitchenAPI.getAdmins(kitchenId).then(function (response) {
					devHelper.log(response);
					that.kitchenAdmins = response;
					if ($rootScope.currentUser) {
						for (var i in that.kitchenAdmins) {

							if (that.kitchenAdmins[i].id === $rootScope.currentUser.id) {
								that.isMine = true;
								break;
							}
						}
					}
				}, function (response) {
					//TODO handle error state
					devHelper.log(response, 'error');
				});
			}

			function _getDishes() {
				KitchenAPI.getDishes(kitchenId).then(function (response) {
					devHelper.log(response);
					that.dishes = response;
				}, function (response) {
					//TODO handle error state
					devHelper.log(response, 'error');
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.showChefs = function (ev) {
				$mdDialog.show({
					contentElement: '#showChefs',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true
				});
			};

			this.closeDialog = function () {
				$mdDialog.cancel();
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
