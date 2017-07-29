'use strict';

angular.module('checkout.billing', [
	'checkout.api',
])

	.controller('CheckoutController', ['$stateParams', '$state', 'CheckoutAPI', 'CheckoutService', 'devHelper', 'config', 'ngCart', 'numberService',
		function ($stateParams, $state, CheckoutAPI, CheckoutService, devHelper, config, ngCart, numberService) {

			/*********************
			 *  Private Variables
			 **********************/

			/*********************
			 *  Public Variables
			 **********************/
			var that = this;
			var _amount = $stateParams.amount;
			var kitchenId = $stateParams.kitchenId;
			var amount = numberService.stripeToDb(_amount);

			/*********************
			 *  Private Functions
			 **********************/
			function _init() {
				_redirectOnReload();
			}

			function _redirectOnReload() {
				try {
					var _serviceFee = ngCart.serviceFee(kitchenId);
					that.serviceFee = numberService.stripeToDb(_serviceFee);
				} catch (err) {
					$state.go('cart.view');
				}
			}

			function _chargePayment() {
				CheckoutService.tokenize(that.card)
					.then(function (response) {
						CheckoutAPI.charge(response.id, amount, that.serviceFee, config.currency, kitchenId)
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
			_init();

			/*********************
			 *  EVENTS
			 **********************/

		}

	])
;
