'use strict';

angular.module('kitchen.create', [
	'kitchen.api'
])

	.controller('KitchenCreateController', ['$state', 'KitchenAPI',
		function ($state, KitchenAPI) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			/*********************
			 *  Public Variables
			 **********************/
			var that = this;

			/*********************
			 *  Private Functions
			 **********************/

			function _createKitchen() {
				KitchenAPI.create(that.kitchen).then(function (response) {
					var newKitchen = response;
					console.log(response);
					$state.go('kitchen.show', {'id': newKitchen.id});
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.createKitchen = _createKitchen;


			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
