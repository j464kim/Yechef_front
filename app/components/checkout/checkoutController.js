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
			var amount = $stateParams.amount;
			var kitchenId = $stateParams.kitchenId;
			var amount_inStripe = numberService.getAmountInStripe(amount);

			/*********************
			 *  Private Functions
			 **********************/
			function _init() {
				_redirectOnReload();
			}

			function _redirectOnReload() {
				try {
					var _amtBeforeService = ngCart.totalWithoutService(kitchenId);
					that.amtBeforeService_inStripe = numberService.getAmountInStripe(_amtBeforeService);
				} catch (err) {
					$state.go('cart.view');
				}
			}

			function _chargePayment() {
				CheckoutService.tokenize(that.card)
					.then(function (response) {
						CheckoutAPI.charge(response.id, amount_inStripe, config.currency, kitchenId, that.amtBeforeService_inStripe)
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
