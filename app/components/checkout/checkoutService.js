'use strict';

angular.module('checkout.api', [
	'configuration'
])

	.factory('CheckoutResource', ['$resource', 'config',
		function ($resource, config) {
			var api_endpoint = config.endpoint + 'users/payment/';

			return $resource(api_endpoint + ':id', {id: '@id'}, {
				list: {
					method: 'GET'
				},
				show: {
					method: 'GET'
				},
				create: {
					method: 'POST'
				},
				update: {
					method: 'PUT'
				},
				destroy: {
					method: 'DELETE'
				},
			});
		}
	])

	.service('CheckoutAPI', ['$q', 'CheckoutResource',
		function ($q, CheckoutResource) {

			function charge(token, amount, currency, kitchenId) {
				return $q(function (resolve, reject) {
					CheckoutResource.charge(
						{
							token: token,
							amount: amount,
							currency: currency,
							kitchenId: kitchenId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function addCard(token) {
				return $q(function (resolve, reject) {
					CheckoutResource.create(
						{
							token: token
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function list() {
				return $q(function (resolve, reject) {
					CheckoutResource.list().$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				charge: charge,
				addCard: addCard,
				list: list,
			};
		}
	]);
