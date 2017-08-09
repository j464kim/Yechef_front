'use strict';

angular.module('checkout.billing', [
	'checkout.api',
	'directive.card.credit',
])

	.controller('CheckoutController', ['$stateParams', '$state', 'CheckoutAPI', 'CheckoutService', 'devHelper', 'config', 'ngCart', 'numberService', 'PaymentAPI', 'genericService',
		function ($stateParams, $state, CheckoutAPI, CheckoutService, devHelper, config, ngCart, numberService, PaymentAPI, genericService) {

			/*********************
			 *  Private Variables
			 **********************/

			/*********************
			 *  Public Variables
			 **********************/
			var that = this;
			this.withDefault = false;
			this.withNew = false;
			var _totalAmount = $stateParams.amount;
			var kitchenId = $stateParams.kitchenId;
			var totalAmount = numberService.amtToStripe(_totalAmount);

			/*********************
			 *  Private Functions
			 **********************/
			function _init() {
				_redirectOnReload();
				_getPayment();
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

			function _getPayment() {
				PaymentAPI.getCards().then(
					function (response) {
						devHelper.log(response);
						that.customer = response;

						if (that.customer && that.customer.default_source) {
							that.withDefault = true;
							that.defaultCard = genericService.getByUniqueProperty(that.customer.sources.data, 'id', that.customer.default_source);
						} else {
							that.withNew = true;
						}
					}, function (response) {
						// TODO handle error state ie. front end display
						devHelper.log(response, 'error');
					});
			}

			function _chargePayment(withDefault) {
				if (typeof withDefault == undefined) {
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
								});
						})
				} else {
					CheckoutAPI.charge(_chargeObj)
						.then(function (response) {
							devHelper.log(response);
							devHelper.log('Authorization hold successful');
							$state.go('user.profile.order');
						}, function (response) {
							// TODO handle error state-*/ ˙
							// devHelper.log(response, 'error');
						});
				}
			}

			function _showNewCardForm() {
				that.withDefault = false;
				that.withNew = true;
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.chargePayment = _chargePayment;
			this.showNewCardForm = _showNewCardForm;

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
