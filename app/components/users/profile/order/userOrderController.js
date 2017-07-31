'use strict';

angular.module('user.profile.order', [
	'user.api', 'ngMaterial'
])

	.controller('UserOrderController', ['$stateParams', '$state', 'UserAPI', 'devHelper', '$scope', 'RatingAPI',
		function ($stateParams, $state, UserAPI, devHelper, $scope, RatingAPI) {

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
						devHelper.log(response, 'error');
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
			this.reviewOrder = RatingAPI.showRatingCreateDialog;
			this.isReviewable = function (order, item) {
				var from = moment(order.created_at);
				var now = moment();
				return order.status == 'accepted' && now.diff(from, 'hours') < 24;
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
