'use strict';

angular.module('user.profile.payment.create', [
	'user.api', 'ngMaterial'
])

	.controller('PaymentCreateController', ['$stateParams', '$state', 'CheckoutAPI', 'CheckoutService', 'devHelper',
		function ($stateParams, $state, CheckoutAPI, CheckoutService, devHelper) {

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
				CheckoutService.tokenize(that.credit.number, that.credit.cvc, that.credit.exp_month, that.credit.exp_year)
					.then(function (response) {
						CheckoutAPI.addCard(response.id).then(function (response) {
							devHelper.log(response);
							devHelper.log('Card has been added successfully');
							$state.go('user.profile.payment.list');
						}, function (response) {
							// TODO handle error state-*/ ˙
							console.error(response);
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
