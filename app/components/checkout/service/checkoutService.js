angular.module('checkout.billing')

	.service('CheckoutService', ['$state', 'devHelper', '$q',
		function ($state, devHelper, $q) {

			// Create a Stripe client
			Stripe.setPublishableKey('pk_test_RZjSNtHLydLfeylIF2BkP6s5');

			function tokenize(number, cvc, exp_month, exp_year) {
				var deferred = $q.defer();
				Stripe.card.createToken(
					{
						number: number,
						cvc: cvc,
						exp_month: exp_month,
						exp_year: exp_year
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