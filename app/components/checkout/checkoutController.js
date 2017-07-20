'use strict';

angular.module('checkout.billing', [
	'checkout.api',
])

	.controller('CheckoutController', ['$stateParams', '$state', 'CheckoutAPI', 'CheckoutService', 'devHelper', 'config', '$rootScope', '$q',
		function ($stateParams, $state, CheckoutAPI, CheckoutService, devHelper, config, $rootScope, $q) {

			/*********************
			 *  Private Variables
			 **********************/

			/*********************
			 *  Public Variables
			 **********************/
			var that = this;
			var amount = $stateParams.amount;
			var kitchenId = $stateParams.kitchenId;
			var stripeAmount = Math.round(amount * 100);

			/*********************
			 *  Private Functions
			 **********************/

			function _chargePayment() {
				CheckoutService.tokenize(that.card)
					.then(function (response) {
						CheckoutAPI.charge(response.id, stripeAmount, config.currency, kitchenId).then(function (response) {
							devHelper.log(response);
							devHelper.log('Authorization hold successful');
						}, function (response) {
							// TODO handle error state-*/ ˙
							console.error(response);
						})
					})
			}

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
			this.chargePayment = _chargePayment;
			this.addCard = _addCard;

			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}

	])
;
