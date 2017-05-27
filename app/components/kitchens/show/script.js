'use strict';

angular.module('kitchen.show', [
	'kitchen.api'
])

	.controller('KitchenShowController', ['$stateParams', 'KitchenAPI', 'devHelper',
		function ($stateParams, KitchenAPI, devHelper) {

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
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/


			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
