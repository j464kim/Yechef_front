'use strict';

angular.module('payment.api', [
	'configuration'
])

	.factory('PaymentResource', ['$resource', 'config',
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

	.service('PaymentAPI', ['$q', 'PaymentResource',
		function ($q, PaymentResource) {

			function getCards() {
				return $q(function (resolve, reject) {
					PaymentResource.list().$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function showCard(index) {
				return $q(function (resolve, reject) {
					PaymentResource.show(
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
					PaymentResource.create(
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
					PaymentResource.update(
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
					PaymentResource.destroy(
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
				getCards: getCards,
				showCard: showCard,
				addCard: addCard,
				updateCard: updateCard,
				removeCard: removeCard,
			};
		}
	]);
