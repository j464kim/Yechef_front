'use strict';

angular.module('checkout.api', [
	'configuration'
])

	.factory('CheckoutResource', ['$resource', 'config',
		function ($resource, config) {
			var api_endpoint = config.endpoint + 'payment';

			return $resource(api_endpoint + ':id', {id: '@id'}, {
				charge: {
					method: 'POST',
					url: api_endpoint + '/charge'
				}
			});
		}
	])

	.service('CheckoutAPI', ['$q', 'CheckoutResource',
		function ($q, CheckoutResource) {

			function charge(chargeObj) {
				return $q(function (resolve, reject) {
					CheckoutResource.charge(chargeObj)
						.$promise.then(function (response) {
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


