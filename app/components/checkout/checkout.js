'use strict';

angular.module('checkout.api', [
	'configuration'
])

	.factory('CheckoutResource', ['$resource', 'config',
		function ($resource, config) {
			var api_endpoint = config.endpoint + 'payment/';

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

			function getCards() {
				return $q(function (resolve, reject) {
					CheckoutResource.list().$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function showCard(index) {
				return $q(function (resolve, reject) {
					CheckoutResource.show(
						{
							id: index
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

			function updateCard(card, cardId) {
				return $q(function (resolve, reject) {
					CheckoutResource.update(
						{
							id: cardId
						}, card
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function removeCard(cardId) {
				return $q(function (resolve, reject) {
					CheckoutResource.destroy(
						{
							id: cardId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				charge: charge,
				getCards: getCards,
				showCard: showCard,
				addCard: addCard,
				updateCard: updateCard,
				removeCard: removeCard,
			};
		}
	]);
