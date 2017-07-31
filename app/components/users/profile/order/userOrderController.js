'use strict';

angular.module('user.profile.order', [
	'user.api', 'ngMaterial'
])

	.controller('UserOrderController', ['$stateParams', '$state', 'UserAPI', 'devHelper', '$scope', '$mdDialog',
		function ($stateParams, $state, UserAPI, devHelper, $scope, $mdDialog) {

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
						devHelper.log(response, 'error')
					});
			}

			function _cancelOrder(orderId) {
				UserAPI.cancelOrder(orderId).then(
					function (response) {
						devHelper.log(response);
						$state.reload();
					}, function (response) {
						// TODO handle error state ie. front end display
						devHelper.log(response, 'error');
					});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.cancelOrder = _cancelOrder;
			this.reviewOrder = function (ev) {
				$mdDialog.show({
					templateUrl: 'shared/rating/create/ratingCreate.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: true // Only for -xs, -sm breakpoints.
				})
					.then(function (answer) {
						$scope.status = 'You said the information was "' + answer + '".';
					}, function () {
						$scope.status = 'You cancelled the dialog.';
					});
			};

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
