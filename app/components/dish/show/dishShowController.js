'use strict';

angular.module('dish.show', [
	'share',
	'carousel',
	'dishes.api',
])

	.controller('DishShowController', ['$state', '$stateParams', 'DishesAPI', 'KitchenAPI', 'devHelper', 'MapAPI',
		function ($state, $stateParams, DishesAPI, KitchenAPI, devHelper, MapAPI) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			/*********************
			 *    Public Variables
			 **********************/
			this.dishId = $stateParams.id;
			this.map = MapAPI.getMapOption();
			this.map.options.gestureHandling = 'none';
			this.map.zoom = 20;
			this.mapCtrl = {};
			this.marker = {id: 0};

			/*********************
			 *    Private Functions
			 **********************/

			function _init() {
				_showDish();
			}

			function _showDish() {
				DishesAPI.show(that.dishId)
					.then(function (response) {
						devHelper.log(response);
						that.dish = response;
						_getKitchen(that.dish.kitchen_id);
					}, function (response) {
						// TODO handle error state
						console.error(response);
					});

			}

			function _getKitchen(kitchenId) {
				KitchenAPI.show(kitchenId).then(function (response) {
					devHelper.log(response);
					that.kitchen = response;
					_locateKitchen(that.kitchen.address);
				}, function (response) {
					// TODO handle error state
					console.error(response);
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

			/*********************
			 *    Initialization
			 **********************/
			_init();

			/*********************
			 *    EVENTS
			 **********************/
		}
	]);