'use strict';

angular.module('cart.api', [
	'configuration'
])

	.factory('CartResource', ['$resource', 'config',
		function ($resource, config) {
			var apiEndpoint = config.endpoint + 'carts/';

			return $resource(apiEndpoint + ':id', {id: '@id'}, {
				list: {
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
				}
			});
		}
	])


	.service('CartAPI', ['$q', 'CartResource',
		function ($q, CartResource) {

			function list() {

				return $q(function (resolve, reject) {
					CartResource.list()
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function create(dishId, qty) {
				return $q(function (resolve, reject) {
					CartResource.create(
						{
							dish_id: dishId,
							quantity: qty
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function update(dishId, qty) {
				return $q(function (resolve, reject) {
					CartResource.update(
						{
							id: dishId,
							quantity: qty
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function destroy(dishId) {
				return $q(function (resolve, reject) {
					CartResource.destroy(
						{
							id: dishId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				list: list,
				create: create,
				update: update,
				destroy: destroy,
			};
		}
	]);