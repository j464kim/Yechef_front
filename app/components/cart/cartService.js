'use strict';

angular.module('cart.api', [
	'configuration'
])

	.service('CartResource', ['$resource', 'config', '$http',
		function ($resource, config, $http) {
			var apiEndpoint = config.endpoint;

			function add(dishId) {
				return $http({
					method: 'POST',
					url: apiEndpoint + 'add-to-cart',
					params: {
						dishId: dishId
					}
				});
			}

			return {
				add: add,
			}
		}
	])

	.service('CartAPI', ['$q', 'CartResource',
		function ($q, CartResource) {

			function add(dishId) {
				return $q(function (resolve, reject) {
					CartResource.add(dishId).then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				add: add,
			};
		}
	]);