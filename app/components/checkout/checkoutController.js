'use strict';

angular.module('checkout.billing', [
	'checkout.api',
])

	.controller('CheckoutController', ['$state', 'CheckoutAPI', 'devHelper', 'config', '$rootScope',
		function ($state, CheckoutAPI, devHelper, config, $rootScope) {

			/*********************
			 *  Private Variables
			 **********************/
			// reference to this controller


			/*********************
			 *  Public Variables
			 **********************/
			var that = this;
			// TODO: placeholder for amount
			var amount = 10;

			// Create a Stripe client
			Stripe.setPublishableKey('pk_test_RZjSNtHLydLfeylIF2BkP6s5');

			/*********************
			 *  Private Functions
			 **********************/

			function _tokenize() {

				Stripe.card.createToken(
					{
						number: that.credit.number,
						cvc: that.credit.cvc,
						exp_month: that.credit.exp_month,
						exp_year: that.credit.exp_year
					},
					_chargePayment
				);
			}

			function _chargePayment(status, response) {
				CheckoutAPI.charge(response.id, $rootScope.currentUser.email, amount*100, config.currency).then(function (response) {
					devHelper.log(response);
					devHelper.log('charged successfully');
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}


			/*********************
			 *  Public Functions
			 **********************/
			this.tokenize = _tokenize;

			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
