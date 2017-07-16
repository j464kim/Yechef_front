'use strict';

angular.module('checkout.api', [
	'configuration'
])

	.service('CheckoutResource', ['$resource', 'config', '$http',
		function ($resource, config, $http) {
			var apiEndpoint = config.endpoint;

			function charge(token, amount, currency, kitchenId) {
				return $http({
					method: 'POST',
					url: apiEndpoint + 'charge-payment',
					params: {
						token: token,
						amount: amount,
						currency: currency,
						kitchenId: kitchenId,
					}
				});
			}

			return {
				charge: charge,
			}
		}
	])

	.service('CheckoutAPI', ['$q', 'CheckoutResource',
		function ($q, CheckoutResource) {

			function charge(token, amount, currency, kitchenId) {
				return $q(function (resolve, reject) {
					CheckoutResource.charge(token, amount, currency, kitchenId).then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				charge: charge,
			};
		}
	]);
