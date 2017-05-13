'use strict';

angular.module('kitchen.show', [
	'kitchen.api'
])

	.controller('KitchenShowController', ['$stateParams', 'KitchenAPI', '$scope',
		function ($stateParams, KitchenAPI, $scope) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

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
					console.log(response);
					$scope.kitchen = response;
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
