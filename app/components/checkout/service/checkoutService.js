angular.module('checkout.billing')

	.service('CheckoutService', ['$state', 'devHelper', '$q', 'config',
		function ($state, devHelper, $q, config) {

			// Create a Stripe client
			Stripe.setPublishableKey(config.stripePublishableKey);

			function _tokenizeCard(card) {
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

			function _tokenizeBankAccount(bankAccount) {
				var deferred = $q.defer();
				Stripe.bankAccount.createToken(
					{
						country: bankAccount.country.display,
						currency: bankAccount.currency,
						routing_number: bankAccount.routing_number,
						account_number: bankAccount.account_number,
						account_holder_name: bankAccount.account_holder_name,
						account_holder_type: bankAccount.account_holder_type
					}, function (status, response) {
						deferred.resolve(response);
					}
				);
				return deferred.promise;
			}

			return {
				tokenizeCard: _tokenizeCard,
				tokenizeBankAccount: _tokenizeBankAccount
			}

		}
	]);