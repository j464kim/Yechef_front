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
						CheckoutAPI.charge(response.id, stripeAmount, config.currency, kitchenId)
							.then(function (response) {
								devHelper.log(response);
								devHelper.log('Authorization hold successful');
								$state.go('user.profile.order');
							}, function (response) {
								// TODO handle error state-*/ ˙
								// devHelper.log(response, 'error');
							})
					})
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.chargePayment = _chargePayment;

			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}

	])
;
