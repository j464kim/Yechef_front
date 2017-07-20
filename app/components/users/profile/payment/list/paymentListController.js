'use strict';

angular.module('user.profile.payment', [
	'user.api', 'ngMaterial'
])

	.controller('PaymentListController', ['$stateParams', '$state', 'CheckoutAPI', 'devHelper', '$scope',
		function ($stateParams, $state, CheckoutAPI, devHelper, $scope) {

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
				_getPayment();
			}

			function _getPayment() {
				CheckoutAPI.list().then(
					function (response) {
						devHelper.log(response);
						that.customer = response;
					}, function (response) {
						// TODO handle error state ie. front end display
						console.error(response);
					});
			}

			function _removeCard(cardId) {
				CheckoutAPI.removeCard(cardId).then(function (response) {
					devHelper.log(response);
					devHelper.log('Card has been deleted successfully');
					$state.reload();
				}, function (response) {
					// TODO handle error state-*/ ˙
					console.error(response);
				})
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.removeCard = _removeCard;

			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
