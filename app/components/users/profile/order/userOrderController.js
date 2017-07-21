'use strict';

angular.module('user.profile.order', [
	'user.api', 'ngMaterial'
])

	.controller('UserOrderController', ['$stateParams', '$state', 'UserAPI', 'devHelper', '$scope',
		function ($stateParams, $state, UserAPI, devHelper, $scope) {

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
				_getUserOrders();
			}

			function _getUserOrders() {
				UserAPI.list('getOrders').then(
					function (response) {
						devHelper.log(response);
						that.orders = response;
					}, function (response) {
						// TODO handle error state ie. front end display
						console.error(response);
					});
			}

			function _cancelOrder(orderId) {
				UserAPI.cancelOrder(orderId).then(
					function (response) {
						devHelper.log(response);
						$state.reload();
					}, function (response) {
						// TODO handle error state ie. front end display
						console.error(response);
					});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.cancelOrder = _cancelOrder;

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
