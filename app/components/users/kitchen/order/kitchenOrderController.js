'use strict';

angular.module('user.kitchen.order', [
	'user.api', 'ngMaterial'
])

	.controller('KitchenOrderController', ['$stateParams', '$state', 'KitchenAPI', 'devHelper', '$scope',
		function ($stateParams, $state, KitchenAPI, devHelper, $scope) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this
			var kitchenId = $stateParams.myCurrentKitchenId;
			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_getKitchenOrders();
			}

			function _getKitchenOrders() {
				KitchenAPI.getOrders(kitchenId).then(
					function (response) {
						devHelper.log(response);
						that.orders = response;
					}, function (response) {
						// TODO handle error state ie. front end display
						console.error(response);
					});
			};


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

			$scope.status = {
				isCustomHeaderOpen: false,
				isFirstOpen: true,
				isFirstDisabled: false
			}
		}
	]);
