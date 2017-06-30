'use strict';

angular.module('checkout.api', [
	'configuration'
])

	.service('CheckoutResource', ['$resource', 'config', '$http',
		function ($resource, config, $http) {
			var apiEndpoint = config.endpoint;

			function charge(token, email, amount, currency) {
				return $http({
					method: 'POST',
					url: apiEndpoint + 'charge-payment',
					params: {
						token: token,
						email: email,
						amount: amount,
						currency: currency
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

			function charge(token, email, amount, currency) {
				return $q(function (resolve, reject) {
					CheckoutResource.charge(token, email, amount, currency).then(function (response) {
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
