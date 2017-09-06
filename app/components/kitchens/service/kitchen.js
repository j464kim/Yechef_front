'use strict';

angular.module('kitchen.api', [
	'configuration'
])

	.factory('KitchenResource', ['$resource', 'config',
		function ($resource, config) {
			var apiEndpoint = config.endpoint + 'kitchens/';

			return $resource(apiEndpoint + ':id', {id: '@id', orderId: '@orderId'}, {
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
				checkOwnership: {
					method: 'POST',
					url: apiEndpoint + 'checkOwnership',
				},
				acceptOrder: {
					method: 'GET',
					url: apiEndpoint + ':id' + '/acceptOrder/' + ':orderId',
				},
				declineOrder: {
					method: 'GET',
					url: apiEndpoint + ':id' + '/declineOrder/' + ':orderId',
				},
				getRating: {
					method: 'GET',
					url: apiEndpoint + ':id' + '/rating'
				},
				updateBusinessHour: {
					method: 'POST',
					url: apiEndpoint + ':id' + '/businessHour'
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

			function update(kitchen, kitchenId) {
				return $q(function (resolve, reject) {
					KitchenResource.update(kitchen, kitchenId)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function destroy(kitchenId) {
				return $q(function (resolve, reject) {
					KitchenResource.destroy(
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

			function getDishes(kitchenId) {

				return $q(function (resolve, reject) {
					KitchenResource.show(
						{
							id: kitchenId + "/dishes"
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function getAdmins(kitchenId) {

				return $q(function (resolve, reject) {
					KitchenResource.show(
						{
							id: kitchenId + "/admins"
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function addAdmin(userId, kitchenId) {

				return $q(function (resolve, reject) {
					KitchenResource.create(
						{
							user_id: userId,
							id: kitchenId + "/admins"
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function removeAdmin(userId, kitchenId) {
				return $q(function (resolve, reject) {
					KitchenResource.destroy(
						{
							user_id: userId,
							id: kitchenId + "/admins"
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function getSubscribers(kitchenId) {

				return $q(function (resolve, reject) {
					KitchenResource.show(
						{
							id: kitchenId + "/subscribers"
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function checkOwnership(kitchenId) {
				return $q(function (resolve, reject) {
					KitchenResource.checkOwnership({
						kitchen_id: kitchenId,
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response)
					});
				});
			};

			function getOrders(kitchenId) {

				return $q(function (resolve, reject) {
					KitchenResource.show(
						{
							id: kitchenId + "/orders"
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function acceptOrder(kitchenId, orderId) {
				return $q(function (resolve, reject) {
					KitchenResource.acceptOrder(
						{
							id: kitchenId,
							orderId: orderId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response)
					});
				});
			};

			function declineOrder(kitchenId, orderId) {
				return $q(function (resolve, reject) {
					KitchenResource.declineOrder(
						{
							id: kitchenId,
							orderId: orderId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response)
					});
				});
			};

			function updateBusinessHour(kitchenId, day, open, close) {

				return $q(function (resolve, reject) {
					KitchenResource.updateBusinessHour(
						{
							id: kitchenId,
							day: day,
							open: open,
							close: close
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
				show: show,
				create: create,
				update: update,
				destroy: destroy,
				getAdmins: getAdmins,
				addAdmin: addAdmin,
				removeAdmin: removeAdmin,
				getDishes: getDishes,
				getSubscribers: getSubscribers,
				checkOwnership: checkOwnership,
				getOrders: getOrders,
				acceptOrder: acceptOrder,
				declineOrder: declineOrder,
				updateBusinessHour: updateBusinessHour,
			};
		}
	]);
