angular.module('checkout.billing')

	.service('CheckoutService', ['$state', 'devHelper', '$q',
		function ($state, devHelper, $q) {

			// Create a Stripe client
			Stripe.setPublishableKey('pk_test_RZjSNtHLydLfeylIF2BkP6s5');

			function tokenize(card) {
				var deferred = $q.defer();
				Stripe.card.createToken(
					{
						number: card.number,
						cvc: card.cvc,
						exp_month: card.exp_month,
						exp_year: card.exp_year
					}, function (status, response) {
						deferred.resolve(response);
					}
				);
				return deferred.promise;
			}

			return {
				tokenize: tokenize
			}

		}
	])