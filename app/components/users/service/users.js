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

			function getKitchens(userId) {
				return $q(function (resolve, reject) {
					UserResource.getInfo({
						option: 'getKitchens',
						userId: userId
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getForkedDishes(userId) {
				return $q(function (resolve, reject) {
					UserResource.getInfo({
						option: 'getForkedDishes',
						userId: userId
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getSubscriptions(userId) {
				return $q(function (resolve, reject) {
					UserResource.getInfo({
						option: 'getSubscriptions',
						userId: userId
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getMyKitchens() {
				return $q(function (resolve, reject) {
					UserResource.list({
						id: 'getMyKitchens'
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getMyForkedDishes() {
				return $q(function (resolve, reject) {
					UserResource.list({
						id: 'getMyForkedDishes'
					}).$promise.then(function (response) {
						resolve(response.body);
					}, function (response) {
						reject(response);
					});
				});
			};

			function getMySubscriptions() {
				return $q(function (resolve, reject) {
					UserResource.list({
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
