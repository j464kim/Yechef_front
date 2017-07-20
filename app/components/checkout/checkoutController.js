'use strict';

angular.module('checkout.billing', [
	'checkout.api',
])

	.controller('CheckoutController', ['$stateParams', 'CheckoutAPI', 'devHelper', 'config', '$rootScope', '$q',
		function ($stateParams, CheckoutAPI, devHelper, config, $rootScope, $q) {

			/*********************
			 *  Private Variables
			 **********************/
			// reference to this controller


			/*********************
			 *  Public Variables
			 **********************/
			var that = this;
			var amount = $stateParams.amount;
			var kitchenId = $stateParams.kitchenId;
			var stripeAmount = Math.round(amount * 100);

			// Create a Stripe client
			Stripe.setPublishableKey('pk_test_RZjSNtHLydLfeylIF2BkP6s5');

			/*********************
			 *  Private Functions
			 **********************/

			function _tokenize() {
				var deferred = $q.defer();
				Stripe.card.createToken(
					{
						number: that.credit.number,
						cvc: that.credit.cvc,
						exp_month: that.credit.exp_month,
						exp_year: that.credit.exp_year
					}, function (status, response) {
						deferred.resolve(response);
					}
				);
				return deferred.promise;
			}

			function _chargePayment() {
				_tokenize().then(function (response) {
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
				_tokenize().then(function (response) {
					CheckoutAPI.create(response.id).then(function (response) {
						devHelper.log(response);
						devHelper.log('Card has been added successfully');
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
