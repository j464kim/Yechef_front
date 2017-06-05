'use strict';

angular.module('kitchen.update', [
	'kitchen.api'
])

	.controller('KitchenUpdateController', ['$stateParams', 'KitchenAPI', '$state', 'devHelper',
		function ($stateParams, KitchenAPI, $state, devHelper) {

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
				_getKitchen();
			}

			function _getKitchen() {
				KitchenAPI.show(kitchenId).then(function (response) {
                    devHelper.log(response);
					that.kitchen = response;
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			function _updateKitchen() {
				KitchenAPI.update(that.kitchen, kitchenId).then(function (response) {
					var updatedKitchen = response;
                    devHelper.log(response);
					$state.go('kitchen.show', {'id': updatedKitchen.id});
				}, function (response) {
					// TODO handle error state
					console.error(response);
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
