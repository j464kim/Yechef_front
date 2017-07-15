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
				}
			});
		}
	])

	.service('UserAPI', ['$q', 'UserResource',
		function ($q, UserResource) {

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

			function getKitchens(userId, pageNum) {
				return $q(function (resolve, reject) {
					UserResource.getInfo({
						option: 'getKitchens',
						userId: userId,
						page: pageNum,
						perPage: 3
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getForkedDishes(userId, pageNum) {
				return $q(function (resolve, reject) {
					UserResource.getInfo({
						option: 'getForkedDishes',
						userId: userId,
						page: pageNum,
						perPage: 4,
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getSubscriptions(userId, pageNum) {
				return $q(function (resolve, reject) {
					UserResource.getInfo({
						option: 'getSubscriptions',
						userId: userId,
						page: pageNum,
						perPage: 3
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getMyKitchens(pageNum) {
				return $q(function (resolve, reject) {
					UserResource.list({
						page: pageNum,
						perPage: 100,
						id: 'getMyKitchens'
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getMyForkedDishes(pageNum) {
				return $q(function (resolve, reject) {
					UserResource.list({
						page: pageNum,
						perPage: 12,
						id: 'getMyForkedDishes'
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getMySubscriptions(pageNum) {
				return $q(function (resolve, reject) {
					UserResource.list({
						page: pageNum,
						perPage: 12,
						id: 'getMySubscriptions'
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
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
				getMyKitchens: getMyKitchens,
				getMyForkedDishes: getMyForkedDishes,
				getMySubscriptions: getMySubscriptions
			};
		}
	]);
