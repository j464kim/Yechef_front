'use strict';

angular.module('user.profile.payment.create', [
	'payment.api', 'ngMaterial'
])

	.controller('PaymentCreateController', ['$stateParams', '$state', 'PaymentAPI', 'CheckoutService', 'devHelper',
		function ($stateParams, $state, PaymentAPI, CheckoutService, devHelper) {

			/*********************
			 *  Private Variables
			 **********************/

			/*********************
			 *  Public Variables
			 **********************/
			var that = this;

			/*********************
			 *  Private Functions
			 **********************/

			function _addCard() {
				CheckoutService.tokenizeCard(that.card)
					.then(function (response) {
						PaymentAPI.addCard(response.id).then(function (response) {
							devHelper.log(response);
							devHelper.log('Card has been added successfully');
							$state.go('user.profile.payment.list');
						}, function (response) {
							// TODO handle error state-*/ ˙
							devHelper.log(response, 'error');
						})
					})
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.addCard = _addCard;

			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
