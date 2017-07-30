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
			var _totalAmount = $stateParams.amount;
			var kitchenId = $stateParams.kitchenId;
			var totalAmount = numberService.amtToStripe(_totalAmount);

			/*********************
			 *  Private Functions
			 **********************/
			function _init() {
				_redirectOnReload();
			}

			var _chargeObj = {
				total: totalAmount,
				currency: config.currency,
				kitchenId: kitchenId
			};

			function _redirectOnReload() {
				try {
					var _serviceFee = ngCart.serviceFee(kitchenId);
					_chargeObj.serviceFee = numberService.amtToStripe(_serviceFee);
				} catch (err) {
					$state.go('cart.view');
				}
			}

			function _chargePayment() {
				CheckoutService.tokenizeCard(that.card)
					.then(function (response) {
						_chargeObj.token = response.id;
						CheckoutAPI.charge(_chargeObj)
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
