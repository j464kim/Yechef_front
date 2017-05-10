'use strict';

angular.module('kitchen.api', [
	'configuration'
])

	.factory('KitchenResource', ['$resource', 'config',
		function ($resource, config) {
			var apiEndpoint = config.endpoint + 'kitchens/';

			return $resource(apiEndpoint + ':id', {id: '@id'}, {
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
				}
			});
		}
	])

	.service('KitchenAPI', ['$q', 'KitchenResource',
		function ($q, KitchenResource) {

			function list(pageNum) {
				pageNum = pageNum || 0;

				return $q(function (resolve, reject) {
					KitchenResource.list(
						{
							page: pageNum
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function show(kitchenId) {

				return $q(function (resolve, reject) {
					KitchenResource.show(
						{
							id: kitchenId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function create(kitchen) {

				return $q(function (resolve, reject) {
					KitchenResource.create(kitchen)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function update(kitchen, id) {
				return $q(function (resolve, reject) {
					KitchenResource.update(kitchen, id)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			return {
				list: list,
				show: show,
				create: create,
				update: update
			};
		}
	]);
