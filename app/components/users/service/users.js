'use strict';

angular.module('user.api', [])

	.factory('UserResource', ['$resource', 'config',
		function ($resource, config) {
			var api_endpoint = config.endpoint + 'users/';

			return $resource(api_endpoint + ':id', {id: '@id'}, {
				list: {
					method: 'GET'
				},
				show: {
					method: 'GET'
				},
				update: {
					method: 'PUT'
				},
				getInfo: {
					methbod: 'GET',
					url: api_endpoint + ':userId' + "/" + ':option',
					params: {userId: '@userId', option: '@option'}
				},
				cancelOrder: {
					method: 'GET',
					url: api_endpoint + 'cancelOrder/' + ':orderId'
				},
				checkPayout: {
					method: 'GET',
					url: api_endpoint + 'checkPayout',
					params: {userId: '@userId'}
				}
			});
		}
	])

	.factory('UserSettingResource', ['$resource', 'config',
		function ($resource, config) {
			var api_endpoint = config.endpoint + 'userSetting/';
			return $resource(api_endpoint, {}, {
				show: {
					method: 'GET'
				},
				update: {
					method: 'PUT'
				}
			});
		}
	])

	.service('UserAPI', ['$q', 'UserResource', 'UserSettingResource',
		function ($q, UserResource, UserSettingResource) {

			function list(option) {

				return $q(function (resolve, reject) {
					UserResource.list({
						id: option,
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						console.log(seconds, expireAt);
						reject(response);
					});
				});
			};

			function show(userId) {

				return $q(function (resolve, reject) {
					UserResource.show(
						{
							id: userId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function update(user, userId) {
				return $q(function (resolve, reject) {
					UserResource.update(user, userId)
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			}

			function getKitchens(userId, pageNum, perPage) {
				return $q(function (resolve, reject) {
					UserResource.getInfo({
						option: 'getKitchens',
						userId: userId,
						page: pageNum,
						perPage: perPage
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getForkedDishes(userId, pageNum, perPage) {
				return $q(function (resolve, reject) {
					UserResource.getInfo({
						option: 'getForkedDishes',
						userId: userId,
						page: pageNum,
						perPage: perPage
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getSubscriptions(userId, pageNum, perPage) {
				return $q(function (resolve, reject) {
					UserResource.getInfo({
						option: 'getSubscriptions',
						userId: userId,
						page: pageNum,
						perPage: perPage
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getMyKitchensInCompactList(pageNum, perPage) {
				return $q(function (resolve, reject) {
					UserResource.list({
						page: pageNum,
						perPage: perPage,
						id: 'getMyKitchensInCompactList'
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getMyForkedDishes(pageNum, perPage) {
				return $q(function (resolve, reject) {
					UserResource.list({
						page: pageNum,
						perPage: perPage,
						id: 'getMyForkedDishes'
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getMySubscriptions(pageNum, perPage) {
				return $q(function (resolve, reject) {
					UserResource.list({
						page: pageNum,
						perPage: perPage,
						id: 'getMySubscriptions'
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getMySettings() {
				return $q(function (resolve, reject) {
					UserSettingResource.show().$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function setMySettings(settings) {
				return $q(function (resolve, reject) {
					UserSettingResource.update(settings).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function cancelOrder(orderId) {
				return $q(function (resolve, reject) {
					UserResource.cancelOrder(
						{
							orderId: orderId
						}
					).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response)
					});
				});
			};

			function checkPayout() {
				return $q(function (resolve, reject) {
					UserResource.checkPayout()
						.$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response)
					});
				});
			};

			return {
				list: list,
				show: show,
				update: update,
				getKitchens: getKitchens,
				getForkedDishes: getForkedDishes,
				getSubscriptions: getSubscriptions,
				getMyKitchensInCompactList: getMyKitchensInCompactList,
				getMyForkedDishes: getMyForkedDishes,
				getMySubscriptions: getMySubscriptions,
				getMySettings: getMySettings,
				setMySettings: setMySettings,
				cancelOrder: cancelOrder,
				checkPayout: checkPayout,
			};
		}
	]);
