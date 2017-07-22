angular.module('checkout.billing')

	.service('CheckoutService', ['$state', 'devHelper', '$q', 'config',
		function ($state, devHelper, $q, config) {

			// Create a Stripe client
			Stripe.setPublishableKey(config.stripePublishableKey);

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