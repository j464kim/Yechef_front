'use strict';

angular.module('kitchen.update', [
	'kitchen.api'
])

	.controller('KitchenUpdateController', ['$stateParams', 'KitchenAPI', '$state', 'devHelper', 'genericService',
		function ($stateParams, KitchenAPI, $state, devHelper, genericService) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
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
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
			}

			function _updateKitchen() {
				KitchenAPI.update(that.kitchen, kitchenId).then(function (response) {
					var updatedKitchen = response;
                    devHelper.log(response);
					$state.go('kitchen.show', {'id': updatedKitchen.id});
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
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
